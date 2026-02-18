import { useState, useEffect, useRef, useCallback } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import Swal, { getSwalOpts } from '../../utils/swal';
import { studentApi } from '../../utils/api';
import { useSearchParams } from 'react-router-dom';


// CodeMirror core
import { EditorView, keymap, lineNumbers, highlightActiveLine, highlightActiveLineGutter, drawSelection, dropCursor, rectangularSelection, crosshairCursor, highlightSpecialChars } from '@codemirror/view';
import { EditorState, Compartment } from '@codemirror/state';
import { defaultKeymap, history, historyKeymap, indentWithTab } from '@codemirror/commands';
import { syntaxHighlighting, defaultHighlightStyle, indentOnInput, bracketMatching, foldGutter, foldKeymap, HighlightStyle } from '@codemirror/language';
import { closeBrackets, closeBracketsKeymap, autocompletion, completionKeymap } from '@codemirror/autocomplete';
import { searchKeymap, highlightSelectionMatches } from '@codemirror/search';
import { lintKeymap } from '@codemirror/lint';
import { oneDark } from '@codemirror/theme-one-dark';
import { tags } from '@lezer/highlight';

// Language support
import { javascript } from '@codemirror/lang-javascript';
import { python } from '@codemirror/lang-python';
import { java } from '@codemirror/lang-java';
import { cpp } from '@codemirror/lang-cpp';
import { html } from '@codemirror/lang-html';
import { css } from '@codemirror/lang-css';
import { json } from '@codemirror/lang-json';
import { markdown } from '@codemirror/lang-markdown';
import { xml } from '@codemirror/lang-xml';
import { sql } from '@codemirror/lang-sql';
import { php } from '@codemirror/lang-php';
import { rust } from '@codemirror/lang-rust';
import { go } from '@codemirror/lang-go';

// Language configuration map
const LANGUAGES = {
  python:     { label: 'Python',      ext: 'py',   support: () => python(),                       placeholder: '# Write your solution here\n' },
  javascript: { label: 'JavaScript',  ext: 'js',   support: () => javascript(),                   placeholder: '// Write your solution here\n' },
  typescript: { label: 'TypeScript',  ext: 'ts',   support: () => javascript({ typescript: true }),placeholder: '// Write your solution here\n' },
  java:       { label: 'Java',        ext: 'java', support: () => java(),                         placeholder: '// Write your solution here\n' },
  cpp:        { label: 'C++',         ext: 'cpp',  support: () => cpp(),                          placeholder: '// Write your solution here\n' },
  c:          { label: 'C',           ext: 'c',    support: () => cpp(),                          placeholder: '// Write your solution here\n' },
  csharp:     { label: 'C#',          ext: 'cs',   support: () => java(),                         placeholder: '// Write your solution here\n' },
  go:         { label: 'Go',          ext: 'go',   support: () => go(),                           placeholder: '// Write your solution here\n' },
  rust:       { label: 'Rust',        ext: 'rs',   support: () => rust(),                         placeholder: '// Write your solution here\n' },
  php:        { label: 'PHP',         ext: 'php',  support: () => php(),                          placeholder: '<?php\n// Write your solution here\n' },
  html:       { label: 'HTML',        ext: 'html', support: () => html(),                         placeholder: '<!-- Write your solution here -->\n' },
  css:        { label: 'CSS',         ext: 'css',  support: () => css(),                          placeholder: '/* Write your solution here */\n' },
  sql:        { label: 'SQL',         ext: 'sql',  support: () => sql(),                          placeholder: '-- Write your solution here\n' },
  json:       { label: 'JSON',        ext: 'json', support: () => json(),                         placeholder: '{\n  \n}\n' },
  xml:        { label: 'XML',         ext: 'xml',  support: () => xml(),                          placeholder: '<!-- Write your solution here -->\n' },
  markdown:   { label: 'Markdown',    ext: 'md',   support: () => markdown(),                     placeholder: '# Write your solution here\n' },
  ruby:       { label: 'Ruby',        ext: 'rb',   support: () => python(),                       placeholder: '# Write your solution here\n' },
  swift:      { label: 'Swift',       ext: 'swift',support: () => java(),                         placeholder: '// Write your solution here\n' },
  kotlin:     { label: 'Kotlin',      ext: 'kt',   support: () => java(),                         placeholder: '// Write your solution here\n' },
  scala:      { label: 'Scala',       ext: 'scala', support: () => java(),                        placeholder: '// Write your solution here\n' },
  r:          { label: 'R',           ext: 'r',    support: () => python(),                       placeholder: '# Write your solution here\n' },
  dart:       { label: 'Dart',        ext: 'dart', support: () => java(),                         placeholder: '// Write your solution here\n' },
  lua:        { label: 'Lua',         ext: 'lua',  support: () => python(),                       placeholder: '-- Write your solution here\n' },
  perl:       { label: 'Perl',        ext: 'pl',   support: () => python(),                       placeholder: '# Write your solution here\n' },
  bash:       { label: 'Bash',        ext: 'sh',   support: () => python(),                       placeholder: '#!/bin/bash\n# Write your solution here\n' },
};

// Custom editor theme that matches the app styling
const editorTheme = EditorView.theme({
  '&': { height: '40vh', fontSize: '14px' },
  '.cm-content': { fontFamily: '"Fira Code", "JetBrains Mono", "Cascadia Code", "SF Mono", Menlo, Consolas, "Liberation Mono", monospace', padding: '12px 0' },
  '.cm-gutters': { backgroundColor: '#1e1e2e', color: '#6c7086', border: 'none', borderRight: '1px solid #313244', minWidth: '48px' },
  '.cm-activeLineGutter': { backgroundColor: '#28283d' },
  '.cm-activeLine': { backgroundColor: '#1e1e2e88' },
  '.cm-cursor': { borderLeftColor: '#cba6f7', borderLeftWidth: '2px' },
  '.cm-selectionBackground': { backgroundColor: '#45475a !important' },
  '&.cm-focused .cm-selectionBackground': { backgroundColor: '#45475a !important' },
  '.cm-matchingBracket': { backgroundColor: '#585b7033', outline: '1px solid #89b4fa66' },
  '.cm-searchMatch': { backgroundColor: '#f9e2af33', outline: '1px solid #f9e2af66' },
  '.cm-foldGutter .cm-gutterElement': { cursor: 'pointer' },
  '.cm-tooltip': { backgroundColor: '#1e1e2e', border: '1px solid #313244', borderRadius: '8px' },
  '.cm-tooltip-autocomplete': { '& > ul > li': { padding: '4px 8px' }, '& > ul > li[aria-selected]': { backgroundColor: '#313244' } },
  '.cm-scroller': { overflow: 'auto' },
});

// Catppuccin Mocha-inspired highlight style
const catppuccinHighlight = HighlightStyle.define([
  { tag: tags.keyword,           color: '#cba6f7', fontWeight: 'bold' },  // mauve
  { tag: tags.controlKeyword,    color: '#cba6f7', fontWeight: 'bold' },
  { tag: tags.operatorKeyword,   color: '#89dceb' },                       // sky
  { tag: tags.definitionKeyword, color: '#cba6f7', fontWeight: 'bold' },
  { tag: tags.moduleKeyword,     color: '#cba6f7' },
  { tag: tags.function(tags.variableName), color: '#89b4fa' },            // blue
  { tag: tags.function(tags.definition(tags.variableName)), color: '#89b4fa', fontWeight: 'bold' },
  { tag: tags.variableName,      color: '#cdd6f4' },                      // text
  { tag: tags.definition(tags.variableName), color: '#cdd6f4' },
  { tag: tags.propertyName,      color: '#89b4fa' },
  { tag: tags.definition(tags.propertyName), color: '#89b4fa' },
  { tag: tags.typeName,          color: '#f9e2af', fontStyle: 'italic' }, // yellow
  { tag: tags.className,         color: '#f9e2af', fontWeight: 'bold' },
  { tag: tags.namespace,         color: '#f9e2af' },
  { tag: tags.macroName,         color: '#fab387' },                      // peach
  { tag: tags.labelName,         color: '#89dceb' },
  { tag: tags.string,            color: '#a6e3a1' },                      // green
  { tag: tags.special(tags.string), color: '#f5c2e7' },                   // pink
  { tag: tags.docString,         color: '#a6e3a1', fontStyle: 'italic' },
  { tag: tags.character,         color: '#a6e3a1' },
  { tag: tags.number,            color: '#fab387' },                      // peach
  { tag: tags.integer,           color: '#fab387' },
  { tag: tags.float,             color: '#fab387' },
  { tag: tags.bool,              color: '#fab387' },
  { tag: tags.regexp,            color: '#f38ba8' },                      // red
  { tag: tags.escape,            color: '#f5c2e7' },                      // pink
  { tag: tags.null,              color: '#fab387', fontStyle: 'italic' },
  { tag: tags.atom,              color: '#fab387' },
  { tag: tags.self,              color: '#f38ba8', fontStyle: 'italic' },
  { tag: tags.comment,           color: '#6c7086', fontStyle: 'italic' }, // overlay0
  { tag: tags.lineComment,       color: '#6c7086', fontStyle: 'italic' },
  { tag: tags.blockComment,      color: '#6c7086', fontStyle: 'italic' },
  { tag: tags.docComment,        color: '#7f849c', fontStyle: 'italic' },
  { tag: tags.operator,          color: '#89dceb' },                      // sky
  { tag: tags.derefOperator,     color: '#cdd6f4' },
  { tag: tags.punctuation,       color: '#9399b2' },                      // overlay2
  { tag: tags.separator,         color: '#9399b2' },
  { tag: tags.bracket,           color: '#9399b2' },
  { tag: tags.angleBracket,      color: '#9399b2' },
  { tag: tags.squareBracket,     color: '#9399b2' },
  { tag: tags.paren,             color: '#9399b2' },
  { tag: tags.brace,             color: '#9399b2' },
  { tag: tags.meta,              color: '#f5e0dc' },                      // rosewater
  { tag: tags.annotation,        color: '#f9e2af' },
  { tag: tags.processingInstruction, color: '#cba6f7' },
  { tag: tags.heading,           color: '#f38ba8', fontWeight: 'bold' },
  { tag: tags.heading1,          color: '#f38ba8', fontWeight: 'bold', fontSize: '1.4em' },
  { tag: tags.heading2,          color: '#fab387', fontWeight: 'bold', fontSize: '1.2em' },
  { tag: tags.heading3,          color: '#f9e2af', fontWeight: 'bold' },
  { tag: tags.link,              color: '#89b4fa', textDecoration: 'underline' },
  { tag: tags.url,               color: '#89b4fa', textDecoration: 'underline' },
  { tag: tags.emphasis,          fontStyle: 'italic', color: '#f38ba8' },
  { tag: tags.strong,            fontWeight: 'bold', color: '#fab387' },
  { tag: tags.strikethrough,     textDecoration: 'line-through' },
  { tag: tags.invalid,           color: '#f38ba8', textDecoration: 'wavy underline' },
  { tag: tags.changed,           color: '#f9e2af' },
  { tag: tags.inserted,          color: '#a6e3a1' },
  { tag: tags.deleted,           color: '#f38ba8' },
]);

// Dark background to pair with our highlight
const darkBackground = EditorView.theme({
  '&': { backgroundColor: '#1e1e2e', color: '#cdd6f4' },
}, { dark: true });

const CodeEditor = () => {
  const [searchParams] = useSearchParams();
  const problemId = searchParams.get('problem');
  const [problem, setProblem] = useState(null);
  const [language, setLanguage] = useState('python');
  const [output, setOutput] = useState('');
  const [outputStatus, setOutputStatus] = useState('idle'); // idle | running | success | error
  const [running, setRunning] = useState(false);
  const [loading, setLoading] = useState(!!problemId);
  const [stdin, setStdin] = useState('');
  const [showInput, setShowInput] = useState(false);
  const [executionTime, setExecutionTime] = useState(null);
  const [activeTab, setActiveTab] = useState('output'); // output | input

  const editorRef = useRef(null);
  const viewRef = useRef(null);
  const langCompartment = useRef(new Compartment());
  const codeRef = useRef(LANGUAGES.python.placeholder);

  // Get current code from editor
  const getCode = useCallback(() => {
    if (viewRef.current) return viewRef.current.state.doc.toString();
    return codeRef.current;
  }, []);

  // Initialize CodeMirror
  useEffect(() => {
    if (!editorRef.current || viewRef.current) return;

    const langConfig = LANGUAGES[language] || LANGUAGES.python;
    const startState = EditorState.create({
      doc: codeRef.current,
      extensions: [
        lineNumbers(),
        highlightActiveLineGutter(),
        highlightSpecialChars(),
        history(),
        foldGutter(),
        drawSelection(),
        dropCursor(),
        EditorState.allowMultipleSelections.of(true),
        indentOnInput(),
        bracketMatching(),
        closeBrackets(),
        autocompletion(),
        rectangularSelection(),
        crosshairCursor(),
        highlightActiveLine(),
        highlightSelectionMatches(),
        keymap.of([
          ...closeBracketsKeymap,
          ...defaultKeymap,
          ...searchKeymap,
          ...historyKeymap,
          ...foldKeymap,
          ...completionKeymap,
          ...lintKeymap,
          indentWithTab,
        ]),
        langCompartment.current.of(langConfig.support()),
        darkBackground,
        syntaxHighlighting(catppuccinHighlight),
        editorTheme,
        EditorView.updateListener.of(update => {
          if (update.docChanged) {
            codeRef.current = update.state.doc.toString();
          }
        }),
      ],
    });

    viewRef.current = new EditorView({
      state: startState,
      parent: editorRef.current,
    });

    return () => {
      if (viewRef.current) {
        viewRef.current.destroy();
        viewRef.current = null;
      }
    };
  }, []);

  // Switch language support when language changes
  useEffect(() => {
    if (!viewRef.current) return;
    const langConfig = LANGUAGES[language] || LANGUAGES.python;
    viewRef.current.dispatch({
      effects: langCompartment.current.reconfigure(langConfig.support()),
    });
  }, [language]);

  useEffect(() => {
    if (problemId) {
      const fetchProblem = async () => {
        const res = await studentApi.getCodingProblem(problemId);
        if (res.success) {
          setProblem(res.problem);
          // Pre-fill stdin with sample input if available
          if (res.problem.sampleInput) setStdin(res.problem.sampleInput);
        }
        setLoading(false);
      };
      fetchProblem();
    }
  }, [problemId]);

  const handleRun = async () => {
    const code = getCode();
    if (!code.trim()) {
      setOutput('Please write some code before running.');
      setOutputStatus('error');
      return;
    }

    setRunning(true);
    setOutputStatus('running');
    setOutput('Compiling and executing...');
    setActiveTab('output');
    setExecutionTime(null);

    const startTime = performance.now();

    try {
      const res = await studentApi.executeCode({ code, language, stdin });
      const elapsed = ((performance.now() - startTime) / 1000).toFixed(2);
      setExecutionTime(elapsed);

      if (res.success) {
        setOutput(res.output || '(No output)');
        setOutputStatus(res.status === 'error' ? 'error' : 'success');
      } else {
        setOutput(res.message || 'Error executing code.');
        setOutputStatus('error');
      }
    } catch (err) {
      setOutput('Network error. Please check your connection and try again.');
      setOutputStatus('error');
    }

    setRunning(false);
  };

  const handleSubmit = async () => {
    if (!problemId) return;
    const code = getCode();
    setRunning(true);
    setOutputStatus('running');
    setOutput('Submitting and executing...');
    setActiveTab('output');

    const startTime = performance.now();
    const res = await studentApi.submitCode(problemId, { code, language, stdin });
    const elapsed = ((performance.now() - startTime) / 1000).toFixed(2);
    setExecutionTime(elapsed);

    setRunning(false);
    if (res.success) {
      const statusLabel = res.status === 'accepted' ? 'Accepted' : res.status === 'compile_error' ? 'Compilation Error' : res.status === 'wrong_answer' ? 'Wrong Answer' : 'Submitted';
      Swal.fire({ ...getSwalOpts(), icon: res.status === 'accepted' ? 'success' : 'info', title: statusLabel, text: res.message || 'Your code has been submitted.'});
      setOutput(res.output || 'Submitted successfully!');
      setOutputStatus(res.status === 'accepted' ? 'success' : res.status === 'compile_error' ? 'error' : 'success');
    } else {
      Swal.fire({ ...getSwalOpts(), icon: 'error', title: 'Submission Failed', text: res.message});
      setOutput(res.message || 'Submission failed.');
      setOutputStatus('error');
    }
  };

  const handleLanguageChange = (e) => {
    const newLang = e.target.value;
    setLanguage(newLang);
    if (viewRef.current) {
      const currentCode = viewRef.current.state.doc.toString();
      const isPlaceholder = Object.values(LANGUAGES).some(l => l.placeholder.trim() === currentCode.trim());
      if (isPlaceholder || currentCode.trim() === '') {
        const newPlaceholder = LANGUAGES[newLang]?.placeholder || '// Write your solution here\n';
        viewRef.current.dispatch({
          changes: { from: 0, to: viewRef.current.state.doc.length, insert: newPlaceholder }
        });
        codeRef.current = newPlaceholder;
      }
    }
  };

  const handleClearOutput = () => {
    setOutput('');
    setOutputStatus('idle');
    setExecutionTime(null);
  };

  const langConfig = LANGUAGES[language] || LANGUAGES.python;
  const diffColors = { easy: 'bg-green-100 text-green-700', medium: 'bg-amber-100 text-amber-700', hard: 'bg-red-100 text-red-700' };

  const outputStatusColors = {
    idle:    'text-gray-500',
    running: 'text-amber-400',
    success: 'text-green-400',
    error:   'text-red-400',
  };
  const outputStatusIcons = {
    idle:    'ri-terminal-line',
    running: 'ri-loader-4-line animate-spin',
    success: 'ri-checkbox-circle-line',
    error:   'ri-error-warning-line',
  };

  return (
    <DashboardLayout pageTitle="Code Editor" role="student">
      <div className="space-y-4 h-full">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <h1 className="text-xl font-bold text-gray-800 dark-theme:text-gray-100">{problem ? problem.title : 'Code Editor'}</h1>
            {problem && <div className="flex items-center gap-2 mt-1">
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${diffColors[problem.difficulty] || ''}`}>{problem.difficulty}</span>
              {problem.category && <span className="text-xs text-gray-400">{problem.category}</span>}
            </div>}
          </div>
          <div className="flex items-center gap-2">
            <select value={language} onChange={handleLanguageChange} className="px-3 py-2 rounded-xl bg-cream dark-theme:bg-gray-800 border border-sand dark-theme:border-gray-700 text-xs outline-none">
              {Object.entries(LANGUAGES).map(([key, lang]) => (
                <option key={key} value={key}>{lang.label}</option>
              ))}
            </select>
            <button onClick={() => { setShowInput(!showInput); setActiveTab('input'); }} className={`px-3 py-2 rounded-xl border text-xs font-medium transition-colors flex items-center gap-1 ${showInput ? 'bg-blue-500 text-white border-blue-500' : 'bg-cream dark-theme:bg-gray-800 border-sand dark-theme:border-gray-700 text-gray-500 dark-theme:text-gray-400 hover:border-blue-400'}`}>
              <i className="ri-keyboard-line"></i>Input
            </button>
            <button onClick={handleRun} disabled={running} className="px-4 py-2 rounded-xl bg-green-500 text-white text-xs font-medium hover:bg-green-600 disabled:opacity-50 flex items-center gap-1 transition-colors">
              <i className={running ? 'ri-loader-4-line animate-spin' : 'ri-play-line'}></i>{running ? 'Running...' : 'Run'}
            </button>
            {problemId && <button onClick={handleSubmit} disabled={running} className="px-4 py-2 rounded-xl bg-primary text-white text-xs font-medium hover:bg-primary-dark disabled:opacity-50 flex items-center gap-1 transition-colors">
              <i className="ri-send-plane-line"></i>Submit
            </button>}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Problem description panel */}
          {problem && (
            <div className="lg:col-span-1 bg-white dark-theme:bg-gray-900 rounded-2xl p-5 border border-sand dark-theme:border-gray-800 max-h-[70vh] overflow-y-auto">
              <h3 className="font-semibold text-gray-800 dark-theme:text-gray-100 text-sm mb-3">Problem Description</h3>
              <p className="text-xs text-gray-600 dark-theme:text-gray-300 whitespace-pre-wrap mb-4">{problem.description}</p>
              {problem.constraints && <><h4 className="font-medium text-gray-700 dark-theme:text-gray-300 text-xs mb-1">Constraints</h4><p className="text-xs text-gray-500 mb-3 whitespace-pre-wrap">{problem.constraints}</p></>}
              {problem.sampleInput && <><h4 className="font-medium text-gray-700 dark-theme:text-gray-300 text-xs mb-1">Sample Input</h4><pre className="text-xs bg-cream dark-theme:bg-gray-800 p-2 rounded-lg mb-3 overflow-x-auto">{problem.sampleInput}</pre></>}
              {problem.sampleOutput && <><h4 className="font-medium text-gray-700 dark-theme:text-gray-300 text-xs mb-1">Sample Output</h4><pre className="text-xs bg-cream dark-theme:bg-gray-800 p-2 rounded-lg overflow-x-auto">{problem.sampleOutput}</pre></>}
            </div>
          )}

          {/* Editor + I/O panels */}
          <div className={`${problem ? 'lg:col-span-2' : 'lg:col-span-3'} space-y-4`}>
            {/* Code Editor */}
            <div className="bg-white dark-theme:bg-gray-900 rounded-2xl border border-sand dark-theme:border-gray-800 overflow-hidden">
              <div className="px-4 py-2 bg-cream dark-theme:bg-gray-800 border-b border-sand dark-theme:border-gray-700 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                  <span className="ml-2 text-xs text-gray-500">solution.{langConfig.ext}</span>
                </div>
                <div className="flex items-center gap-2 text-[10px] text-gray-400">
                  <span>{langConfig.label}</span>
                  {executionTime && <span className="text-green-400"><i className="ri-time-line mr-0.5"></i>{executionTime}s</span>}
                </div>
              </div>
              <div ref={editorRef} className="codemirror-editor-wrapper" />
            </div>

            {/* Input / Output Panel */}
            <div className="bg-white dark-theme:bg-gray-900 rounded-2xl border border-sand dark-theme:border-gray-800 overflow-hidden">
              {/* Tab header */}
              <div className="px-4 py-2 bg-cream dark-theme:bg-gray-800 border-b border-sand dark-theme:border-gray-700 flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <button onClick={() => setActiveTab('output')} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-1 ${activeTab === 'output' ? 'bg-white dark-theme:bg-gray-700 text-gray-800 dark-theme:text-gray-100 shadow-sm' : 'text-gray-500 dark-theme:text-gray-400 hover:text-gray-700'}`}>
                    <i className={`${outputStatusIcons[outputStatus]} ${outputStatusColors[outputStatus]}`}></i>Output
                  </button>
                  <button onClick={() => { setActiveTab('input'); setShowInput(true); }} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-1 ${activeTab === 'input' ? 'bg-white dark-theme:bg-gray-700 text-gray-800 dark-theme:text-gray-100 shadow-sm' : 'text-gray-500 dark-theme:text-gray-400 hover:text-gray-700'}`}>
                    <i className="ri-keyboard-line"></i>Input (stdin)
                    {stdin.trim() && <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>}
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  {outputStatus !== 'idle' && outputStatus !== 'running' && (
                    <button onClick={handleClearOutput} className="text-[10px] text-gray-400 dark-theme:text-gray-500 hover:text-gray-600 dark-theme:hover:text-gray-300 transition-colors">
                      <i className="ri-delete-bin-line mr-0.5"></i>Clear
                    </button>
                  )}
                </div>
              </div>

              {/* Output tab */}
              {activeTab === 'output' && (
                <div className="relative">
                  {outputStatus === 'running' && (
                    <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 animate-pulse"></div>
                  )}
                  <pre className={`p-4 text-xs font-mono min-h-[100px] max-h-[200px] overflow-auto whitespace-pre-wrap ${
                    outputStatus === 'error' ? 'text-red-400' : 
                    outputStatus === 'success' ? 'text-green-400' : 
                    outputStatus === 'running' ? 'text-amber-400' : 
                    'text-gray-500 dark-theme:text-gray-400'
                  }`}>{output || 'Click "Run" to execute your code. Your code runs on a real server — output, errors, and inputs are all live.'}</pre>
                </div>
              )}

              {/* Input tab */}
              {activeTab === 'input' && (
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-[11px] text-gray-500 dark-theme:text-gray-400">
                      <i className="ri-information-line mr-1"></i>
                      Provide input values your program will read (e.g., via <code className="bg-cream dark-theme:bg-gray-800 px-1 rounded text-[10px]">input()</code> in Python, <code className="bg-cream dark-theme:bg-gray-800 px-1 rounded text-[10px]">scanf</code> in C, <code className="bg-cream dark-theme:bg-gray-800 px-1 rounded text-[10px]">Scanner</code> in Java)
                    </p>
                    {stdin.trim() && (
                      <button onClick={() => setStdin('')} className="text-[10px] text-gray-400 hover:text-red-400 transition-colors">
                        <i className="ri-close-line"></i>Clear
                      </button>
                    )}
                  </div>
                  <textarea
                    value={stdin}
                    onChange={(e) => setStdin(e.target.value)}
                    placeholder="Enter input values here, one per line...&#10;&#10;Example:&#10;5&#10;hello world&#10;3.14"
                    spellCheck={false}
                    className="w-full h-[120px] bg-gray-950 text-green-400 font-mono text-xs p-3 rounded-xl outline-none resize-none border border-gray-800 focus:border-blue-500 transition-colors placeholder:text-gray-600"
                  />
                  <div className="flex items-center justify-between mt-2">
                    <p className="text-[10px] text-gray-400 dark-theme:text-gray-500">{stdin ? `${stdin.split('\n').length} line(s)` : 'No input provided'}</p>
                    {problem?.sampleInput && stdin !== problem.sampleInput && (
                      <button onClick={() => setStdin(problem.sampleInput)} className="text-[10px] text-blue-400 hover:text-blue-300 transition-colors">
                        <i className="ri-refresh-line mr-0.5"></i>Use sample input
                      </button>
                    )}
                  </div>
                </div>
              )}            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CodeEditor;