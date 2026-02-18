import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

const TOTAL_QUESTIONS_PER_SET = 26;

// ----------------------------------------------------------------------------
// Aptitude Pools & Generators
// ----------------------------------------------------------------------------

const verbalPool = [
    { q: "Synonym of 'Abundant'?", A: "Scarce", B: "Plentiful", C: "Empty", D: "Rare", c: "B", e: "Abundant means plentiful." },
    { q: "Antonym of 'Brave'?", A: "Cowardly", B: "Strong", C: "Bold", D: "Heroic", c: "A", e: "Opposite of brave is cowardly." },
    { q: "Choose correct spelling:", A: "Recieve", B: "Receive", C: "Riceive", D: "Receve", c: "B", e: "Receive." },
    { q: "Past tense of 'Run'?", A: "Runner", B: "Ran", C: "Runned", D: "Running", c: "B", e: "Ran." },
    { q: "'Piece of cake' means:", A: "Tasty", B: "Hard", C: "Easy", D: "Dessert", c: "C", e: "Easy task." },
    { q: "Synonym of 'Happy'?", A: "Sad", B: "Joyful", C: "Angry", D: "Tired", c: "B", e: "Joyful." },
    { q: "Antonym of 'Fast'?", A: "Quick", B: "Slow", C: "Rapid", D: "Swift", c: "B", e: "Slow." },
    { q: "One who writes books?", A: "Author", B: "Reader", C: "Editor", D: "Publisher", c: "A", e: "Author." },
    { q: "Plural of 'Child'?", A: "Childs", B: "Children", C: "Childrens", D: "Childes", c: "B", e: "Children." },
    { q: "'Break a leg' means:", A: "Get hurt", B: "Good luck", C: "Dance", D: "Fall down", c: "B", e: "Good luck." },
    { q: "Meaning of 'Once in a blue moon'?", A: "Frequently", B: "Rarely", C: "Daily", D: "Monthly", c: "B", e: "Very rarely." },
    { q: "To 'Spill the beans' means to?", A: "Cook", B: "Reveal secret", C: "Drop food", D: "Plant seeds", c: "B", e: "Reveal a secret." },
    { q: "One who loves books?", A: "Bibliophile", B: "Anglophile", C: "Technophile", D: "Pedophile", c: "A", e: "Bibliophile." },
    { q: "Correct spelling:", A: "Neccessary", B: "Necessary", C: "Necesary", D: "Neccesary", c: "B", e: "Necessary." }
];

const technicalPool = [
    { q: "What is HTML?", A: "Protocol", B: "Language", C: "Hardware", D: "OS", c: "B", e: "HyperText Markup Language." },
    { q: "RAM stands for?", A: "Read Access Memory", B: "Random Access Memory", C: "Run All Memory", D: "Read All Memory", c: "B", e: "Random Access Memory." },
    { q: "CPU controls?", A: "All input, output and processing", B: "Only memory", C: "Only power", D: "Only network", c: "A", e: "Central Processing Unit." },
    { q: "1 Byte = ?", A: "4 bits", B: "8 bits", C: "16 bits", D: "32 bits", c: "B", e: "8 bits." },
    { q: "HTTPS uses which port?", A: "80", B: "443", C: "21", D: "25", c: "B", e: "443." },
    { q: "Which is a loop?", A: "If-Else", B: "For", C: "Switch", D: "Break", c: "B", e: "For loop." },
    { q: "Array index starts at?", A: "1", B: "0", C: "-1", D: "2", c: "B", e: "Usually 0." },
    { q: "Extension of Java file?", A: ".js", B: ".java", C: ".txt", D: ".class", c: "B", e: ".java." },
    { q: "Google Chrome is a?", A: "Search Engine", B: "Browser", C: "Server", D: "OS", c: "B", e: "Browser." },
    { q: "SQL: Select * FROM Users WHERE...?", A: "Update", B: "Condition", C: "Delete", D: "Insert", c: "B", e: "WHERE clause requires a condition." },
    { q: "Data Structure: LIFO?", A: "Queue", B: "Stack", C: "Tree", D: "Graph", c: "B", e: "Stack is Last In First Out." },
    { q: "Binary Search Complexity?", A: "O(n)", B: "O(log n)", C: "O(1)", D: "O(n^2)", c: "B", e: "O(log n)." }
];

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateMathQuestion() {
  const types = ['percentage', 'ratio', 'arithmetic', 'interest', 'time_work', 'speed_distance', 'probability', 'profit_loss'];
  const selectedType = types[getRandomInt(0, types.length - 1)];

  let q, a, b, c, d, correct, explanation;

  switch (selectedType) {
    case 'percentage': {
      const x = getRandomInt(10, 90); 
      const y = getRandomInt(100, 1000);
      const ans = Math.round((x / 100) * y);
      q = `What is ${x}% of ${y} (approx)?`;
      correct = 'A';
      a = ans; b = ans + 20; c = ans - 20; d = ans * 2;
      explanation = `${x}% of ${y} = ${ans}`;
      break;
    }
    case 'ratio': {
      const ratioA = getRandomInt(1, 5);
      const ratioB = getRandomInt(1, 5);
      const factor = getRandomInt(10, 50);
      const total = (ratioA + ratioB) * factor;
      const ans = ratioA * factor;
      q = `Ratio A:B is ${ratioA}:${ratioB}. Total ${total}. Find A.`;
      correct = 'B';
      a = ans - 5; b = ans; c = ans + 5; d = total;
      explanation = `A = ${ratioA}/(${ratioA}+${ratioB}) * ${total} = ${ans}`;
      break;
    }
    case 'arithmetic': {
      const n1 = getRandomInt(11, 99);
      const n2 = getRandomInt(11, 99);
      const ans = n1 + n2; 
      q = `Sum of ${n1} and ${n2}?`;
      correct = 'C';
      a = ans - 10; b = ans + 10; c = ans; d = ans + 100;
      explanation = `${n1} + ${n2} = ${ans}`;
      break;
    }
    case 'interest': {
        const P = getRandomInt(1000, 5000);
        const R = getRandomInt(2, 5);
        const T = getRandomInt(1, 3);
        const SI = (P * R * T) / 100;
        q = `SI on ${P} at ${R}% for ${T} yrs?`;
        correct = 'A';
        a = SI; b = SI + 50; c = SI - 50; d = SI + 100;
        explanation = `SI = ${SI}`;
        break;
    }
    case 'time_work': {
        const d1 = getRandomInt(6, 12);
        const d2 = d1 * 2; 
        const val = (d1 * d2) / (d1 + d2);
        q = `A does work in ${d1}d, B in ${d2}d. Together?`;
        correct = 'D';
        a = Math.floor(val)+1; b = Math.floor(val)-1; c = Math.floor(val)+2; d = val.toFixed(1);
        explanation = `${val.toFixed(1)} days`;
        break;
    }
    case 'speed_distance': {
        const s = getRandomInt(40, 80);
        const t = getRandomInt(2, 4);
        const dist = s * t;
        q = `Speed ${s} km/h, Time ${t} hr. Dist?`;
        correct = 'B';
        a = dist - 10; b = dist; c = dist + 10; d = dist + 20;
        explanation = `${dist} km`;
        break;
    }
    case 'probability': {
        const red = getRandomInt(2, 5);
        const blue = getRandomInt(2, 5);
        const total = red + blue;
        // P(Red)
        q = `Bag has ${red} Red, ${blue} Blue balls. Prob of picking Red?`;
        correct = 'A';
        const num = red; const den = total;
        a = `${num}/${den}`; b = `${blue}/${den}`; c = `1/${total}`; d = `1/2`;
        explanation = `Total balls = ${total}. Red balls = ${red}. P(Red) = ${red}/${total}.`;
        break;
    }
    case 'profit_loss': {
        const cp = getRandomInt(100, 500);
        const profitP = getRandomInt(10, 25);
        const sp = cp + (cp * profitP / 100);
        q = `CP = ${cp}, Profit = ${profitP}%. Find SP.`;
        correct = 'C';
        a = sp - 10; b = sp + 10; c = sp; d = sp + 20;
        explanation = `SP = CP + Profit = ${cp} + ${cp*profitP/100} = ${sp}`;
        break;
    }
  }
  return { q, A: String(a), B: String(b), C: String(c), D: String(d), correct, explanation };
}

function generateLogicQuestion() {
    const types = ['series_add', 'series_mult', 'directions', 'calendar'];
    const type = types[getRandomInt(0, types.length - 1)];
    let q, a, b, c, d, correct, explanation;
    
    if (type === 'series_add') {
        const start = getRandomInt(1, 10);
        const inc = getRandomInt(2, 5);
        const s = [start, start+inc, start+inc*2, start+inc*3];
        const next = start+inc*4;
        q = `Series: ${s.join(', ')}, ?`;
        correct = 'A';
        a = next; b = next+1; c = next+2; d = next-1;
        explanation = `+${inc}`;
    } else if (type === 'series_mult') {
        const start = getRandomInt(2, 4);
        const next = start*16;
        const s2 = [start, start*2, start*4, start*8];
        q = `Series: ${s2.join(', ')}, ?`;
        correct = 'B';
        a = next-2; b = next; c = next+2; d = next+4;
        explanation = `x2`;
    } else if (type === 'directions') {
        q = "A man walks 5km North, then 5km South. Where is he from start?";
        correct = 'C';
        a = "10km North"; b = "5km North"; c = "At start"; d = "5km South";
        explanation = "Went up 5, came down 5. Back to origin.";
    } else if (type === 'calendar') {
        q = "If today is Monday, what day is after 7 days?";
        correct = 'A';
        a = "Monday"; b = "Tuesday"; c = "Sunday"; d = "Wednesday";
        explanation = "Week repeats every 7 days.";
    }
    return { q, A: String(a), B: String(b), C: String(c), D: String(d), correct, explanation };
}

// ----------------------------------------------------------------------------
// Main Seed Function
// ----------------------------------------------------------------------------

async function seed() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || process.env.DB_PASS || '',
    database: process.env.DB_NAME || 'sowberry',
  });

  console.log('🚀 Starting Combined Seed (Courses + Aptitude)...');

  try {
      await seedAptitude(connection);
      await seedCourses(connection);
      await seedCodingProblems(connection);
      await seedGameChallenges(connection);
  } catch (err) {
      console.error('❌ Error during seeding:', err);
  } finally {
      await connection.end();
      process.exit(0);
  }
}

async function seedAptitude(connection) {
    console.log('\n--- Seeding Aptitude Tests ---');
    console.log('Cleaning up previous generated sets...');
  
    await connection.query("DELETE FROM aptitudeTests WHERE title LIKE 'Quantitative Practice Set%'");
    await connection.query("DELETE FROM aptitudeTests WHERE title LIKE 'Logical Reasoning Set%'");
    await connection.query("DELETE FROM aptitudeTests WHERE title LIKE 'Verbal Ability Set%'");
    await connection.query("DELETE FROM aptitudeTests WHERE title LIKE 'Technical Computer Science Set%'");

    console.log('🧠 Seeding 20 sets (Expanded Concepts)...');

    const [mentors] = await connection.query(`SELECT id FROM users WHERE role = 'mentor' ORDER BY id LIMIT 1`);
    if (!mentors.length) { console.error('No mentor found for aptitude'); return; }
    const mentorId = mentors[0].id;

    const setsToCreate = [];

    // 1. Quantitative (5 sets)
    for(let i=1; i<=5; i++) setsToCreate.push({ title: `Quantitative Practice Set ${i}`, category: 'Quantitative', difficulty: 'Medium', type: 'math' });
    // 2. Logical (5 sets)
    for(let i=1; i<=5; i++) setsToCreate.push({ title: `Logical Reasoning Set ${i}`, category: 'Logical', difficulty: 'Medium', type: 'logic' });
    // 3. Verbal (5 sets)
    for(let i=1; i<=5; i++) setsToCreate.push({ title: `Verbal Ability Set ${i}`, category: 'Verbal', difficulty: 'Easy', type: 'verbal' });
    // 4. Technical (5 sets)
    for(let i=1; i<=5; i++) setsToCreate.push({ title: `Technical Computer Science Set ${i}`, category: 'Technical', difficulty: 'Hard', type: 'tech' });

    for (const set of setsToCreate) {
        const [res] = await connection.query(
            'INSERT INTO aptitudeTests (mentorId, title, description, category, difficulty, icon, duration, totalQuestions, totalMarks, isPublished) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 1)',
            [mentorId, set.title, `Generated ${set.category} Questions`, set.category, set.difficulty, 'ri-book-line', 30, TOTAL_QUESTIONS_PER_SET, TOTAL_QUESTIONS_PER_SET]
        );
        const testId = res.insertId;
        
        let shuffledVerbal = [...verbalPool].sort(() => 0.5 - Math.random());
        let shuffledTech = [...technicalPool].sort(() => 0.5 - Math.random());

        for(let qIdx=0; qIdx < TOTAL_QUESTIONS_PER_SET; qIdx++) {
            let qData;
            if (set.type === 'math') {
                qData = generateMathQuestion();
            } else if (set.type === 'logic') {
                qData = generateLogicQuestion();
            } else if (set.type === 'verbal') {
                const raw = shuffledVerbal[qIdx % shuffledVerbal.length];
                qData = { q: raw.q, A: raw.A, B: raw.B, C: raw.C, D: raw.D, correct: raw.c, explanation: raw.e };
            } else if (set.type === 'tech') {
                const raw = shuffledTech[qIdx % shuffledTech.length];
                qData = { q: raw.q, A: raw.A, B: raw.B, C: raw.C, D: raw.D, correct: raw.c, explanation: raw.e };
            }
            
            await connection.query(
                'INSERT INTO aptitudeQuestions (testId, question, optionA, optionB, optionC, optionD, correctOption, marks, explanation, orderIndex) VALUES (?, ?, ?, ?, ?, ?, ?, 1, ?, ?)',
                [testId, qData.q, qData.A, qData.B, qData.C, qData.D, qData.correct, qData.explanation, qIdx+1]
            );
        }
        console.log(`  Created: ${set.title}`);
    }
}

async function seedCourses(connection) {
  console.log('🌱 Seeding more courses & content...\n');

  // Get mentor IDs
  const [mentors] = await connection.query(`SELECT id FROM users WHERE role = 'mentor' ORDER BY id LIMIT 3`);
  if (mentors.length === 0) {
    console.error('❌ No mentors found. Run dbSetup.js first.');
    process.exit(1);
  }
  const m1 = mentors[0].id, m2 = mentors[1 % mentors.length].id, m3 = mentors[2 % mentors.length].id;

  // ═══════════════════════ COURSES ═══════════════════════
  const courses = [
    { title: 'Python Programming Mastery', code: 'PY101', desc: 'Complete Python course from basics to advanced — variables, loops, OOP, file handling, modules, and real-world projects.', dur: '10 weeks', mentor: m1, cat: 'Programming', type: 'theory', diff: 'beginner', sem: '1' },
    { title: 'Data Structures & Algorithms', code: 'DSA301', desc: 'Master arrays, linked lists, stacks, queues, trees, graphs, sorting, searching, and dynamic programming.', dur: '14 weeks', mentor: m1, cat: 'Data Structures', type: 'theory', diff: 'intermediate', sem: '3' },
    { title: 'React & Modern Frontend', code: 'FE201', desc: 'Build modern web applications with React, hooks, state management, routing, and API integration.', dur: '8 weeks', mentor: m2, cat: 'Web Development', type: 'practical', diff: 'intermediate', sem: '4' },
    { title: 'Database Management Systems', code: 'DB201', desc: 'Learn relational database design, SQL, normalization, transactions, indexing, and NoSQL basics.', dur: '12 weeks', mentor: m2, cat: 'Database', type: 'theory', diff: 'intermediate', sem: '3' },
    { title: 'Machine Learning Fundamentals', code: 'ML301', desc: 'Supervised and unsupervised learning, regression, classification, clustering, neural networks, and model evaluation.', dur: '16 weeks', mentor: m3, cat: 'Machine Learning', type: 'theory', diff: 'advanced', sem: '5' },
    { title: 'Node.js & Express Backend', code: 'BE301', desc: 'Build RESTful APIs with Node.js, Express, middleware, authentication, database integration, and deployment.', dur: '10 weeks', mentor: m1, cat: 'Web Development', type: 'lab', diff: 'intermediate', sem: '4' },
    { title: 'Java Object-Oriented Programming', code: 'JV201', desc: 'Java fundamentals, OOP concepts — classes, inheritance, polymorphism, interfaces, generics, and collections.', dur: '12 weeks', mentor: m3, cat: 'Programming', type: 'theory', diff: 'beginner', sem: '2' },
    { title: 'Software Engineering Practices', code: 'SE401', desc: 'SDLC, Agile, Git workflows, testing, CI/CD, code review, design patterns, and project management.', dur: '10 weeks', mentor: m2, cat: 'Software Engineering', type: 'theory', diff: 'intermediate', sem: '5' },
    { title: 'Computer Networks', code: 'CN301', desc: 'OSI model, TCP/IP, routing, switching, DNS, HTTP, network security, and socket programming.', dur: '12 weeks', mentor: m3, cat: 'Networking', type: 'theory', diff: 'intermediate', sem: '4' },
    { title: 'Operating Systems Concepts', code: 'OS301', desc: 'Process management, scheduling, memory management, file systems, deadlocks, and virtual memory.', dur: '12 weeks', mentor: m1, cat: 'Systems', type: 'theory', diff: 'intermediate', sem: '4' },
  ];

  const courseIds = {};

  for (const c of courses) {
    const [existing] = await connection.query('SELECT id FROM courses WHERE courseCode = ?', [c.code]);
    if (existing.length > 0) {
      courseIds[c.code] = existing[0].id;
      console.log(`  ⏩ ${c.code} already exists (id=${existing[0].id})`);
      continue;
    }
    const [result] = await connection.query(
      `INSERT INTO courses (title, courseCode, description, duration, mentorId, category, courseType, difficulty, semester, isPublished, status, rating)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 1, 'active', ?)`,
      [c.title, c.code, c.desc, c.dur, c.mentor, c.cat, c.type, c.diff, c.sem, (Math.random() * 1.5 + 3.5).toFixed(1)]
    );
    courseIds[c.code] = result.insertId;
    console.log(`  ✅ ${c.code} - ${c.title} (id=${result.insertId})`);
  }

  // Also grab any existing courses (DS201, MK101, DG301, CS401, CY201)
  const [allCourses] = await connection.query('SELECT id, courseCode, mentorId FROM courses');
  for (const c of allCourses) {
    if (c.courseCode && !courseIds[c.courseCode]) courseIds[c.courseCode] = c.id;
  }
  // Map existing course mentor ids
  const courseMentorMap = {};
  for (const c of allCourses) { courseMentorMap[c.courseCode] = c.mentorId; }

  // ═══════════════════════ SUBJECTS + TOPICS + CONTENT ═══════════════════════
  const courseData = {
    PY101: {
      mentor: m1,
      subjects: [
        {
          title: 'Python Basics', code: 'U1',
          topics: ['Introduction to Python', 'Variables & Data Types', 'Operators & Expressions', 'Input & Output', 'Type Casting'],
          content: [
            { title: 'Getting Started with Python', type: 'video', data: 'https://www.youtube.com/watch?v=kqtD5dpn9C8' },
            { title: 'Python Variables & Types', type: 'text', data: 'Python is dynamically typed. You dont need to declare variable types.\n\nCommon types:\n- int: 42\n- float: 3.14\n- str: "hello"\n- bool: True/False\n- list: [1,2,3]\n- dict: {"key": "value"}\n- tuple: (1,2,3)\n\nExample:\nname = "Alice"\nage = 25\npi = 3.14159\nis_student = True' },
          ]
        },
        {
          title: 'Control Flow', code: 'U2',
          topics: ['If-Else Statements', 'For Loops', 'While Loops', 'Break & Continue', 'Nested Loops'],
          content: [
            { title: 'Control Flow in Python', type: 'video', data: 'https://www.youtube.com/watch?v=Zp5MuPOtsSY' },
            { title: 'Loop Examples', type: 'text', data: '# For loop\nfor i in range(5):\n    print(i)  # 0, 1, 2, 3, 4\n\n# While loop\ncount = 0\nwhile count < 5:\n    print(count)\n    count += 1\n\n# List comprehension\nsquares = [x**2 for x in range(10)]\n\n# Nested loop\nfor i in range(3):\n    for j in range(3):\n        print(f"({i},{j})", end=" ")' },
          ]
        },
        {
          title: 'Functions & Modules', code: 'U3',
          topics: ['Defining Functions', 'Parameters & Return', 'Lambda Functions', 'Built-in Functions', 'Importing Modules'],
          content: [
            { title: 'Functions Tutorial', type: 'video', data: 'https://www.youtube.com/watch?v=9Os0o3wzS_I' },
            { title: 'Function Reference', type: 'text', data: '# Basic function\ndef greet(name):\n    return f"Hello, {name}!"\n\n# Default parameters\ndef power(base, exp=2):\n    return base ** exp\n\n# *args and **kwargs\ndef flexible(*args, **kwargs):\n    print(args)    # tuple\n    print(kwargs)  # dict\n\n# Lambda\nsquare = lambda x: x ** 2\n\n# Map & Filter\nnums = [1,2,3,4,5]\nevens = list(filter(lambda x: x%2==0, nums))\ndoubled = list(map(lambda x: x*2, nums))' },
          ]
        },
        {
          title: 'OOP in Python', code: 'U4',
          topics: ['Classes & Objects', 'Constructors', 'Inheritance', 'Polymorphism', 'Encapsulation'],
          content: [
            { title: 'OOP Concepts', type: 'video', data: 'https://www.youtube.com/watch?v=JeznW_7DlB0' },
            { title: 'OOP Code Examples', type: 'text', data: 'class Animal:\n    def __init__(self, name, species):\n        self.name = name\n        self.species = species\n    \n    def speak(self):\n        return "..."\n\nclass Dog(Animal):\n    def __init__(self, name, breed):\n        super().__init__(name, "Canine")\n        self.breed = breed\n    \n    def speak(self):\n        return "Woof!"\n\n# Usage\ndog = Dog("Buddy", "Labrador")\nprint(dog.speak())  # Woof!\nprint(dog.species)  # Canine' },
          ]
        },
        {
          title: 'File Handling & Error Handling', code: 'U5',
          topics: ['Reading Files', 'Writing Files', 'Try-Except', 'Custom Exceptions', 'Context Managers'],
          content: [
            { title: 'File Handling Guide', type: 'text', data: '# Reading a file\nwith open("data.txt", "r") as f:\n    content = f.read()\n    # or line by line:\n    # for line in f:\n    #     print(line.strip())\n\n# Writing a file\nwith open("output.txt", "w") as f:\n    f.write("Hello World\\n")\n\n# Error handling\ntry:\n    result = 10 / 0\nexcept ZeroDivisionError as e:\n    print(f"Error: {e}")\nexcept Exception as e:\n    print(f"Unexpected: {e}")\nfinally:\n    print("Done")' },
          ]
        },
      ]
    },
    DSA301: {
      mentor: m1,
      subjects: [
        {
          title: 'Arrays & Strings', code: 'U1',
          topics: ['Array Operations', 'Two Pointer Technique', 'Sliding Window', 'String Manipulation', 'Hashing'],
          content: [
            { title: 'Arrays & Strings Overview', type: 'video', data: 'https://www.youtube.com/watch?v=HdFG8L1sajw' },
            { title: 'Key Patterns', type: 'text', data: 'TWO POINTER TECHNIQUE\n======================\nUsed when array is sorted or when comparing elements.\n\nExample: Two Sum (sorted array)\ndef twoSum(arr, target):\n    left, right = 0, len(arr) - 1\n    while left < right:\n        s = arr[left] + arr[right]\n        if s == target: return [left, right]\n        elif s < target: left += 1\n        else: right -= 1\n\nSLIDING WINDOW\n==============\nUsed for subarray/substring problems.\n\nExample: Max sum subarray of size k\ndef maxSum(arr, k):\n    window = sum(arr[:k])\n    best = window\n    for i in range(k, len(arr)):\n        window += arr[i] - arr[i-k]\n        best = max(best, window)\n    return best' },
          ]
        },
        {
          title: 'Linked Lists', code: 'U2',
          topics: ['Singly Linked List', 'Doubly Linked List', 'Circular Linked List', 'Reversal', 'Cycle Detection'],
          content: [
            { title: 'Linked Lists Explained', type: 'video', data: 'https://www.youtube.com/watch?v=njTh_OwMljA' },
            { title: 'Linked List Implementation', type: 'text', data: 'class Node:\n    def __init__(self, data):\n        self.data = data\n        self.next = None\n\nclass LinkedList:\n    def __init__(self):\n        self.head = None\n    \n    def append(self, data):\n        new_node = Node(data)\n        if not self.head:\n            self.head = new_node\n            return\n        curr = self.head\n        while curr.next:\n            curr = curr.next\n        curr.next = new_node\n    \n    def reverse(self):\n        prev = None\n        curr = self.head\n        while curr:\n            next_temp = curr.next\n            curr.next = prev\n            prev = curr\n            curr = next_temp\n        self.head = prev' },
          ]
        },
        {
          title: 'Stacks & Queues', code: 'U3',
          topics: ['Stack Operations', 'Queue Operations', 'Expression Evaluation', 'BFS using Queue', 'Monotonic Stack'],
          content: [
            { title: 'Stacks & Queues Tutorial', type: 'video', data: 'https://www.youtube.com/watch?v=wjI1WNcIntg' },
          ]
        },
        {
          title: 'Trees & Graphs', code: 'U4',
          topics: ['Binary Trees', 'BST Operations', 'Tree Traversals', 'Graph Representation', 'BFS & DFS'],
          content: [
            { title: 'Trees & Graphs Visual Guide', type: 'video', data: 'https://www.youtube.com/watch?v=oSWTXtMglKE' },
            { title: 'Tree & Graph Concepts', type: 'text', data: 'BINARY SEARCH TREE (BST)\n========================\nLeft child < Parent < Right child\n\nInsertion: O(log n) average\nSearch: O(log n) average\nDeletion: O(log n) average\n\nTraversals:\n- Inorder (L, Root, R): Sorted order\n- Preorder (Root, L, R): Copy tree\n- Postorder (L, R, Root): Delete tree\n- Level order: BFS with queue\n\nGRAPH REPRESENTATION\n====================\nAdjacency List: Space O(V+E)\n  graph = {0: [1,2], 1: [0,3], ...}\n\nAdjacency Matrix: Space O(V²)\n  matrix[i][j] = 1 if edge exists\n\nBFS: Queue-based, level by level\nDFS: Stack/recursion, depth first' },
          ]
        },
        {
          title: 'Sorting & Searching', code: 'U5',
          topics: ['Bubble Sort', 'Merge Sort', 'Quick Sort', 'Binary Search', 'Counting Sort'],
          content: [
            { title: 'Sorting Algorithms Comparison', type: 'video', data: 'https://www.youtube.com/watch?v=kPRA0W1kECg' },
          ]
        },
      ]
    },
    FE201: {
      mentor: m2,
      subjects: [
        {
          title: 'React Fundamentals', code: 'U1',
          topics: ['JSX & Components', 'Props & State', 'Event Handling', 'Conditional Rendering', 'Lists & Keys'],
          content: [
            { title: 'React in 100 Seconds', type: 'video', data: 'https://www.youtube.com/watch?v=Tn6-PIqc4UM' },
            { title: 'React Basics', type: 'text', data: 'REACT COMPONENT\n================\nfunction Greeting({ name }) {\n  return <h1>Hello, {name}!</h1>;\n}\n\nSTATE WITH HOOKS\n=================\nconst [count, setCount] = useState(0);\n\nreturn (\n  <div>\n    <p>Count: {count}</p>\n    <button onClick={() => setCount(count + 1)}>\n      Increment\n    </button>\n  </div>\n);' },
          ]
        },
        {
          title: 'React Hooks Deep Dive', code: 'U2',
          topics: ['useState', 'useEffect', 'useRef', 'useMemo & useCallback', 'Custom Hooks'],
          content: [
            { title: 'React Hooks Explained', type: 'video', data: 'https://www.youtube.com/watch?v=TNhaISOUy6Q' },
            { title: 'Hooks Cheat Sheet', type: 'text', data: 'useState — State management\nconst [value, setValue] = useState(initial);\n\nuseEffect — Side effects\nuseEffect(() => {\n  // runs after render\n  return () => { /* cleanup */ };\n}, [dependencies]);\n\nuseRef — Mutable ref / DOM access\nconst ref = useRef(null);\n<input ref={ref} />\n\nuseMemo — Memoize expensive computation\nconst result = useMemo(() => expensiveFn(a, b), [a, b]);\n\nuseCallback — Memoize function reference\nconst handler = useCallback(() => { ... }, [deps]);' },
          ]
        },
        {
          title: 'Routing & State Management', code: 'U3',
          topics: ['React Router', 'Context API', 'useReducer', 'Global State Patterns', 'Route Guards'],
          content: [
            { title: 'React Router v6 Tutorial', type: 'video', data: 'https://www.youtube.com/watch?v=Ul3y1LXxzdU' },
          ]
        },
        {
          title: 'API Integration & Forms', code: 'U4',
          topics: ['Fetch & Axios', 'Loading States', 'Error Handling', 'Form Validation', 'File Uploads'],
          content: [
            { title: 'API Calls in React', type: 'text', data: 'FETCHING DATA\n==============\nconst [data, setData] = useState(null);\nconst [loading, setLoading] = useState(true);\n\nuseEffect(() => {\n  fetch("/api/items")\n    .then(res => res.json())\n    .then(json => {\n      setData(json);\n      setLoading(false);\n    })\n    .catch(err => console.error(err));\n}, []);\n\nFORM HANDLING\n=============\nconst [form, setForm] = useState({ name: "", email: "" });\n\nconst handleChange = (e) => {\n  setForm({ ...form, [e.target.name]: e.target.value });\n};\n\nconst handleSubmit = async (e) => {\n  e.preventDefault();\n  await fetch("/api/submit", {\n    method: "POST",\n    headers: { "Content-Type": "application/json" },\n    body: JSON.stringify(form)\n  });\n};' },
          ]
        },
      ]
    },
    DB201: {
      mentor: m2,
      subjects: [
        {
          title: 'Relational Database Design', code: 'U1',
          topics: ['ER Diagrams', 'Normalization (1NF-3NF)', 'Primary & Foreign Keys', 'Relationships', 'Schema Design'],
          content: [
            { title: 'Database Design Tutorial', type: 'video', data: 'https://www.youtube.com/watch?v=ztHopE5Wnpc' },
            { title: 'Normalization Guide', type: 'text', data: 'DATABASE NORMALIZATION\n======================\n\n1NF: No repeating groups, atomic values\n  ✗ courses = "Math, Science"  \n  ✓ Separate rows for each course\n\n2NF: 1NF + No partial dependencies\n  Every non-key attribute depends on the WHOLE primary key\n\n3NF: 2NF + No transitive dependencies\n  Non-key attributes depend ONLY on the primary key\n\nBCNF: For every dependency X→Y, X is a superkey\n\nExample:\nStudents(id PK, name, email)\nCourses(id PK, title, dept)\nEnrollments(studentId FK, courseId FK, grade)' },
          ]
        },
        {
          title: 'SQL Fundamentals', code: 'U2',
          topics: ['SELECT Queries', 'JOIN Operations', 'GROUP BY & HAVING', 'Subqueries', 'INSERT/UPDATE/DELETE'],
          content: [
            { title: 'SQL in 1 Hour', type: 'video', data: 'https://www.youtube.com/watch?v=HXV3zeQKqGY' },
            { title: 'SQL Cheat Sheet', type: 'text', data: '-- SELECT\nSELECT name, email FROM users WHERE age > 18 ORDER BY name;\n\n-- JOIN\nSELECT u.name, c.title\nFROM users u\nJOIN enrollments e ON u.id = e.student_id\nJOIN courses c ON e.course_id = c.id;\n\n-- GROUP BY\nSELECT dept, COUNT(*) as total, AVG(salary) as avg_sal\nFROM employees\nGROUP BY dept\nHAVING COUNT(*) > 5;\n\n-- Subquery\nSELECT * FROM employees\nWHERE salary > (SELECT AVG(salary) FROM employees);' },
          ]
        },
        {
          title: 'Transactions & Indexing', code: 'U3',
          topics: ['ACID Properties', 'Transaction Control', 'Locking', 'B-Tree Indexes', 'Query Optimization'],
          content: [
            { title: 'Transactions & ACID', type: 'text', data: 'ACID PROPERTIES\n================\nAtomicity: All or nothing\nConsistency: Valid state to valid state\nIsolation: Concurrent transactions don\'t interfere\nDurability: Committed data persists\n\nTRANSACTION CONTROL\n===================\nSTART TRANSACTION;\n  UPDATE accounts SET balance = balance - 100 WHERE id = 1;\n  UPDATE accounts SET balance = balance + 100 WHERE id = 2;\nCOMMIT;\n-- or ROLLBACK; on error\n\nINDEXING\n========\nCREATE INDEX idx_email ON users(email);\n-- B-Tree index: O(log n) lookups\n-- Speeds up: WHERE, JOIN, ORDER BY\n-- Slows down: INSERT, UPDATE, DELETE' },
          ]
        },
      ]
    },
    ML301: {
      mentor: m3,
      subjects: [
        {
          title: 'Introduction to ML', code: 'U1',
          topics: ['What is Machine Learning?', 'Types of ML', 'Data Preprocessing', 'Feature Engineering', 'Train/Test Split'],
          content: [
            { title: 'ML Crash Course', type: 'video', data: 'https://www.youtube.com/watch?v=ukzFI9rgwfU' },
            { title: 'ML Overview', type: 'text', data: 'TYPES OF MACHINE LEARNING\n=========================\n\n1. Supervised Learning\n   - Labeled data: input → output\n   - Classification: spam/not spam\n   - Regression: predict house price\n\n2. Unsupervised Learning\n   - Unlabeled data: find patterns\n   - Clustering: customer segments\n   - Dimensionality Reduction: PCA\n\n3. Reinforcement Learning\n   - Agent learns by reward/penalty\n   - Games, robotics, self-driving\n\nWORKFLOW\n========\n1. Collect Data\n2. Clean & Preprocess\n3. Feature Engineering\n4. Train Model\n5. Evaluate (accuracy, precision, recall)\n6. Tune Hyperparameters\n7. Deploy' },
          ]
        },
        {
          title: 'Supervised Learning', code: 'U2',
          topics: ['Linear Regression', 'Logistic Regression', 'Decision Trees', 'Random Forest', 'SVM'],
          content: [
            { title: 'Linear Regression Explained', type: 'video', data: 'https://www.youtube.com/watch?v=nk2CQITm_eo' },
          ]
        },
        {
          title: 'Unsupervised Learning', code: 'U3',
          topics: ['K-Means Clustering', 'Hierarchical Clustering', 'PCA', 'DBSCAN', 'Association Rules'],
          content: [
            { title: 'Clustering Algorithms', type: 'text', data: 'K-MEANS CLUSTERING\n==================\n1. Choose K centroids randomly\n2. Assign each point to nearest centroid\n3. Recalculate centroids as mean of cluster\n4. Repeat until convergence\n\nfrom sklearn.cluster import KMeans\n\nkmeans = KMeans(n_clusters=3)\nkmeans.fit(X)\nlabels = kmeans.predict(X)\ncenters = kmeans.cluster_centers_\n\nChoosing K: Elbow Method\n- Plot inertia (within-cluster sum of squares)\n- Look for "elbow" bend point' },
          ]
        },
        {
          title: 'Neural Networks', code: 'U4',
          topics: ['Perceptron', 'Activation Functions', 'Backpropagation', 'CNN Basics', 'Overfitting & Regularization'],
          content: [
            { title: 'Neural Networks Intro', type: 'video', data: 'https://www.youtube.com/watch?v=aircAruvnKk' },
          ]
        },
      ]
    },
    BE301: {
      mentor: m1,
      subjects: [
        {
          title: 'Node.js Fundamentals', code: 'U1',
          topics: ['Node.js Architecture', 'Modules & NPM', 'File System', 'Event Loop', 'Streams'],
          content: [
            { title: 'Node.js Tutorial', type: 'video', data: 'https://www.youtube.com/watch?v=TlB_eWDSMt4' },
          ]
        },
        {
          title: 'Express.js & REST APIs', code: 'U2',
          topics: ['Express Setup', 'Routes & Middleware', 'Request/Response', 'Error Handling', 'CORS'],
          content: [
            { title: 'Express REST API Guide', type: 'text', data: 'import express from "express";\nconst app = express();\n\napp.use(express.json());\n\n// GET all items\napp.get("/api/items", (req, res) => {\n  res.json({ items: [] });\n});\n\n// POST create item\napp.post("/api/items", (req, res) => {\n  const { name, price } = req.body;\n  // validate, save to DB\n  res.status(201).json({ id: 1, name, price });\n});\n\n// Error middleware\napp.use((err, req, res, next) => {\n  console.error(err.stack);\n  res.status(500).json({ error: "Server error" });\n});\n\napp.listen(5000, () => console.log("Running on :5000"));' },
          ]
        },
        {
          title: 'Authentication & Security', code: 'U3',
          topics: ['JWT Tokens', 'Password Hashing', 'Session Management', 'Rate Limiting', 'Input Validation'],
          content: [
            { title: 'JWT Authentication', type: 'text', data: 'JSON WEB TOKENS (JWT)\n=====================\n\nimport jwt from "jsonwebtoken";\nimport bcrypt from "bcryptjs";\n\n// Register\nconst hash = await bcrypt.hash(password, 10);\n// Save hash to DB\n\n// Login\nconst valid = await bcrypt.compare(password, hash);\nif (valid) {\n  const token = jwt.sign(\n    { userId: user.id, role: user.role },\n    process.env.JWT_SECRET,\n    { expiresIn: "24h" }\n  );\n  res.json({ token });\n}\n\n// Middleware\nfunction authenticate(req, res, next) {\n  const token = req.headers.authorization?.split(" ")[1];\n  const decoded = jwt.verify(token, process.env.JWT_SECRET);\n  req.user = decoded;\n  next();\n}' },
          ]
        },
      ]
    },
    JV201: {
      mentor: m3,
      subjects: [
        {
          title: 'Java Basics', code: 'U1',
          topics: ['JDK Setup', 'Variables & Types', 'Control Structures', 'Arrays', 'Methods'],
          content: [
            { title: 'Java Introduction', type: 'video', data: 'https://www.youtube.com/watch?v=eIrMbAQSU34' },
            { title: 'Java Syntax Guide', type: 'text', data: 'public class Main {\n    public static void main(String[] args) {\n        // Variables\n        int age = 25;\n        String name = "Alice";\n        double gpa = 3.85;\n        boolean isActive = true;\n        \n        // Array\n        int[] numbers = {1, 2, 3, 4, 5};\n        \n        // For loop\n        for (int i = 0; i < numbers.length; i++) {\n            System.out.println(numbers[i]);\n        }\n        \n        // Enhanced for\n        for (int num : numbers) {\n            System.out.println(num);\n        }\n        \n        // Method call\n        int result = add(10, 20);\n    }\n    \n    static int add(int a, int b) {\n        return a + b;\n    }\n}' },
          ]
        },
        {
          title: 'OOP Concepts', code: 'U2',
          topics: ['Classes & Objects', 'Constructors', 'Inheritance', 'Polymorphism', 'Abstract Classes & Interfaces'],
          content: [
            { title: 'Java OOP', type: 'text', data: '// Class definition\npublic class Animal {\n    protected String name;\n    \n    public Animal(String name) {\n        this.name = name;\n    }\n    \n    public void speak() {\n        System.out.println("...");\n    }\n}\n\n// Inheritance\npublic class Dog extends Animal {\n    private String breed;\n    \n    public Dog(String name, String breed) {\n        super(name);\n        this.breed = breed;\n    }\n    \n    @Override\n    public void speak() {\n        System.out.println("Woof!");\n    }\n}\n\n// Interface\npublic interface Drawable {\n    void draw();\n}\n\npublic class Circle implements Drawable {\n    public void draw() { ... }\n}' },
          ]
        },
        {
          title: 'Collections & Generics', code: 'U3',
          topics: ['ArrayList', 'HashMap', 'LinkedList', 'Generics', 'Iterators'],
          content: [
            { title: 'Java Collections', type: 'video', data: 'https://www.youtube.com/watch?v=viTainYq5B4' },
          ]
        },
      ]
    },
    SE401: {
      mentor: m2,
      subjects: [
        {
          title: 'SDLC & Agile', code: 'U1',
          topics: ['Waterfall Model', 'Agile Methodology', 'Scrum Framework', 'Sprint Planning', 'User Stories'],
          content: [
            { title: 'Agile & Scrum Overview', type: 'text', data: 'AGILE PRINCIPLES\n=================\n- Individuals and interactions over processes\n- Working software over documentation\n- Customer collaboration over contracts\n- Responding to change over following a plan\n\nSCRUM FRAMEWORK\n===============\nRoles: Product Owner, Scrum Master, Dev Team\nArtifacts: Product Backlog, Sprint Backlog, Increment\nCeremonies:\n  1. Sprint Planning (what to build)\n  2. Daily Standup (15 min sync)\n  3. Sprint Review (demo)\n  4. Sprint Retrospective (improve)\n\nSprint: 1-4 week iteration\nVelocity: Story points completed per sprint' },
          ]
        },
        {
          title: 'Version Control & CI/CD', code: 'U2',
          topics: ['Git Basics', 'Branching Strategies', 'Pull Requests', 'CI/CD Pipelines', 'Automated Testing'],
          content: [
            { title: 'Git & GitHub Guide', type: 'text', data: 'GIT ESSENTIALS\n===============\ngit init              # Initialize repo\ngit add .             # Stage all files\ngit commit -m "msg"   # Commit\ngit branch feature    # Create branch\ngit checkout feature  # Switch branch\ngit merge feature     # Merge into current\ngit push origin main  # Push to remote\n\nBRANCHING STRATEGY\n==================\nmain ← develop ← feature/xxx\n              ← bugfix/xxx\n              ← hotfix/xxx\n\nCI/CD PIPELINE\n==============\n1. Developer pushes code\n2. CI server pulls & builds\n3. Run automated tests\n4. Static code analysis\n5. Deploy to staging\n6. Manual approval\n7. Deploy to production' },
          ]
        },
        {
          title: 'Design Patterns', code: 'U3',
          topics: ['Singleton', 'Factory', 'Observer', 'Strategy', 'MVC Pattern'],
          content: [
            { title: 'Design Patterns Tutorial', type: 'video', data: 'https://www.youtube.com/watch?v=v9ejT8FO-7I' },
          ]
        },
      ]
    },
    CN301: {
      mentor: m3,
      subjects: [
        {
          title: 'Network Models', code: 'U1',
          topics: ['OSI 7 Layers', 'TCP/IP Model', 'Protocols Overview', 'Network Devices', 'IP Addressing'],
          content: [
            { title: 'Networking Fundamentals', type: 'video', data: 'https://www.youtube.com/watch?v=3QhU9jd03a0' },
            { title: 'OSI Model Reference', type: 'text', data: 'OSI 7 LAYERS\n=============\n7. Application  - HTTP, FTP, SMTP, DNS\n6. Presentation - SSL/TLS, encryption, compression\n5. Session      - Session management, authentication\n4. Transport    - TCP (reliable), UDP (fast)\n3. Network      - IP, routing, ICMP\n2. Data Link    - MAC, Ethernet, switches\n1. Physical     - Cables, signals, hubs\n\nTCP vs UDP\n==========\nTCP: Connection-oriented, reliable, ordered\n     Used for: HTTP, email, file transfer\n\nUDP: Connectionless, fast, no guarantee\n     Used for: streaming, gaming, DNS\n\nIP ADDRESSING (IPv4)\n====================\nFormat: 192.168.1.100\nClasses: A (1-126), B (128-191), C (192-223)\nSubnet: 255.255.255.0 = /24 = 254 hosts' },
          ]
        },
        {
          title: 'Application Layer Protocols', code: 'U2',
          topics: ['HTTP/HTTPS', 'DNS', 'SMTP & POP3', 'FTP', 'WebSocket'],
          content: [
            { title: 'HTTP Protocol Explained', type: 'text', data: 'HTTP METHODS\n=============\nGET    - Retrieve resource\nPOST   - Create resource\nPUT    - Update resource (full)\nPATCH  - Update resource (partial)\nDELETE - Remove resource\n\nSTATUS CODES\n============\n200 OK\n201 Created\n301 Moved Permanently\n400 Bad Request\n401 Unauthorized\n403 Forbidden\n404 Not Found\n500 Internal Server Error\n\nHTTPS = HTTP + TLS\n- Encrypts data in transit\n- Certificate-based authentication\n- Prevents man-in-the-middle attacks' },
          ]
        },
      ]
    },
    OS301: {
      mentor: m1,
      subjects: [
        {
          title: 'Process Management', code: 'U1',
          topics: ['Process vs Thread', 'Process States', 'Context Switching', 'IPC Mechanisms', 'Multithreading'],
          content: [
            { title: 'Processes & Threads', type: 'video', data: 'https://www.youtube.com/watch?v=exbKr6fnoUw' },
            { title: 'Process Management Notes', type: 'text', data: 'PROCESS STATES\n===============\nNew → Ready → Running → Waiting → Ready → Terminated\n\nPROCESS vs THREAD\n==================\nProcess: Independent, separate memory, heavy\nThread: Shares memory with parent, lightweight\n\nCONTEXT SWITCH\n===============\n- Save state of current process (PCB)\n- Load state of next process\n- Overhead: ~1-10 microseconds\n\nIPC (Inter-Process Communication)\n==================================\n1. Pipes (unidirectional)\n2. Message Queues\n3. Shared Memory\n4. Sockets\n5. Signals' },
          ]
        },
        {
          title: 'CPU Scheduling', code: 'U2',
          topics: ['FCFS', 'SJF', 'Round Robin', 'Priority Scheduling', 'Multilevel Queue'],
          content: [
            { title: 'CPU Scheduling Algorithms', type: 'text', data: 'SCHEDULING ALGORITHMS\n=====================\n\nFCFS (First Come First Serve)\n- Non-preemptive, simple\n- Convoy effect problem\n\nSJF (Shortest Job First)\n- Optimal average waiting time\n- Starvation possible\n\nRound Robin\n- Time quantum (e.g., 4ms)\n- Preemptive, fair\n- Higher context switch overhead\n\nPriority Scheduling\n- Each process has priority number\n- Can cause starvation\n- Solution: Aging\n\nMultilevel Queue\n- Separate queues for different types\n- System > Interactive > Batch' },
          ]
        },
        {
          title: 'Memory Management', code: 'U3',
          topics: ['Paging', 'Segmentation', 'Virtual Memory', 'Page Replacement', 'Thrashing'],
          content: [
            { title: 'Virtual Memory & Paging', type: 'video', data: 'https://www.youtube.com/watch?v=sJCtpPQDJYw' },
          ]
        },
      ]
    },
    // ═══════════ EXISTING COURSES (add subjects/topics/content) ═══════════
    DS201: {
      mentor: m1,
      subjects: [
        {
          title: 'Statistics & Probability', code: 'U1',
          topics: ['Descriptive Statistics', 'Probability Basics', 'Distributions', 'Hypothesis Testing', 'Correlation'],
          content: [
            { title: 'Statistics for Data Science', type: 'video', data: 'https://www.youtube.com/watch?v=xxpc-HPKN28' },
            { title: 'Statistics Fundamentals', type: 'text', data: 'DESCRIPTIVE STATISTICS\n======================\nMean: Average of all values\nMedian: Middle value when sorted\nMode: Most frequent value\nStd Dev: Spread of data around mean\n\nPROBABILITY\n===========\nP(A) = favorable outcomes / total outcomes\nP(A ∪ B) = P(A) + P(B) - P(A ∩ B)\nP(A|B) = P(A ∩ B) / P(B)  [Bayes theorem]\n\nDISTRIBUTIONS\n==============\nNormal: Bell curve, 68-95-99.7 rule\nBinomial: n trials, p probability\nPoisson: Events in fixed interval' },
          ]
        },
        {
          title: 'Python for Data Science', code: 'U2',
          topics: ['NumPy Arrays', 'Pandas DataFrames', 'Data Cleaning', 'Matplotlib', 'Seaborn'],
          content: [
            { title: 'Pandas Tutorial', type: 'video', data: 'https://www.youtube.com/watch?v=vmEHCJofslg' },
            { title: 'Pandas Cheat Sheet', type: 'text', data: 'import pandas as pd\nimport numpy as np\n\n# Read data\ndf = pd.read_csv("data.csv")\n\n# Explore\ndf.head()          # First 5 rows\ndf.info()          # Column types\ndf.describe()      # Statistics\ndf.shape           # (rows, cols)\n\n# Select\ndf["column"]       # Single column\ndf[["col1","col2"]]# Multiple columns\ndf[df["age"] > 25] # Filter rows\n\n# Clean\ndf.dropna()        # Remove NaN rows\ndf.fillna(0)       # Fill NaN with 0\ndf.duplicated()    # Find duplicates\n\n# Group\ndf.groupby("dept")["salary"].mean()\n\n# Plot\ndf["salary"].hist()\ndf.plot(kind="scatter", x="age", y="salary")' },
          ]
        },
        {
          title: 'Data Visualization', code: 'U3',
          topics: ['Chart Types', 'Matplotlib Advanced', 'Interactive Plots', 'Dashboard Design', 'Storytelling with Data'],
          content: [
            { title: 'Data Visualization Guide', type: 'text', data: 'CHART TYPES\n============\nBar Chart: Compare categories\nLine Chart: Trends over time\nScatter Plot: Relationships\nHistogram: Distribution\nBox Plot: Spread & outliers\nHeatmap: Correlation matrix\nPie Chart: Proportions (use sparingly)\n\nimport matplotlib.pyplot as plt\n\nfig, ax = plt.subplots(figsize=(10, 6))\nax.bar(categories, values, color="steelblue")\nax.set_title("Sales by Category")\nax.set_xlabel("Category")\nax.set_ylabel("Sales ($)")\nplt.tight_layout()\nplt.show()' },
          ]
        },
        {
          title: 'Machine Learning Basics', code: 'U4',
          topics: ['Supervised Learning', 'Linear Regression', 'Classification', 'Model Evaluation', 'Scikit-learn'],
          content: [
            { title: 'ML with Scikit-learn', type: 'video', data: 'https://www.youtube.com/watch?v=pqNCD_5r0IU' },
          ]
        },
      ]
    },
    MK101: {
      mentor: m2,
      subjects: [
        {
          title: 'SEO & Content Marketing', code: 'U1',
          topics: ['Keyword Research', 'On-Page SEO', 'Content Strategy', 'Blog Marketing', 'SEO Tools'],
          content: [
            { title: 'SEO Fundamentals', type: 'video', data: 'https://www.youtube.com/watch?v=DvwS7cV9GmQ' },
            { title: 'SEO Checklist', type: 'text', data: 'SEO CHECKLIST\n==============\n\nON-PAGE SEO\n- Title tag (50-60 chars, keyword first)\n- Meta description (150-160 chars)\n- H1, H2, H3 tags with keywords\n- Internal linking\n- Image alt tags\n- URL structure (/topic-keyword)\n- Mobile-friendly design\n- Page speed < 3 seconds\n\nCONTENT STRATEGY\n- Research keywords (Google Keyword Planner)\n- Create pillar content + clusters\n- E-A-T: Expertise, Authority, Trust\n- Update content regularly\n- 1500+ words for competitive topics\n\nTOOLS\n- Google Search Console\n- Google Analytics\n- Ahrefs / SEMrush\n- Yoast SEO (WordPress)' },
          ]
        },
        {
          title: 'Social Media Marketing', code: 'U2',
          topics: ['Platform Strategy', 'Content Calendar', 'Engagement Tactics', 'Influencer Marketing', 'Analytics'],
          content: [
            { title: 'Social Media Strategy', type: 'text', data: 'PLATFORM OVERVIEW\n==================\nInstagram: Visual, 18-34 age, Reels perform well\nLinkedIn: B2B, professional content, articles\nTwitter/X: News, conversations, threads\nYouTube: Long-form video, tutorials, SEO\nTikTok: Short-form, Gen Z, trending audio\n\nCONTENT MIX\n============\n80% Value (educate, entertain, inspire)\n20% Promotional\n\nENGAGEMENT FORMULA\n===================\n1. Hook (first 3 seconds)\n2. Value (teach something)\n3. CTA (comment, share, follow)\n\nKEY METRICS\n===========\n- Reach & Impressions\n- Engagement Rate = (likes+comments+shares)/reach\n- Click-through Rate (CTR)\n- Conversion Rate\n- Follower Growth Rate' },
          ]
        },
        {
          title: 'Email Marketing & Analytics', code: 'U3',
          topics: ['Email Campaigns', 'Automation', 'A/B Testing', 'Google Analytics', 'ROI Measurement'],
          content: [
            { title: 'Email Marketing Guide', type: 'text', data: 'EMAIL MARKETING BEST PRACTICES\n================================\n\nSUBJECT LINES\n- Keep under 50 characters\n- Personalize with {first_name}\n- Create urgency or curiosity\n- A/B test different versions\n\nEMAIL STRUCTURE\n- Clear header with logo\n- Single CTA per email\n- Mobile-responsive design\n- Unsubscribe link (legally required)\n\nAUTOMATION SEQUENCES\n- Welcome series (3-5 emails)\n- Abandoned cart recovery\n- Re-engagement campaigns\n- Drip campaigns for nurturing\n\nKEY METRICS\n- Open Rate: 15-25% is good\n- Click Rate: 2-5% is good\n- Unsubscribe Rate: < 0.5%\n- Conversion Rate: Track per campaign' },
          ]
        },
      ]
    },
    DG301: {
      mentor: m2,
      subjects: [
        {
          title: 'Design Principles', code: 'U1',
          topics: ['Color Theory', 'Typography', 'Layout & Grid', 'Visual Hierarchy', 'Gestalt Principles'],
          content: [
            { title: 'UI Design Fundamentals', type: 'video', data: 'https://www.youtube.com/watch?v=_Hp_dI0DzY4' },
            { title: 'Design Principles Reference', type: 'text', data: 'COLOR THEORY\n=============\nPrimary: Red, Blue, Yellow\nComplementary: Opposite on color wheel\nAnalogous: Adjacent on color wheel\n60-30-10 Rule: Primary-Secondary-Accent\n\nTYPOGRAPHY\n===========\n- Heading: Bold, larger, sans-serif\n- Body: Regular, 16px minimum, readable\n- Line height: 1.5-1.8x font size\n- Max 2-3 font families per project\n\nVISUAL HIERARCHY\n=================\n1. Size: Larger = more important\n2. Color: Bright/contrast = attention\n3. Position: Top-left first (F-pattern)\n4. Whitespace: Isolation = emphasis\n5. Alignment: Consistency = order\n\nGESTALT PRINCIPLES\n===================\n- Proximity: Close items = related\n- Similarity: Same style = grouped\n- Closure: Mind completes shapes\n- Continuity: Eye follows paths' },
          ]
        },
        {
          title: 'UX Research & Wireframing', code: 'U2',
          topics: ['User Personas', 'User Journey Maps', 'Wireframing', 'Prototyping', 'Usability Testing'],
          content: [
            { title: 'UX Research Methods', type: 'text', data: 'USER RESEARCH METHODS\n=====================\n\nQUANTITATIVE\n- Surveys (Google Forms, Typeform)\n- Analytics (heatmaps, click tracking)\n- A/B Testing\n\nQUALITATIVE\n- User Interviews (5-8 users)\n- Usability Testing (think-aloud protocol)\n- Card Sorting (information architecture)\n\nUSER PERSONA TEMPLATE\n=====================\nName: Sarah, 28, Marketing Manager\nGoals: Save time, automate reports\nFrustrations: Complex interfaces, slow loading\nTech: MacBook, iPhone, Chrome\nQuote: "I need data at a glance"\n\nWIREFRAMING TOOLS\n=================\n- Figma (free, collaborative)\n- Sketch (Mac only)\n- Adobe XD\n- Balsamiq (low-fidelity)' },
          ]
        },
        {
          title: 'UI Design Tools & Systems', code: 'U3',
          topics: ['Figma Basics', 'Components & Variants', 'Design Systems', 'Responsive Design', 'Handoff to Developers'],
          content: [
            { title: 'Figma Crash Course', type: 'video', data: 'https://www.youtube.com/watch?v=FTFaQWZBqQ8' },
          ]
        },
      ]
    },
    CS401: {
      mentor: m3,
      subjects: [
        {
          title: 'React Native Fundamentals', code: 'U1',
          topics: ['Environment Setup', 'Core Components', 'Styling & Flexbox', 'Navigation', 'Platform-Specific Code'],
          content: [
            { title: 'React Native Tutorial', type: 'video', data: 'https://www.youtube.com/watch?v=0-S5a0eXPoc' },
            { title: 'React Native Basics', type: 'text', data: 'CORE COMPONENTS\n=================\nimport { View, Text, Image, ScrollView, TextInput, TouchableOpacity } from "react-native";\n\nexport default function App() {\n  return (\n    <View style={styles.container}>\n      <Text style={styles.title}>Hello React Native!</Text>\n      <TouchableOpacity style={styles.button}>\n        <Text>Press Me</Text>\n      </TouchableOpacity>\n    </View>\n  );\n}\n\nconst styles = StyleSheet.create({\n  container: {\n    flex: 1,\n    justifyContent: "center",\n    alignItems: "center",\n    backgroundColor: "#fff",\n  },\n  title: {\n    fontSize: 24,\n    fontWeight: "bold",\n  },\n  button: {\n    backgroundColor: "#007AFF",\n    padding: 12,\n    borderRadius: 8,\n  },\n});' },
          ]
        },
        {
          title: 'State & API Integration', code: 'U2',
          topics: ['useState & useEffect', 'Fetching Data', 'AsyncStorage', 'Context API', 'Redux Toolkit'],
          content: [
            { title: 'React Native API & State', type: 'text', data: 'FETCHING DATA\n==============\nconst [users, setUsers] = useState([]);\nconst [loading, setLoading] = useState(true);\n\nuseEffect(() => {\n  fetch("https://jsonplaceholder.typicode.com/users")\n    .then(r => r.json())\n    .then(data => { setUsers(data); setLoading(false); });\n}, []);\n\nFLATLIST\n========\nimport { FlatList } from "react-native";\n\n<FlatList\n  data={users}\n  keyExtractor={item => item.id.toString()}\n  renderItem={({ item }) => (\n    <View><Text>{item.name}</Text></View>\n  )}\n/>\n\nASYNC STORAGE\n=============\nimport AsyncStorage from "@react-native-async-storage/async-storage";\nawait AsyncStorage.setItem("token", "abc123");\nconst token = await AsyncStorage.getItem("token");' },
          ]
        },
        {
          title: 'Publishing & Deployment', code: 'U3',
          topics: ['App Icons & Splash Screen', 'Build for iOS', 'Build for Android', 'App Store Submission', 'OTA Updates'],
          content: [
            { title: 'Publishing Your App', type: 'video', data: 'https://www.youtube.com/watch?v=LE4Mgkrf7Sk' },
          ]
        },
      ]
    },
    CY201: {
      mentor: m3,
      subjects: [
        {
          title: 'Security Fundamentals', code: 'U1',
          topics: ['CIA Triad', 'Types of Threats', 'Attack Vectors', 'Security Policies', 'Risk Assessment'],
          content: [
            { title: 'Cybersecurity Introduction', type: 'video', data: 'https://www.youtube.com/watch?v=inWWhr5tnEA' },
            { title: 'Security Concepts', type: 'text', data: 'CIA TRIAD\n=========\nConfidentiality: Only authorized access\nIntegrity: Data is accurate and unmodified\nAvailability: Systems accessible when needed\n\nCOMMON THREATS\n==============\n- Malware (viruses, ransomware, trojans)\n- Phishing (fake emails/websites)\n- SQL Injection (malicious SQL input)\n- XSS (Cross-Site Scripting)\n- DDoS (Distributed Denial of Service)\n- Man-in-the-Middle (intercepting comms)\n- Social Engineering (human manipulation)\n\nSECURITY LAYERS\n===============\n1. Physical: Locks, cameras, badges\n2. Network: Firewalls, IDS/IPS, VPN\n3. Application: Input validation, auth\n4. Data: Encryption, backups\n5. User: Training, strong passwords, MFA' },
          ]
        },
        {
          title: 'Network Security', code: 'U2',
          topics: ['Firewalls', 'VPN', 'IDS/IPS', 'SSL/TLS', 'Network Monitoring'],
          content: [
            { title: 'Network Security Guide', type: 'text', data: 'FIREWALLS\n=========\n- Packet Filter: IP/port rules\n- Stateful: Tracks connections\n- Application Layer: Deep inspection\n- Next-Gen (NGFW): ML-based detection\n\nVPN (Virtual Private Network)\n==============================\n- Encrypts traffic between endpoints\n- Types: Site-to-Site, Remote Access\n- Protocols: OpenVPN, WireGuard, IPSec\n\nSSL/TLS HANDSHAKE\n==================\n1. Client Hello (supported ciphers)\n2. Server Hello (chosen cipher + cert)\n3. Key Exchange (asymmetric)\n4. Session Keys (symmetric)\n5. Encrypted communication begins\n\nIDS vs IPS\n==========\nIDS: Detects & alerts (passive)\nIPS: Detects & blocks (active)' },
          ]
        },
        {
          title: 'Web Application Security', code: 'U3',
          topics: ['OWASP Top 10', 'SQL Injection Prevention', 'XSS Prevention', 'CSRF Protection', 'Security Headers'],
          content: [
            { title: 'OWASP Top 10 Explained', type: 'video', data: 'https://www.youtube.com/watch?v=rWHniC8FOzc' },
            { title: 'Web Security Practices', type: 'text', data: 'SQL INJECTION PREVENTION\n=========================\n// BAD - vulnerable\nquery = "SELECT * FROM users WHERE id = " + userId;\n\n// GOOD - parameterized\ndb.query("SELECT * FROM users WHERE id = ?", [userId]);\n\nXSS PREVENTION\n===============\n1. Escape output: &lt; &gt; &amp;\n2. Use Content-Security-Policy header\n3. Set HttpOnly cookies\n4. Sanitize user input (DOMPurify)\n\nCSRF PROTECTION\n================\n1. CSRF tokens in forms\n2. SameSite cookie attribute\n3. Check Origin/Referer headers\n\nSECURITY HEADERS\n=================\nX-Content-Type-Options: nosniff\nX-Frame-Options: DENY\nStrict-Transport-Security: max-age=31536000\nContent-Security-Policy: default-src self' },
          ]
        },
      ]
    },
  };

  // ═══════════════════ INSERT SUBJECTS, TOPICS & CONTENT ═══════════════════
  // Also update existing CS101 (Web Dev) with more content
  const [cs101] = await connection.query("SELECT id, mentorId FROM courses WHERE courseCode = 'CS101'");
  if (cs101.length > 0) {
    const cid = cs101[0].id, mid = cs101[0].mentorId;
    // Check if JS subject already exists
    const [existingJS] = await connection.query("SELECT id FROM courseSubjects WHERE courseId = ? AND title LIKE '%JavaScript%'", [cid]);
    if (existingJS.length === 0) {
      // Add more subjects to existing Web Dev course
      const [jsSubject] = await connection.query(
        "INSERT INTO courseSubjects (courseId, title, code, description, sortOrder) VALUES (?, 'JavaScript Essentials', 'U4', 'DOM manipulation, events, and async JS', 4)",
        [cid]
      );
      await connection.query("INSERT INTO courseTopics (subjectId, title, sortOrder) VALUES (?, 'DOM Manipulation', 1), (?, 'Event Listeners', 2), (?, 'Fetch API & Promises', 3), (?, 'Async/Await', 4)", [jsSubject.insertId, jsSubject.insertId, jsSubject.insertId, jsSubject.insertId]);
      await connection.query(
        "INSERT INTO courseContent (courseId, subjectId, title, description, contentType, contentData, sortOrder, status, uploadedBy) VALUES (?, ?, 'JavaScript DOM Tutorial', 'Learn to manipulate HTML elements with JavaScript', 'video', 'https://www.youtube.com/watch?v=y17RuWkWdn8', 1, 'active', ?)",
        [cid, jsSubject.insertId, mid]
      );
      await connection.query(
        "INSERT INTO courseContent (courseId, subjectId, title, description, contentType, contentData, sortOrder, status, uploadedBy) VALUES (?, ?, 'Async JavaScript Guide', 'Promises, async/await, and API calls', 'text', 'PROMISES\\n========\\nfetch(\"https://api.example.com/data\")\\n  .then(res => res.json())\\n  .then(data => console.log(data))\\n  .catch(err => console.error(err));\\n\\nASYNC/AWAIT\\n===========\\nasync function getData() {\\n  try {\\n    const res = await fetch(url);\\n    const data = await res.json();\\n    return data;\\n  } catch (err) {\\n    console.error(err);\\n  }\\n}', 2, 'active', ?)",
        [cid, jsSubject.insertId, mid]
      );

      const [reactSubject] = await connection.query(
        "INSERT INTO courseSubjects (courseId, title, code, description, sortOrder) VALUES (?, 'React Framework', 'U5', 'Building modern UIs with React', 5)",
        [cid]
      );
      await connection.query("INSERT INTO courseTopics (subjectId, title, sortOrder) VALUES (?, 'React Components', 1), (?, 'State & Props', 2), (?, 'useEffect Hook', 3)", [reactSubject.insertId, reactSubject.insertId, reactSubject.insertId]);
      await connection.query(
        "INSERT INTO courseContent (courseId, subjectId, title, description, contentType, contentData, sortOrder, status, uploadedBy) VALUES (?, ?, 'React Crash Course', 'Full React tutorial for beginners', 'video', 'https://www.youtube.com/watch?v=w7ejDZ8SWv8', 1, 'active', ?)",
        [cid, reactSubject.insertId, mid]
      );
      console.log(`  ✅ Added more content to CS101`);
    }
  }

  for (const [code, data] of Object.entries(courseData)) {
    const courseId = courseIds[code];
    if (!courseId) { console.log(`  ⏩ ${code} not found, skipping`); continue; }

    // Use actual mentor from courses table if available
    const mentorId = courseMentorMap[code] || data.mentor;

    // Check if subjects already exist
    const [existingSubs] = await connection.query('SELECT COUNT(*) as cnt FROM courseSubjects WHERE courseId = ?', [courseId]);
    if (existingSubs[0].cnt > 0) { console.log(`  ⏩ ${code} already has subjects`); continue; }

    for (const [si, sub] of data.subjects.entries()) {
      const [subResult] = await connection.query(
        'INSERT INTO courseSubjects (courseId, title, code, description, sortOrder) VALUES (?, ?, ?, ?, ?)',
        [courseId, sub.title, sub.code, `Unit ${si + 1}: ${sub.title}`, si + 1]
      );
      const subId = subResult.insertId;

      // Insert topics
      for (const [ti, topicTitle] of sub.topics.entries()) {
        await connection.query(
          'INSERT INTO courseTopics (subjectId, title, sortOrder) VALUES (?, ?, ?)',
          [subId, topicTitle, ti + 1]
        );
      }

      // Insert content
      for (const [ci, content] of (sub.content || []).entries()) {
        await connection.query(
          'INSERT INTO courseContent (courseId, subjectId, title, description, contentType, contentData, sortOrder, status, uploadedBy) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
          [courseId, subId, content.title, content.title, content.type, content.data, ci + 1, 'active', mentorId]
        );
      }
    }
    console.log(`  ✅ ${code} - subjects, topics & content seeded`);
  }

  // ═══════════════════ ENROLL STUDENTS IN NEW COURSES ═══════════════════
  const [studentRows] = await connection.query(`SELECT id FROM users WHERE role = 'student'`);
  const [newCourses] = await connection.query(`SELECT id FROM courses WHERE courseCode IN ('PY101','DSA301','FE201','DB201','ML301')`);

  if (studentRows.length > 0 && newCourses.length > 0) {
    for (const student of studentRows) {
      // Enroll in 2-3 of the new courses
      const shuffled = [...newCourses].sort(() => Math.random() - 0.5).slice(0, 2 + Math.floor(Math.random() * 2));
      for (const course of shuffled) {
        try {
          await connection.query(
            "INSERT IGNORE INTO courseEnrollments (courseId, studentId, completionPercentage, status, completedTopics) VALUES (?, ?, ?, 'active', '[]')",
            [course.id, student.id, Math.floor(Math.random() * 60)]
          );
        } catch {}
      }
    }
    console.log(`  ✅ Students enrolled in new courses`);
  }

  console.log('\n🎉 Course seeding complete!');
  console.log(`   ${Object.keys(courseData).length} new courses with subjects, topics & content`);
  console.log('   Existing courses updated with more content');
}

// ═══════════════════════════════════════════════════════════════════
//  SEED 45 CODING PROBLEMS (Python-based)
// ═══════════════════════════════════════════════════════════════════
async function seedCodingProblems(connection) {
  console.log('\n--- Seeding Coding Problems (45 · Python) ---');

  // Add boilerplate column if missing
  try { await connection.query("ALTER TABLE codingProblems ADD COLUMN boilerplate TEXT DEFAULT NULL AFTER sampleOutput"); } catch {}

  const [mentors] = await connection.query(`SELECT id FROM users WHERE role = 'mentor' ORDER BY id LIMIT 1`);
  if (!mentors.length) { console.error('No mentor found for coding problems'); return; }
  const mid = mentors[0].id;

  // Delete old seeded problems
  await connection.query("DELETE FROM codingProblems WHERE title LIKE '%(Seeded)%'");

  const problems = [
    // ═══ EASY (15) ═══
    {
      title: 'Two Sum (Seeded)', difficulty: 'easy', category: 'Arrays',
      description: 'Given a list of integers and a target, return the indices of two numbers that add up to the target.',
      inputFormat: 'List of integers and a target integer', outputFormat: 'List of two indices',
      constraints: '2 ≤ len(arr) ≤ 10⁴', sampleInput: '[2,7,11,15]\\n9', sampleOutput: '[0,1]',
      boilerplate: 'def two_sum(nums, target):\\n    # Return indices of two numbers that add up to target\\n    pass',
      testCases: [{"input":"[2,7,11,15]\\n9","output":"[0,1]"},{"input":"[3,2,4]\\n6","output":"[1,2]"}]
    },
    {
      title: 'Palindrome Check (Seeded)', difficulty: 'easy', category: 'Strings',
      description: 'Determine if a given string is a palindrome (reads the same forwards and backwards).',
      inputFormat: 'A string', outputFormat: 'True or False',
      constraints: '1 ≤ len(s) ≤ 10⁵', sampleInput: 'racecar', sampleOutput: 'True',
      boilerplate: 'def is_palindrome(s):\\n    # Return True if s is a palindrome\\n    pass',
      testCases: [{"input":"racecar","output":"True"},{"input":"hello","output":"False"}]
    },
    {
      title: 'Reverse List (Seeded)', difficulty: 'easy', category: 'Arrays',
      description: 'Reverse a list of integers in-place and return it.',
      inputFormat: 'List of integers', outputFormat: 'Reversed list',
      constraints: '1 ≤ len(arr) ≤ 10⁴', sampleInput: '[1,2,3,4,5]', sampleOutput: '[5,4,3,2,1]',
      boilerplate: 'def reverse_list(arr):\\n    # Reverse the list in-place and return it\\n    pass',
      testCases: [{"input":"[1,2,3,4,5]","output":"[5,4,3,2,1]"},{"input":"[10,20]","output":"[20,10]"}]
    },
    {
      title: 'Count Vowels (Seeded)', difficulty: 'easy', category: 'Strings',
      description: 'Count the number of vowels (a, e, i, o, u) in a given string (case-insensitive).',
      inputFormat: 'A string', outputFormat: 'Integer count',
      constraints: '1 ≤ len(s) ≤ 10⁴', sampleInput: 'Hello World', sampleOutput: '3',
      boilerplate: 'def count_vowels(s):\\n    # Return the count of vowels in s\\n    pass',
      testCases: [{"input":"Hello World","output":"3"},{"input":"aeiou","output":"5"}]
    },
    {
      title: 'Find Maximum (Seeded)', difficulty: 'easy', category: 'Arrays',
      description: 'Find and return the maximum element in a list of integers.',
      inputFormat: 'List of integers', outputFormat: 'Maximum integer',
      constraints: '1 ≤ len(arr) ≤ 10⁴', sampleInput: '[3,7,2,9,1]', sampleOutput: '9',
      boilerplate: 'def find_max(arr):\\n    # Return the maximum element\\n    pass',
      testCases: [{"input":"[3,7,2,9,1]","output":"9"},{"input":"[-5,-1,-8]","output":"-1"}]
    },
    {
      title: 'Factorial (Seeded)', difficulty: 'easy', category: 'Math',
      description: 'Calculate the factorial of a non-negative integer n (n!).',
      inputFormat: 'Non-negative integer n', outputFormat: 'n!',
      constraints: '0 ≤ n ≤ 20', sampleInput: '5', sampleOutput: '120',
      boilerplate: 'def factorial(n):\\n    # Return n!\\n    pass',
      testCases: [{"input":"5","output":"120"},{"input":"0","output":"1"},{"input":"10","output":"3628800"}]
    },
    {
      title: 'Fibonacci Number (Seeded)', difficulty: 'easy', category: 'Math',
      description: 'Return the nth Fibonacci number (0-indexed). F(0)=0, F(1)=1, F(n)=F(n-1)+F(n-2).',
      inputFormat: 'Integer n', outputFormat: 'F(n)',
      constraints: '0 ≤ n ≤ 30', sampleInput: '6', sampleOutput: '8',
      boilerplate: 'def fibonacci(n):\\n    # Return the nth Fibonacci number\\n    pass',
      testCases: [{"input":"6","output":"8"},{"input":"0","output":"0"},{"input":"10","output":"55"}]
    },
    {
      title: 'Sum of Digits (Seeded)', difficulty: 'easy', category: 'Math',
      description: 'Calculate the sum of all digits of a positive integer.',
      inputFormat: 'Positive integer', outputFormat: 'Sum of digits',
      constraints: '1 ≤ n ≤ 10⁹', sampleInput: '1234', sampleOutput: '10',
      boilerplate: 'def sum_of_digits(n):\\n    # Return the sum of digits of n\\n    pass',
      testCases: [{"input":"1234","output":"10"},{"input":"999","output":"27"}]
    },
    {
      title: 'FizzBuzz (Seeded)', difficulty: 'easy', category: 'Math',
      description: 'For a given number n, return "Fizz" if divisible by 3, "Buzz" if by 5, "FizzBuzz" if by both, else the number as string.',
      inputFormat: 'Integer n', outputFormat: 'String result',
      constraints: '1 ≤ n ≤ 100', sampleInput: '15', sampleOutput: 'FizzBuzz',
      boilerplate: 'def fizzbuzz(n):\\n    # Return "Fizz", "Buzz", "FizzBuzz" or str(n)\\n    pass',
      testCases: [{"input":"15","output":"FizzBuzz"},{"input":"7","output":"7"},{"input":"9","output":"Fizz"}]
    },
    {
      title: 'Remove Duplicates (Seeded)', difficulty: 'easy', category: 'Arrays',
      description: 'Remove duplicate values from a sorted list and return the unique elements.',
      inputFormat: 'Sorted list of integers', outputFormat: 'List of unique integers',
      constraints: '1 ≤ len(arr) ≤ 10⁴', sampleInput: '[1,1,2,2,3]', sampleOutput: '[1,2,3]',
      boilerplate: 'def remove_duplicates(arr):\\n    # Return list with duplicates removed\\n    pass',
      testCases: [{"input":"[1,1,2,2,3]","output":"[1,2,3]"},{"input":"[5,5,5]","output":"[5]"}]
    },
    {
      title: 'Count Occurrences (Seeded)', difficulty: 'easy', category: 'Arrays',
      description: 'Count how many times a target value appears in a list.',
      inputFormat: 'List and target integer', outputFormat: 'Count',
      constraints: '1 ≤ len(arr) ≤ 10⁴', sampleInput: '[1,2,3,2,2,4]\\n2', sampleOutput: '3',
      boilerplate: 'def count_occurrences(arr, target):\\n    # Return count of target in arr\\n    pass',
      testCases: [{"input":"[1,2,3,2,2,4]\\n2","output":"3"},{"input":"[5,5,5]\\n5","output":"3"}]
    },
    {
      title: 'Capitalize First Letter (Seeded)', difficulty: 'easy', category: 'Strings',
      description: 'Capitalize the first letter of each word in a sentence.',
      inputFormat: 'A string sentence', outputFormat: 'Capitalized sentence',
      constraints: '1 ≤ len(s) ≤ 10³', sampleInput: 'hello world', sampleOutput: 'Hello World',
      boilerplate: 'def capitalize_words(s):\\n    # Return sentence with each word capitalized\\n    pass',
      testCases: [{"input":"hello world","output":"Hello World"},{"input":"javaScript is fun","output":"Javascript Is Fun"}]
    },
    {
      title: 'Check Prime (Seeded)', difficulty: 'easy', category: 'Math',
      description: 'Determine if a given number is a prime number.',
      inputFormat: 'Positive integer', outputFormat: 'True or False',
      constraints: '2 ≤ n ≤ 10⁶', sampleInput: '17', sampleOutput: 'True',
      boilerplate: 'def is_prime(n):\\n    # Return True if n is prime\\n    pass',
      testCases: [{"input":"17","output":"True"},{"input":"4","output":"False"},{"input":"2","output":"True"}]
    },
    {
      title: 'Merge Two Sorted Lists (Seeded)', difficulty: 'easy', category: 'Arrays',
      description: 'Merge two sorted lists into one sorted list.',
      inputFormat: 'Two sorted lists', outputFormat: 'One merged sorted list',
      constraints: 'Lists length ≤ 10⁴', sampleInput: '[1,3,5]\\n[2,4,6]', sampleOutput: '[1,2,3,4,5,6]',
      boilerplate: 'def merge_sorted(a, b):\\n    # Merge two sorted lists into one sorted list\\n    pass',
      testCases: [{"input":"[1,3,5]\\n[2,4,6]","output":"[1,2,3,4,5,6]"},{"input":"[1]\\n[2,3]","output":"[1,2,3]"}]
    },
    {
      title: 'String Reverse (Seeded)', difficulty: 'easy', category: 'Strings',
      description: 'Reverse a string without using built-in reverse methods.',
      inputFormat: 'A string', outputFormat: 'Reversed string',
      constraints: '1 ≤ len(s) ≤ 10⁴', sampleInput: 'algorithm', sampleOutput: 'mhtirogla',
      boilerplate: 'def reverse_string(s):\\n    # Reverse the string without slicing[::-1]\\n    pass',
      testCases: [{"input":"algorithm","output":"mhtirogla"},{"input":"hello","output":"olleh"}]
    },

    // ═══ MEDIUM (15) ═══
    {
      title: 'Binary Search (Seeded)', difficulty: 'medium', category: 'Searching',
      description: 'Implement binary search on a sorted list. Return the index of the target or -1.',
      inputFormat: 'Sorted list and target', outputFormat: 'Index or -1',
      constraints: '1 ≤ len(arr) ≤ 10⁵', sampleInput: '[1,3,5,7,9]\\n5', sampleOutput: '2',
      boilerplate: 'def binary_search(arr, target):\\n    # Return index of target in sorted arr, or -1\\n    pass',
      testCases: [{"input":"[1,3,5,7,9]\\n5","output":"2"},{"input":"[1,3,5,7,9]\\n4","output":"-1"}]
    },
    {
      title: 'Valid Parentheses (Seeded)', difficulty: 'medium', category: 'Stack',
      description: 'Check if a string of brackets ()[]\\{\\} is valid — every open bracket is closed in order.',
      inputFormat: 'String of brackets', outputFormat: 'True or False',
      constraints: '1 ≤ len(s) ≤ 10⁴', sampleInput: '({[]})', sampleOutput: 'True',
      boilerplate: 'def is_valid(s):\\n    # Return True if brackets are balanced\\n    pass',
      testCases: [{"input":"({[]})","output":"True"},{"input":"([)]","output":"False"}]
    },
    {
      title: 'Rotate List (Seeded)', difficulty: 'medium', category: 'Arrays',
      description: 'Rotate a list to the right by k steps.',
      inputFormat: 'List and integer k', outputFormat: 'Rotated list',
      constraints: '1 ≤ len(arr) ≤ 10⁵', sampleInput: '[1,2,3,4,5]\\n2', sampleOutput: '[4,5,1,2,3]',
      boilerplate: 'def rotate_list(arr, k):\\n    # Return arr rotated right by k steps\\n    pass',
      testCases: [{"input":"[1,2,3,4,5]\\n2","output":"[4,5,1,2,3]"},{"input":"[1,2,3]\\n1","output":"[3,1,2]"}]
    },
    {
      title: 'Anagram Check (Seeded)', difficulty: 'medium', category: 'Strings',
      description: 'Determine if two strings are anagrams of each other (same characters, different order).',
      inputFormat: 'Two strings', outputFormat: 'True or False',
      constraints: '1 ≤ length ≤ 10⁴', sampleInput: 'listen\\nsilent', sampleOutput: 'True',
      boilerplate: 'def is_anagram(s1, s2):\\n    # Return True if s1 and s2 are anagrams\\n    pass',
      testCases: [{"input":"listen\\nsilent","output":"True"},{"input":"hello\\nworld","output":"False"}]
    },
    {
      title: 'GCD of Two Numbers (Seeded)', difficulty: 'medium', category: 'Math',
      description: 'Find the Greatest Common Divisor of two positive integers using Euclid\'s algorithm.',
      inputFormat: 'Two positive integers', outputFormat: 'GCD',
      constraints: '1 ≤ a, b ≤ 10⁹', sampleInput: '48\\n18', sampleOutput: '6',
      boilerplate: 'def gcd(a, b):\\n    # Return GCD using Euclid\'s algorithm\\n    pass',
      testCases: [{"input":"48\\n18","output":"6"},{"input":"100\\n75","output":"25"}]
    },
    {
      title: 'Matrix Transpose (Seeded)', difficulty: 'medium', category: 'Arrays',
      description: 'Return the transpose of a given m×n matrix.',
      inputFormat: '2D list (matrix)', outputFormat: 'Transposed matrix',
      constraints: '1 ≤ m,n ≤ 100', sampleInput: '[[1,2,3],[4,5,6]]', sampleOutput: '[[1,4],[2,5],[3,6]]',
      boilerplate: 'def transpose(matrix):\\n    # Return the transposed matrix\\n    pass',
      testCases: [{"input":"[[1,2,3],[4,5,6]]","output":"[[1,4],[2,5],[3,6]]"}]
    },
    {
      title: 'Power Function (Seeded)', difficulty: 'medium', category: 'Recursion',
      description: 'Implement pow(base, exponent) without using built-in power functions.',
      inputFormat: 'Base and exponent integers', outputFormat: 'Result',
      constraints: '-10 ≤ base ≤ 10, 0 ≤ exp ≤ 20', sampleInput: '2\\n10', sampleOutput: '1024',
      boilerplate: 'def power(base, exp):\\n    # Return base ** exp without using **\\n    pass',
      testCases: [{"input":"2\\n10","output":"1024"},{"input":"3\\n4","output":"81"}]
    },
    {
      title: 'Flatten Nested List (Seeded)', difficulty: 'medium', category: 'Arrays',
      description: 'Flatten a nested list into a single-level list.',
      inputFormat: 'Nested list', outputFormat: 'Flat list',
      constraints: 'Depth ≤ 5', sampleInput: '[1,[2,[3,4],5]]', sampleOutput: '[1,2,3,4,5]',
      boilerplate: 'def flatten(lst):\\n    # Recursively flatten the nested list\\n    pass',
      testCases: [{"input":"[1,[2,[3,4],5]]","output":"[1,2,3,4,5]"},{"input":"[[1,2],[3,[4]]]","output":"[1,2,3,4]"}]
    },
    {
      title: 'Find Missing Number (Seeded)', difficulty: 'medium', category: 'Arrays',
      description: 'Given a list containing n distinct numbers from 0 to n, find the missing one.',
      inputFormat: 'List of n distinct integers [0..n]', outputFormat: 'Missing number',
      constraints: '1 ≤ n ≤ 10⁴', sampleInput: '[3,0,1]', sampleOutput: '2',
      boilerplate: 'def missing_number(nums):\\n    # Find the missing number in 0..n\\n    pass',
      testCases: [{"input":"[3,0,1]","output":"2"},{"input":"[0,1,2,4]","output":"3"}]
    },
    {
      title: 'Product Except Self (Seeded)', difficulty: 'medium', category: 'Arrays',
      description: 'Return a list where each element is the product of all other elements (no division).',
      inputFormat: 'List of integers', outputFormat: 'List of products',
      constraints: '2 ≤ len(arr) ≤ 10⁴', sampleInput: '[1,2,3,4]', sampleOutput: '[24,12,8,6]',
      boilerplate: 'def product_except_self(nums):\\n    # Return list of products without division\\n    pass',
      testCases: [{"input":"[1,2,3,4]","output":"[24,12,8,6]"},{"input":"[2,3]","output":"[3,2]"}]
    },
    {
      title: 'String Compression (Seeded)', difficulty: 'medium', category: 'Strings',
      description: 'Compress a string using counts of repeated characters. Return original if compressed is not shorter.',
      inputFormat: 'A string', outputFormat: 'Compressed string or original',
      constraints: '1 ≤ len(s) ≤ 10⁴', sampleInput: 'aabcccccaaa', sampleOutput: 'a2b1c5a3',
      boilerplate: 'def compress(s):\\n    # Return compressed string or original\\n    pass',
      testCases: [{"input":"aabcccccaaa","output":"a2b1c5a3"},{"input":"abc","output":"abc"}]
    },
    {
      title: 'Spiral Matrix (Seeded)', difficulty: 'medium', category: 'Arrays',
      description: 'Return all elements of an m×n matrix in spiral order.',
      inputFormat: '2D matrix', outputFormat: 'List in spiral order',
      constraints: '1 ≤ m,n ≤ 10', sampleInput: '[[1,2,3],[4,5,6],[7,8,9]]', sampleOutput: '[1,2,3,6,9,8,7,4,5]',
      boilerplate: 'def spiral_order(matrix):\\n    # Return elements in spiral order\\n    pass',
      testCases: [{"input":"[[1,2,3],[4,5,6],[7,8,9]]","output":"[1,2,3,6,9,8,7,4,5]"}]
    },
    {
      title: 'Longest Substring Without Repeats (Seeded)', difficulty: 'medium', category: 'Strings',
      description: 'Find the length of the longest substring without repeating characters.',
      inputFormat: 'A string', outputFormat: 'Integer length',
      constraints: '0 ≤ len(s) ≤ 5×10⁴', sampleInput: 'abcabcbb', sampleOutput: '3',
      boilerplate: 'def length_of_longest_substring(s):\\n    # Return length of longest substring without repeats\\n    pass',
      testCases: [{"input":"abcabcbb","output":"3"},{"input":"bbbbb","output":"1"}]
    },
    {
      title: 'Kadane Maximum Subarray (Seeded)', difficulty: 'medium', category: 'Arrays',
      description: 'Find the contiguous subarray with the largest sum (Kadane\'s algorithm).',
      inputFormat: 'List of integers', outputFormat: 'Maximum subarray sum',
      constraints: '1 ≤ len(arr) ≤ 10⁵', sampleInput: '[-2,1,-3,4,-1,2,1,-5,4]', sampleOutput: '6',
      boilerplate: 'def max_subarray(nums):\\n    # Return max subarray sum using Kadane\'s algorithm\\n    pass',
      testCases: [{"input":"[-2,1,-3,4,-1,2,1,-5,4]","output":"6"},{"input":"[1]","output":"1"}]
    },
    {
      title: 'Integer to Roman (Seeded)', difficulty: 'medium', category: 'Math',
      description: 'Convert an integer to its Roman numeral representation.',
      inputFormat: 'Integer (1 to 3999)', outputFormat: 'Roman numeral string',
      constraints: '1 ≤ num ≤ 3999', sampleInput: '1994', sampleOutput: 'MCMXCIV',
      boilerplate: 'def int_to_roman(num):\\n    # Convert integer to Roman numeral string\\n    pass',
      testCases: [{"input":"1994","output":"MCMXCIV"},{"input":"58","output":"LVIII"}]
    },

    // ═══ HARD (15) ═══
    {
      title: 'Longest Common Subsequence (Seeded)', difficulty: 'hard', category: 'Dynamic Programming',
      description: 'Find the length of the longest common subsequence of two strings.',
      inputFormat: 'Two strings', outputFormat: 'LCS length',
      constraints: '1 ≤ length ≤ 10³', sampleInput: 'abcde\\nace', sampleOutput: '3',
      boilerplate: 'def lcs(a, b):\\n    # Return length of longest common subsequence\\n    pass',
      testCases: [{"input":"abcde\\nace","output":"3"},{"input":"abc\\ndef","output":"0"}]
    },
    {
      title: '0/1 Knapsack Problem (Seeded)', difficulty: 'hard', category: 'Dynamic Programming',
      description: 'Given items with weights and values, maximise total value without exceeding capacity.',
      inputFormat: 'capacity, weights[], values[]', outputFormat: 'Maximum value',
      constraints: 'n ≤ 100, W ≤ 10⁴', sampleInput: '50\\n[10,20,30]\\n[60,100,120]', sampleOutput: '220',
      boilerplate: 'def knapsack(capacity, weights, values):\\n    # Return maximum value within capacity\\n    pass',
      testCases: [{"input":"50\\n[10,20,30]\\n[60,100,120]","output":"220"}]
    },
    {
      title: 'N-Queens Validator (Seeded)', difficulty: 'hard', category: 'Backtracking',
      description: 'Given an n×n board, validate if queens placement is valid (no two queens attack each other).',
      inputFormat: 'List of column positions per row', outputFormat: 'True or False',
      constraints: '1 ≤ n ≤ 15', sampleInput: '[1,3,0,2]', sampleOutput: 'True',
      boilerplate: 'def is_valid_queens(positions):\\n    # Return True if no two queens attack each other\\n    pass',
      testCases: [{"input":"[1,3,0,2]","output":"True"},{"input":"[0,1,2,3]","output":"False"}]
    },
    {
      title: 'Merge Intervals (Seeded)', difficulty: 'hard', category: 'Arrays',
      description: 'Given a collection of intervals, merge all overlapping intervals.',
      inputFormat: 'List of [start, end] intervals', outputFormat: 'Merged intervals',
      constraints: '1 ≤ len(intervals) ≤ 10⁴', sampleInput: '[[1,3],[2,6],[8,10],[15,18]]', sampleOutput: '[[1,6],[8,10],[15,18]]',
      boilerplate: 'def merge_intervals(intervals):\\n    # Merge overlapping intervals\\n    pass',
      testCases: [{"input":"[[1,3],[2,6],[8,10],[15,18]]","output":"[[1,6],[8,10],[15,18]]"}]
    },
    {
      title: 'Longest Increasing Subsequence (Seeded)', difficulty: 'hard', category: 'Dynamic Programming',
      description: 'Find the length of the longest strictly increasing subsequence.',
      inputFormat: 'List of integers', outputFormat: 'LIS length',
      constraints: '1 ≤ len(arr) ≤ 2500', sampleInput: '[10,9,2,5,3,7,101,18]', sampleOutput: '4',
      boilerplate: 'def length_of_lis(nums):\\n    # Return length of longest increasing subsequence\\n    pass',
      testCases: [{"input":"[10,9,2,5,3,7,101,18]","output":"4"},{"input":"[0,1,0,3,2,3]","output":"4"}]
    },
    {
      title: 'Edit Distance (Seeded)', difficulty: 'hard', category: 'Dynamic Programming',
      description: 'Find the minimum number of operations (insert, delete, replace) to convert one string to another.',
      inputFormat: 'Two strings', outputFormat: 'Minimum operations',
      constraints: '0 ≤ length ≤ 500', sampleInput: 'horse\\nros', sampleOutput: '3',
      boilerplate: 'def edit_distance(word1, word2):\\n    # Return minimum edit distance\\n    pass',
      testCases: [{"input":"horse\\nros","output":"3"},{"input":"intention\\nexecution","output":"5"}]
    },
    {
      title: 'Coin Change (Min Coins) (Seeded)', difficulty: 'hard', category: 'Dynamic Programming',
      description: 'Find the fewest number of coins needed to make up a given amount.',
      inputFormat: 'Coins list and amount', outputFormat: 'Minimum coins or -1',
      constraints: '1 ≤ len(coins) ≤ 12', sampleInput: '[1,5,10,25]\\n30', sampleOutput: '2',
      boilerplate: 'def coin_change(coins, amount):\\n    # Return min coins needed, or -1 if impossible\\n    pass',
      testCases: [{"input":"[1,5,10,25]\\n30","output":"2"},{"input":"[2]\\n3","output":"-1"}]
    },
    {
      title: 'Trie Implementation (Seeded)', difficulty: 'hard', category: 'Trees',
      description: 'Implement a Trie with insert, search, and starts_with methods.',
      inputFormat: 'List of operations', outputFormat: 'List of results',
      constraints: 'Words length ≤ 200', sampleInput: 'insert(apple)\\nsearch(apple)\\nstarts_with(app)', sampleOutput: 'True\\nTrue',
      boilerplate: 'class Trie:\\n    def __init__(self):\\n        self.children = {}\\n        self.is_end = False\\n\\n    def insert(self, word):\\n        pass\\n\\n    def search(self, word):\\n        pass\\n\\n    def starts_with(self, prefix):\\n        pass',
      testCases: [{"input":"insert(apple)\\nsearch(apple)","output":"True"},{"input":"insert(apple)\\nsearch(app)","output":"False"}]
    },
    {
      title: 'Graph BFS Shortest Path (Seeded)', difficulty: 'hard', category: 'Graphs',
      description: 'Find the shortest path between two nodes in an unweighted graph using BFS.',
      inputFormat: 'Adjacency list, start, end', outputFormat: 'Shortest path length',
      constraints: 'Nodes ≤ 10⁴', sampleInput: '{0:[1,2],1:[0,3],2:[0,3],3:[1,2]}\\n0\\n3', sampleOutput: '2',
      boilerplate: 'def bfs_shortest(graph, start, end):\\n    # Return shortest path length using BFS\\n    pass',
      testCases: [{"input":"{0:[1,2],1:[0,3],2:[0,3],3:[1,2]}\\n0\\n3","output":"2"}]
    },
    {
      title: 'Dijkstra Shortest Path (Seeded)', difficulty: 'hard', category: 'Graphs',
      description: 'Implement Dijkstra\'s algorithm to find shortest distances from source to all nodes.',
      inputFormat: 'n, edges [[from,to,weight]], source', outputFormat: 'List of shortest distances',
      constraints: 'Nodes ≤ 10³', sampleInput: '4\\n[[0,1,4],[0,2,1],[2,1,2],[1,3,1],[2,3,5]]\\n0', sampleOutput: '[0,3,1,4]',
      boilerplate: 'import heapq\\n\\ndef dijkstra(n, edges, source):\\n    # Return list of shortest distances from source\\n    pass',
      testCases: [{"input":"4\\n[[0,1,4],[0,2,1],[2,1,2],[1,3,1],[2,3,5]]\\n0","output":"[0,3,1,4]"}]
    },
    {
      title: 'Topological Sort (Seeded)', difficulty: 'hard', category: 'Graphs',
      description: 'Return a valid topological ordering of a directed acyclic graph.',
      inputFormat: 'n nodes, edges [[from, to]]', outputFormat: 'List of nodes in topological order',
      constraints: 'n ≤ 10⁴', sampleInput: '4\\n[[0,1],[0,2],[1,3],[2,3]]', sampleOutput: '[0,2,1,3]',
      boilerplate: 'from collections import deque\\n\\ndef topo_sort(n, edges):\\n    # Return topological order using Kahn\'s algorithm\\n    pass',
      testCases: [{"input":"4\\n[[0,1],[0,2],[1,3],[2,3]]","output":"[0,1,2,3] or [0,2,1,3]"}]
    },
    {
      title: 'Minimum Spanning Tree (Seeded)', difficulty: 'hard', category: 'Graphs',
      description: 'Find the total weight of the minimum spanning tree of a weighted undirected graph.',
      inputFormat: 'n nodes, edges [[u,v,weight]]', outputFormat: 'Total MST weight',
      constraints: 'n ≤ 10³', sampleInput: '4\\n[[0,1,10],[0,2,6],[0,3,5],[1,3,15],[2,3,4]]', sampleOutput: '19',
      boilerplate: 'def mst_weight(n, edges):\\n    # Return total weight of MST (Prim\'s or Kruskal\'s)\\n    pass',
      testCases: [{"input":"4\\n[[0,1,10],[0,2,6],[0,3,5],[1,3,15],[2,3,4]]","output":"19"}]
    },
    {
      title: 'Rod Cutting (Seeded)', difficulty: 'hard', category: 'Dynamic Programming',
      description: 'Given a rod of length n and price list, determine the maximum revenue from cutting.',
      inputFormat: 'Prices list, rod length n', outputFormat: 'Maximum revenue',
      constraints: 'n ≤ 100', sampleInput: '[1,5,8,9,10,17,17,20]\\n8', sampleOutput: '22',
      boilerplate: 'def rod_cut(prices, n):\\n    # Return max revenue from cutting rod of length n\\n    pass',
      testCases: [{"input":"[1,5,8,9,10,17,17,20]\\n8","output":"22"}]
    },
    {
      title: 'Matrix Chain Multiplication (Seeded)', difficulty: 'hard', category: 'Dynamic Programming',
      description: 'Find the minimum number of scalar multiplications needed to multiply a chain of matrices.',
      inputFormat: 'List of matrix dimensions', outputFormat: 'Minimum multiplications',
      constraints: 'n ≤ 100', sampleInput: '[10,20,30,40,30]', sampleOutput: '30000',
      boilerplate: 'def matrix_chain(dims):\\n    # Return minimum scalar multiplications\\n    pass',
      testCases: [{"input":"[10,20,30,40,30]","output":"30000"},{"input":"[40,20,30,10,30]","output":"26000"}]
    },
    {
      title: 'Word Break (Seeded)', difficulty: 'hard', category: 'Dynamic Programming',
      description: 'Given a string and a dictionary, determine if the string can be segmented into dictionary words.',
      inputFormat: 'String and list of dictionary words', outputFormat: 'True or False',
      constraints: '1 ≤ len(s) ≤ 300', sampleInput: 'leetcode\\n[leet,code]', sampleOutput: 'True',
      boilerplate: 'def word_break(s, word_dict):\\n    # Return True if s can be segmented into dictionary words\\n    pass',
      testCases: [{"input":"leetcode\\n[leet,code]","output":"True"},{"input":"catsandog\\n[cats,dog,sand,and,cat]","output":"False"}]
    }
  ];

  for (const p of problems) {
    await connection.query(
      `INSERT INTO codingProblems (mentorId, title, description, difficulty, category, inputFormat, outputFormat, \`constraints\`, sampleInput, sampleOutput, testCases, boilerplate) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [mid, p.title, p.description, p.difficulty, p.category, p.inputFormat, p.outputFormat, p.constraints, p.sampleInput, p.sampleOutput, JSON.stringify(p.testCases), p.boilerplate || null]
    );
  }

  console.log(`  ✅ Seeded ${problems.length} coding problems (Easy: 15, Medium: 15, Hard: 15)`);
}


// ═══════════════════════════════════════════════════════════════════
//  6. SEED GAME CHALLENGES (Python-based, 12 original + 33 extra)
// ═══════════════════════════════════════════════════════════════════
async function seedGameChallenges(connection) {
  console.log('\n🎮 Seeding Game Challenges (Python)...');

  // Drop old rows so re-seed is idempotent
  await connection.query('DELETE FROM gameUnlocks');
  await connection.query('DELETE FROM gameChallenges');

  const challenges = [
    // ─── 12 ORIGINAL CHALLENGES ───
    {
      slug: 'dijkstra',
      title: "Implement Dijkstra's Algorithm",
      description: "Given a weighted graph as an adjacency dict, find the shortest distance from the start node to all other nodes.\nReturn a list of shortest distances.",
      boilerplate: "import heapq\n\ndef dijkstra(graph, start):\n    # graph = {0: [(1,2),(2,4)], 1: [(2,1),(3,7)], 2: [(3,3)], 3: []}\n    # Return list of distances from start to each node\n    pass",
      hint: "Use heapq as priority queue. Initialize distances to float('inf'), set dist[start]=0, relax edges.",
      testCases: JSON.stringify([
        { input: "{0:[(1,2),(2,4)],1:[(2,1),(3,7)],2:[(3,3)],3:[]}, 0", expected: "[0,2,3,6]" },
        { input: "{0:[(1,1)],1:[(0,1)]}, 0", expected: "[0,1]" }
      ]),
      gameType: 'dijkstra', gameTitle: 'Shortest Path Explorer',
      gameDescription: "Find the shortest path using Dijkstra's algorithm.",
      gameIcon: 'ri-route-line', gameColor: 'from-blue-500 to-cyan-500',
      gameAlgorithm: "Dijkstra's Algorithm", difficulty: 'Medium', sortOrder: 1
    },
    {
      slug: 'sorting',
      title: 'Implement Bubble Sort',
      description: "Sort a list of numbers in ascending order using Bubble Sort.\nReturn the sorted list.",
      boilerplate: "def bubble_sort(arr):\n    # Sort arr in ascending order using bubble sort\n    pass",
      hint: "Nested loops: outer for passes, inner for comparing adjacent elements and swapping if out of order.",
      testCases: JSON.stringify([
        { input: "[5,3,8,4,2]", expected: "[2,3,4,5,8]" },
        { input: "[1]", expected: "[1]" },
        { input: "[9,1,5,3]", expected: "[1,3,5,9]" }
      ]),
      gameType: 'sorting', gameTitle: 'Sort Visualizer',
      gameDescription: 'Race against time! Manually sort the array.',
      gameIcon: 'ri-bar-chart-line', gameColor: 'from-violet-500 to-purple-500',
      gameAlgorithm: 'Bubble Sort', difficulty: 'Easy', sortOrder: 2
    },
    {
      slug: 'bfs',
      title: 'Implement BFS (Breadth-First Search)',
      description: "Given an adjacency dict, return the BFS traversal order starting from start node.\nReturn a list of visited node IDs.",
      boilerplate: "from collections import deque\n\ndef bfs(graph, start):\n    # graph = {0:[1,2], 1:[3], 2:[3], 3:[]}\n    # Return list of nodes visited in BFS order\n    pass",
      hint: "Use a deque as queue. Start by enqueueing the start node. Dequeue, visit neighbors, enqueue unvisited ones.",
      testCases: JSON.stringify([
        { input: "{0:[1,2],1:[3],2:[3],3:[]}, 0", expected: "[0,1,2,3]" }
      ]),
      gameType: 'bfs', gameTitle: 'Maze Runner (BFS)',
      gameDescription: 'Navigate a maze using BFS strategy.',
      gameIcon: 'ri-layout-grid-line', gameColor: 'from-green-500 to-emerald-500',
      gameAlgorithm: 'BFS Traversal', difficulty: 'Medium', sortOrder: 3
    },
    {
      slug: 'binary_search',
      title: 'Implement Binary Search',
      description: "Given a sorted list and a target, return the index of the target.\nReturn -1 if not found.",
      boilerplate: "def binary_search(arr, target):\n    # arr is sorted ascending\n    # Return index of target, or -1\n    pass",
      hint: "Maintain low and high pointers. Calculate mid, compare with target, adjust low or high.",
      testCases: JSON.stringify([
        { input: "[1,3,5,7,9], 5", expected: "2" },
        { input: "[2,4,6,8], 3", expected: "-1" },
        { input: "[1,2,3,4,5], 1", expected: "0" }
      ]),
      gameType: 'binary_search', gameTitle: 'Number Hunter',
      gameDescription: 'Guess the hidden number with Binary Search.',
      gameIcon: 'ri-search-line', gameColor: 'from-amber-500 to-orange-500',
      gameAlgorithm: 'Binary Search', difficulty: 'Easy', sortOrder: 4
    },
    {
      slug: 'stack',
      title: 'Validate Balanced Brackets',
      description: "Given a string of brackets ()[]{}. Return True if brackets are balanced, False otherwise.",
      boilerplate: "def is_balanced(s):\n    # Use a stack to check if brackets are balanced\n    pass",
      hint: "Push opening brackets onto a stack. For closing brackets, pop and check if they match.",
      testCases: JSON.stringify([
        { input: '"()[]{}"', expected: "True" },
        { input: '"([)]"', expected: "False" },
        { input: '"{[]}"', expected: "True" }
      ]),
      gameType: 'stack', gameTitle: 'Stack Overflow',
      gameDescription: 'Push/pop brackets to match the valid sequence!',
      gameIcon: 'ri-stack-line', gameColor: 'from-red-500 to-rose-500',
      gameAlgorithm: 'Stack (LIFO)', difficulty: 'Easy', sortOrder: 5
    },
    {
      slug: 'recursion',
      title: 'Tower of Hanoi - Count Moves',
      description: "Return the minimum number of moves needed to solve Tower of Hanoi for n discs.",
      boilerplate: "def hanoi(n):\n    # Return minimum moves for n discs\n    pass",
      hint: "The recurrence is: hanoi(n) = 2 * hanoi(n-1) + 1, base case hanoi(1) = 1.",
      testCases: JSON.stringify([
        { input: "3", expected: "7" },
        { input: "4", expected: "15" },
        { input: "1", expected: "1" }
      ]),
      gameType: 'recursion', gameTitle: 'Tower of Hanoi',
      gameDescription: 'Move all discs from source to target peg.',
      gameIcon: 'ri-building-4-line', gameColor: 'from-teal-500 to-cyan-500',
      gameAlgorithm: 'Recursion', difficulty: 'Hard', sortOrder: 6
    },
    {
      slug: 'greedy',
      title: 'Greedy Coin Change',
      description: "Given coin denominations [1,5,10,25] and a target amount, return the minimum number of coins needed using the greedy approach.",
      boilerplate: "def min_coins(coins, amount):\n    # Return minimum number of coins using greedy\n    pass",
      hint: "Sort coins descending. For each coin, use as many as possible, then move to the next smaller coin.",
      testCases: JSON.stringify([
        { input: "[1,5,10,25], 41", expected: "4" },
        { input: "[1,5,10,25], 30", expected: "2" }
      ]),
      gameType: 'greedy', gameTitle: 'Coin Change Challenge',
      gameDescription: 'Make exact change using fewest coins.',
      gameIcon: 'ri-coin-line', gameColor: 'from-yellow-500 to-amber-500',
      gameAlgorithm: 'Greedy Algorithm', difficulty: 'Easy', sortOrder: 7
    },
    {
      slug: 'linkedlist',
      title: 'Reverse a Linked List',
      description: "Given a linked list as a list, reverse it and return the reversed list.\n(Simulated linked list using list)",
      boilerplate: "def reverse_list(arr):\n    # Reverse the list (simulating linked list reversal)\n    # Do it iteratively using prev/current pointers logic\n    pass",
      hint: "Iterate through, using a 'prev' accumulator. At each step, prepend current to result.",
      testCases: JSON.stringify([
        { input: "[1,2,3,4,5]", expected: "[5,4,3,2,1]" },
        { input: "[10]", expected: "[10]" }
      ]),
      gameType: 'linkedlist', gameTitle: 'Chain Builder',
      gameDescription: 'Build and manipulate a linked list.',
      gameIcon: 'ri-links-line', gameColor: 'from-indigo-500 to-blue-500',
      gameAlgorithm: 'Linked List', difficulty: 'Medium', sortOrder: 8
    },
    {
      slug: 'hash',
      title: 'Implement a Hash Function',
      description: "Given a list of keys and table size, return a dict mapping each bucket index to its keys.\nHash function: key % size.",
      boilerplate: "def hash_map(keys, size):\n    # Return dict: {bucket_index: [keys...], ...}\n    # Hash function: key % size\n    pass",
      hint: "Loop through keys, compute key % size, group keys by their bucket index.",
      testCases: JSON.stringify([
        { input: "[3,10,17,24], 7", expected: "{3:[3,10,17,24]}" },
        { input: "[1,8,15], 7", expected: "{1:[1,8,15]}" }
      ]),
      gameType: 'hash', gameTitle: 'Hash Table Quest',
      gameDescription: 'Map keys to buckets - learn hashing!',
      gameIcon: 'ri-hashtag', gameColor: 'from-pink-500 to-rose-500',
      gameAlgorithm: 'Hash Tables', difficulty: 'Medium', sortOrder: 9
    },
    {
      slug: 'dp',
      title: '0/1 Knapsack Problem',
      description: "Given items as list of [weight, value] pairs and a capacity, return the maximum value achievable using DP.",
      boilerplate: "def knapsack(items, capacity):\n    # items = [[2,3], [3,4], [4,5]]\n    # Return max value within capacity\n    pass",
      hint: "Build a 2D DP table: dp[i][w] = max value using first i items with capacity w.",
      testCases: JSON.stringify([
        { input: "[[2,3],[3,4],[4,5]], 5", expected: "7" },
        { input: "[[1,1],[2,6],[3,10]], 5", expected: "16" }
      ]),
      gameType: 'dp', gameTitle: 'Knapsack Packer',
      gameDescription: 'Maximize value without exceeding weight.',
      gameIcon: 'ri-briefcase-4-line', gameColor: 'from-emerald-500 to-green-500',
      gameAlgorithm: 'Dynamic Programming', difficulty: 'Hard', sortOrder: 10
    },
    {
      slug: 'tree',
      title: 'BST Insertion & In-Order',
      description: "Given a sequence of values, build a BST and return the in-order traversal as a list.",
      boilerplate: "def bst_inorder(values):\n    # Insert values into BST, then return in-order traversal\n    pass",
      hint: "Create a Node class with val/left/right. Insert by comparing with current node. In-order: left, root, right.",
      testCases: JSON.stringify([
        { input: "[5,3,7,1,4]", expected: "[1,3,4,5,7]" },
        { input: "[10,5,15]", expected: "[5,10,15]" }
      ]),
      gameType: 'tree', gameTitle: 'BST Explorer',
      gameDescription: 'Build a Binary Search Tree by inserting values.',
      gameIcon: 'ri-node-tree', gameColor: 'from-orange-500 to-red-500',
      gameAlgorithm: 'Binary Search Tree', difficulty: 'Medium', sortOrder: 11
    },
    {
      slug: 'graph_coloring',
      title: 'Graph Coloring Check',
      description: "Given adjacency edges and a color assignment dict, return True if no two adjacent nodes share a color.",
      boilerplate: "def is_valid_coloring(edges, colors):\n    # edges = [[0,1],[1,2],[0,2]]\n    # colors = {0:'red', 1:'blue', 2:'green'}\n    # Return True if valid coloring\n    pass",
      hint: "Loop through edges. For each edge [a,b], check if colors[a] != colors[b].",
      testCases: JSON.stringify([
        { input: "[[0,1],[1,2],[0,2]], {0:'red',1:'blue',2:'green'}", expected: "True" },
        { input: "[[0,1],[1,2],[0,2]], {0:'red',1:'red',2:'green'}", expected: "False" }
      ]),
      gameType: 'graph_coloring', gameTitle: 'Map Coloring',
      gameDescription: 'Color a map so no adjacent regions share a color.',
      gameIcon: 'ri-palette-line', gameColor: 'from-fuchsia-500 to-pink-500',
      gameAlgorithm: 'Graph Coloring', difficulty: 'Hard', sortOrder: 12
    },

    // ─── 33 EXTRA CHALLENGES ───
    // Sorting family
    {
      slug: 'selection_sort',
      title: 'Selection Sort',
      description: "Implement selection sort that sorts a list in ascending order.\n\nFunction: selection_sort(arr) -> sorted list",
      boilerplate: "def selection_sort(arr):\n    # Find minimum element, swap with first unsorted position\n    pass",
      hint: "Loop i from 0 to n-1. Find the minimum in arr[i..n-1] and swap it with arr[i].",
      testCases: JSON.stringify([
        { input: "[64,25,12,22,11]", expected: "[11,12,22,25,64]" },
        { input: "[5,1,4,2,8]", expected: "[1,2,4,5,8]" }
      ]),
      gameType: 'sorting', gameTitle: 'Selection Sort',
      gameDescription: 'Find the minimum and place it at the front',
      gameIcon: 'ri-sort-asc', gameColor: 'from-blue-500 to-blue-700',
      gameAlgorithm: 'Selection Sort', difficulty: 'Easy', sortOrder: 13
    },
    {
      slug: 'insertion_sort',
      title: 'Insertion Sort',
      description: "Implement insertion sort that sorts a list in ascending order.\n\nFunction: insertion_sort(arr) -> sorted list",
      boilerplate: "def insertion_sort(arr):\n    # Insert each element into its correct position\n    pass",
      hint: "For each element starting from index 1, shift larger elements right and insert in the correct spot.",
      testCases: JSON.stringify([
        { input: "[12,11,13,5,6]", expected: "[5,6,11,12,13]" },
        { input: "[4,3,2,10,12,1,5,6]", expected: "[1,2,3,4,5,6,10,12]" }
      ]),
      gameType: 'sorting', gameTitle: 'Insertion Sort',
      gameDescription: 'Insert each card into its sorted position',
      gameIcon: 'ri-insert-column-right', gameColor: 'from-blue-300 to-blue-500',
      gameAlgorithm: 'Insertion Sort', difficulty: 'Easy', sortOrder: 14
    },
    {
      slug: 'merge_sort',
      title: 'Merge Sort',
      description: "Implement merge sort using divide and conquer.\n\nFunction: merge_sort(arr) -> sorted list",
      boilerplate: "def merge_sort(arr):\n    if len(arr) <= 1:\n        return arr\n    # Split, sort halves, merge\n    pass",
      hint: "Split list in half, recursively sort each half, then merge the two sorted halves using two pointers.",
      testCases: JSON.stringify([
        { input: "[38,27,43,3,9,82,10]", expected: "[3,9,10,27,38,43,82]" },
        { input: "[5,2,8,1,9]", expected: "[1,2,5,8,9]" }
      ]),
      gameType: 'sorting', gameTitle: 'Merge Sort',
      gameDescription: 'Divide, conquer, and merge the array',
      gameIcon: 'ri-git-merge-line', gameColor: 'from-indigo-400 to-indigo-600',
      gameAlgorithm: 'Merge Sort', difficulty: 'Medium', sortOrder: 15
    },
    {
      slug: 'quick_sort',
      title: 'Quick Sort',
      description: "Implement quick sort.\n\nFunction: quick_sort(arr) -> sorted list",
      boilerplate: "def quick_sort(arr):\n    if len(arr) <= 1:\n        return arr\n    # Pick pivot, partition, recurse\n    pass",
      hint: "Choose a pivot (e.g. last element). Partition into elements < pivot, equal, > pivot. Recursively sort the partitions.",
      testCases: JSON.stringify([
        { input: "[10,7,8,9,1,5]", expected: "[1,5,7,8,9,10]" },
        { input: "[3,6,8,10,1,2,1]", expected: "[1,1,2,3,6,8,10]" }
      ]),
      gameType: 'sorting', gameTitle: 'Quick Sort',
      gameDescription: 'Partition around a pivot element',
      gameIcon: 'ri-flashlight-line', gameColor: 'from-indigo-500 to-indigo-700',
      gameAlgorithm: 'Quick Sort', difficulty: 'Medium', sortOrder: 16
    },
    {
      slug: 'counting_sort',
      title: 'Counting Sort',
      description: "Implement counting sort for non-negative integers.\n\nFunction: counting_sort(arr) -> sorted list",
      boilerplate: "def counting_sort(arr):\n    # Count occurrences, rebuild sorted list\n    pass",
      hint: "Find the max value, create a count list of that size, count each element, then rebuild from counts.",
      testCases: JSON.stringify([
        { input: "[4,2,2,8,3,3,1]", expected: "[1,2,2,3,3,4,8]" },
        { input: "[1,0,3,1,3,1]", expected: "[0,1,1,1,3,3]" }
      ]),
      gameType: 'sorting', gameTitle: 'Counting Sort',
      gameDescription: 'Count occurrences for linear-time sorting',
      gameIcon: 'ri-calculator-line', gameColor: 'from-cyan-400 to-cyan-600',
      gameAlgorithm: 'Counting Sort', difficulty: 'Easy', sortOrder: 17
    },

    // Searching family
    {
      slug: 'linear_search',
      title: 'Linear Search',
      description: "Implement linear search returning the index of the target, or -1 if not found.\n\nFunction: linear_search(arr, target) -> index",
      boilerplate: "def linear_search(arr, target):\n    # Check each element one by one\n    pass",
      hint: "Iterate through the list. Return the index when element == target.",
      testCases: JSON.stringify([
        { input: "[10,20,30,40,50], 30", expected: "2" },
        { input: "[5,8,1,3], 7", expected: "-1" },
        { input: "[1,2,3], 1", expected: "0" }
      ]),
      gameType: 'binary_search', gameTitle: 'Linear Search',
      gameDescription: 'Find the target by scanning one by one',
      gameIcon: 'ri-search-line', gameColor: 'from-teal-500 to-teal-700',
      gameAlgorithm: 'Linear Search', difficulty: 'Easy', sortOrder: 18
    },
    {
      slug: 'jump_search',
      title: 'Jump Search',
      description: "Implement jump search on a sorted list. Jump by sqrt(n) steps, then do linear search in the block.\n\nFunction: jump_search(arr, target) -> index or -1",
      boilerplate: "import math\n\ndef jump_search(arr, target):\n    n = len(arr)\n    step = int(math.sqrt(n))\n    # Jump then linear search\n    pass",
      hint: "Jump ahead by sqrt(n) until arr[min(step, n)-1] >= target. Then linear search backwards in that block.",
      testCases: JSON.stringify([
        { input: "[0,1,2,3,5,8,13,21,34], 13", expected: "6" },
        { input: "[1,3,5,7,9], 4", expected: "-1" },
        { input: "[1,3,5,7,9], 7", expected: "3" }
      ]),
      gameType: 'binary_search', gameTitle: 'Jump Search',
      gameDescription: 'Jump by sqrt(n) blocks then linear scan',
      gameIcon: 'ri-speed-line', gameColor: 'from-teal-300 to-teal-500',
      gameAlgorithm: 'Jump Search', difficulty: 'Medium', sortOrder: 19
    },
    {
      slug: 'range_sum',
      title: 'Prefix Sum - Range Query',
      description: "Build a prefix sum and answer range sum queries in O(1).\n\nFunction: range_sum(arr, l, r) -> sum of arr[l..r] inclusive",
      boilerplate: "def range_sum(arr, l, r):\n    # Build prefix sums for O(1) range queries\n    pass",
      hint: "Compute prefix[i] = arr[0]+...+arr[i]. Then range_sum(l,r) = prefix[r] - (prefix[l-1] if l > 0 else 0).",
      testCases: JSON.stringify([
        { input: "[1,2,3,4,5], 1, 3", expected: "9" },
        { input: "[10,20,30], 0, 2", expected: "60" },
        { input: "[5,5,5,5], 0, 0", expected: "5" }
      ]),
      gameType: 'binary_search', gameTitle: 'Prefix Sum Query',
      gameDescription: 'Answer range sum queries in O(1)',
      gameIcon: 'ri-bar-chart-line', gameColor: 'from-emerald-400 to-emerald-600',
      gameAlgorithm: 'Prefix Sums', difficulty: 'Easy', sortOrder: 20
    },

    // Graph / Maze family
    {
      slug: 'dfs_traversal',
      title: 'DFS Graph Traversal',
      description: "Implement Depth-First Search on an adjacency dict.\n\nFunction: dfs(graph, start) -> list of visited nodes in DFS order\ngraph: dict {0:[1,2], 1:[3], ...}",
      boilerplate: "def dfs(graph, start):\n    visited = []\n    # Use stack or recursion\n    return visited",
      hint: "Use a stack (append start). Pop a node, if not visited mark it and push its neighbors.",
      testCases: JSON.stringify([
        { input: "{0:[1,2], 1:[3], 2:[], 3:[]}, 0", expected: "[0,1,3,2]" },
        { input: "{0:[1], 1:[2], 2:[]}, 0", expected: "[0,1,2]" }
      ]),
      gameType: 'bfs', gameTitle: 'DFS Explorer',
      gameDescription: 'Traverse the graph depth-first',
      gameIcon: 'ri-compass-3-line', gameColor: 'from-sky-500 to-sky-700',
      gameAlgorithm: 'Depth-First Search', difficulty: 'Medium', sortOrder: 21
    },
    {
      slug: 'flood_fill',
      title: 'Flood Fill',
      description: "Fill connected same-color cells with a new color (like paint bucket).\n\nFunction: flood_fill(grid, sr, sc, new_color) -> modified grid",
      boilerplate: "def flood_fill(grid, sr, sc, new_color):\n    # BFS/DFS from (sr,sc)\n    pass",
      hint: "Get original color at (sr,sc). BFS/DFS to all connected cells with that color, change them to new_color.",
      testCases: JSON.stringify([
        { input: "[[1,1,1],[1,1,0],[1,0,1]], 1, 1, 2", expected: "[[2,2,2],[2,2,0],[2,0,1]]" },
        { input: "[[0,0],[0,0]], 0, 0, 3", expected: "[[3,3],[3,3]]" }
      ]),
      gameType: 'bfs', gameTitle: 'Paint Bucket',
      gameDescription: 'Flood-fill connected regions with colour',
      gameIcon: 'ri-paint-fill', gameColor: 'from-sky-300 to-sky-500',
      gameAlgorithm: 'Flood Fill (BFS)', difficulty: 'Medium', sortOrder: 22
    },
    {
      slug: 'island_count',
      title: 'Count Islands',
      description: "Count the number of islands in a 2-D grid (1 = land, 0 = water). Connected horizontally/vertically.\n\nFunction: count_islands(grid) -> number",
      boilerplate: "def count_islands(grid):\n    count = 0\n    # For each unvisited 1, BFS/DFS and increment count\n    return count",
      hint: "Iterate every cell. When you find a 1, increment count and BFS/DFS to mark all connected 1s as visited (set to 0).",
      testCases: JSON.stringify([
        { input: "[[1,1,0,0],[0,0,1,0],[0,0,0,1]]", expected: "3" },
        { input: "[[1,1,1],[0,1,0],[1,0,1]]", expected: "3" }
      ]),
      gameType: 'bfs', gameTitle: 'Island Counter',
      gameDescription: 'Count islands in a grid of land & water',
      gameIcon: 'ri-landscape-line', gameColor: 'from-lime-400 to-lime-600',
      gameAlgorithm: 'Connected Components', difficulty: 'Hard', sortOrder: 23
    },
    {
      slug: 'prims_mst',
      title: "Prim's MST Weight",
      description: "Find the total weight of the Minimum Spanning Tree.\n\nFunction: prims_mst(n, edges) -> total weight\nedges: [[from, to, weight], ...]",
      boilerplate: "import heapq\n\ndef prims_mst(n, edges):\n    # Greedy: always add cheapest edge to the growing tree\n    pass",
      hint: "Start from node 0, maintain a visited set. Always pick the minimum weight edge connecting visited to unvisited.",
      testCases: JSON.stringify([
        { input: "4, [[0,1,10],[0,2,6],[0,3,5],[1,3,15],[2,3,4]]", expected: "19" },
        { input: "3, [[0,1,1],[1,2,2],[0,2,3]]", expected: "3" }
      ]),
      gameType: 'dijkstra', gameTitle: "Prim's MST",
      gameDescription: 'Build the minimum spanning tree',
      gameIcon: 'ri-share-line', gameColor: 'from-purple-500 to-purple-700',
      gameAlgorithm: "Prim's Algorithm", difficulty: 'Hard', sortOrder: 24
    },
    {
      slug: 'bellman_ford',
      title: 'Bellman-Ford Shortest Path',
      description: "Find shortest distances from a source to all nodes (handles negative weights).\n\nFunction: bellman_ford(n, edges, src) -> distances list\nedges: [[from, to, weight], ...]",
      boilerplate: "def bellman_ford(n, edges, src):\n    dist = [float('inf')] * n\n    dist[src] = 0\n    # Relax all edges (n-1) times\n    return dist",
      hint: "Repeat n-1 times: for each edge (u,v,w), if dist[u]+w < dist[v] then dist[v] = dist[u]+w.",
      testCases: JSON.stringify([
        { input: "5, [[0,1,6],[0,2,7],[1,2,8],[1,3,5],[1,4,-4],[2,3,-3],[2,4,9],[3,1,-2],[4,0,2],[4,3,7]], 0", expected: "[0,2,7,4,-2]" }
      ]),
      gameType: 'dijkstra', gameTitle: 'Bellman-Ford',
      gameDescription: 'Shortest path with negative weights',
      gameIcon: 'ri-road-map-line', gameColor: 'from-fuchsia-400 to-fuchsia-600',
      gameAlgorithm: 'Bellman-Ford', difficulty: 'Hard', sortOrder: 25
    },
    {
      slug: 'topo_sort',
      title: 'Topological Sort',
      description: "Topological order of a DAG using Kahn's algorithm.\n\nFunction: topo_sort(n, edges) -> list of node ids in topological order\nedges: [[from, to], ...]",
      boilerplate: "from collections import deque\n\ndef topo_sort(n, edges):\n    # Compute in-degree, BFS from 0-degree nodes\n    pass",
      hint: "Build in-degree list. Enqueue all nodes with in-degree 0. Dequeue, add to result, reduce neighbours' in-degree.",
      testCases: JSON.stringify([
        { input: "6, [[5,2],[5,0],[4,0],[4,1],[2,3],[3,1]]", expected: "valid topological order" }
      ]),
      gameType: 'dijkstra', gameTitle: 'Topological Sort',
      gameDescription: 'Order tasks respecting dependencies',
      gameIcon: 'ri-flow-chart', gameColor: 'from-fuchsia-500 to-fuchsia-700',
      gameAlgorithm: 'Topological Sort', difficulty: 'Hard', sortOrder: 26
    },

    // Stack/Queue family
    {
      slug: 'queue_impl',
      title: 'Queue Implementation',
      description: "Implement a Queue class with enqueue, dequeue, front and size methods.",
      boilerplate: "class Queue:\n    def __init__(self):\n        self.items = []\n\n    def enqueue(self, val):\n        # Add to back\n        pass\n\n    def dequeue(self):\n        # Remove & return front\n        pass\n\n    def front(self):\n        # Peek front\n        pass\n\n    def size(self):\n        # Return length\n        pass",
      hint: "Use append() to add to the back and pop(0) to remove from the front.",
      testCases: JSON.stringify([
        { input: "enqueue(1), enqueue(2), front(), dequeue(), size()", expected: "front=1, dequeue=1, size=1" }
      ]),
      gameType: 'stack', gameTitle: 'Queue Builder',
      gameDescription: 'Build a FIFO queue from scratch',
      gameIcon: 'ri-align-justify', gameColor: 'from-green-500 to-green-700',
      gameAlgorithm: 'Queue Operations', difficulty: 'Easy', sortOrder: 27
    },
    {
      slug: 'prefix_eval',
      title: 'Evaluate Prefix Expression',
      description: "Evaluate a prefix (Polish notation) expression.\n\nFunction: eval_prefix(tokens) -> number\ntokens: list of strings, e.g. ['+','3','4'] -> 7",
      boilerplate: "def eval_prefix(tokens):\n    # Process right-to-left with a stack\n    pass",
      hint: "Traverse tokens right to left. Push numbers onto stack. On operator, pop two operands, compute, push result.",
      testCases: JSON.stringify([
        { input: "['+','3','4']", expected: "7" },
        { input: "['*','+','2','3','4']", expected: "20" },
        { input: "['-','10','5']", expected: "5" }
      ]),
      gameType: 'stack', gameTitle: 'Prefix Evaluator',
      gameDescription: 'Evaluate Polish notation expressions',
      gameIcon: 'ri-terminal-box-line', gameColor: 'from-green-300 to-green-500',
      gameAlgorithm: 'Stack + Prefix', difficulty: 'Medium', sortOrder: 28
    },
    {
      slug: 'infix_postfix',
      title: 'Infix to Postfix',
      description: "Convert infix expression to postfix (Reverse Polish Notation).\n\nFunction: to_postfix(tokens) -> list in postfix order\nSupport +, -, *, / and parentheses",
      boilerplate: "def to_postfix(tokens):\n    # Shunting-yard algorithm\n    pass",
      hint: "Use an operator stack and output list. Pop higher/equal precedence ops before pushing new op. Parentheses reset precedence.",
      testCases: JSON.stringify([
        { input: "['3','+','4']", expected: "['3','4','+']" },
        { input: "['(','3','+','4',')','*','2']", expected: "['3','4','+','2','*']" }
      ]),
      gameType: 'stack', gameTitle: 'Shunting Yard',
      gameDescription: 'Convert infix to postfix notation',
      gameIcon: 'ri-code-box-line', gameColor: 'from-lime-500 to-lime-700',
      gameAlgorithm: 'Shunting-Yard', difficulty: 'Medium', sortOrder: 29
    },

    // Recursion family
    {
      slug: 'fibonacci_climb',
      title: 'Stair Climbing (Fibonacci)',
      description: "You can climb 1 or 2 steps at a time. How many distinct ways to reach step n?\n\nFunction: climb_stairs(n) -> number of ways",
      boilerplate: "def climb_stairs(n):\n    # DP or recursion with memo\n    pass",
      hint: "climb_stairs(n) = climb_stairs(n-1) + climb_stairs(n-2). Base cases: climb_stairs(1)=1, climb_stairs(2)=2.",
      testCases: JSON.stringify([
        { input: "3", expected: "3" },
        { input: "5", expected: "8" },
        { input: "1", expected: "1" },
        { input: "10", expected: "89" }
      ]),
      gameType: 'recursion', gameTitle: 'Stair Climber',
      gameDescription: 'Count ways to climb n stairs',
      gameIcon: 'ri-footprint-line', gameColor: 'from-yellow-500 to-yellow-700',
      gameAlgorithm: 'Fibonacci / DP', difficulty: 'Easy', sortOrder: 30
    },
    {
      slug: 'subset_sum',
      title: 'Subset Sum',
      description: "Given positive integers and a target sum, return True if any subset sums to target.\n\nFunction: has_subset_sum(arr, target) -> bool",
      boilerplate: "def has_subset_sum(arr, target):\n    # Recursion or DP\n    pass",
      hint: "For each element: include it (reduce target) or exclude it (keep target). Base: target==0 -> True, empty list -> False.",
      testCases: JSON.stringify([
        { input: "[3,34,4,12,5,2], 9", expected: "True" },
        { input: "[3,34,4,12,5,2], 30", expected: "False" },
        { input: "[1,2,3], 6", expected: "True" }
      ]),
      gameType: 'recursion', gameTitle: 'Subset Sum',
      gameDescription: 'Find if a subset sums to a target',
      gameIcon: 'ri-checkbox-multiple-line', gameColor: 'from-yellow-300 to-yellow-500',
      gameAlgorithm: 'Subset Sum', difficulty: 'Medium', sortOrder: 31
    },

    // Greedy family
    {
      slug: 'activity_select',
      title: 'Activity Selection',
      description: "Find the maximum number of non-overlapping activities.\n\nFunction: max_activities(acts) -> count\nacts: [[start, end], ...]",
      boilerplate: "def max_activities(acts):\n    # Greedy: pick by earliest finish time\n    pass",
      hint: "Sort by end time. Pick the first activity, then always pick the next whose start >= last picked end.",
      testCases: JSON.stringify([
        { input: "[[1,4],[3,5],[0,6],[5,7],[3,9],[5,9],[6,10],[8,11],[8,12],[2,14],[12,16]]", expected: "4" },
        { input: "[[1,2],[2,3],[3,4]]", expected: "3" }
      ]),
      gameType: 'greedy', gameTitle: 'Activity Selector',
      gameDescription: 'Pick maximum non-overlapping activities',
      gameIcon: 'ri-calendar-check-line', gameColor: 'from-amber-500 to-amber-700',
      gameAlgorithm: 'Activity Selection', difficulty: 'Medium', sortOrder: 32
    },
    {
      slug: 'char_frequency',
      title: 'Frequency Sort',
      description: "Sort characters of a string by frequency (descending). Same-frequency chars in original order.\n\nFunction: freq_sort(s) -> rearranged string",
      boilerplate: "def freq_sort(s):\n    # Count chars, sort by frequency desc\n    pass",
      hint: "Build a frequency dict, then sort characters by their frequency descending.",
      testCases: JSON.stringify([
        { input: "'tree'", expected: "'eert' or 'eetr'" },
        { input: "'aab'", expected: "'aab'" }
      ]),
      gameType: 'greedy', gameTitle: 'Frequency Sort',
      gameDescription: 'Sort characters by their frequency',
      gameIcon: 'ri-bar-chart-2-line', gameColor: 'from-amber-300 to-amber-500',
      gameAlgorithm: 'Frequency Counting', difficulty: 'Medium', sortOrder: 33
    },
    {
      slug: 'job_schedule',
      title: 'Job Scheduling',
      description: "Schedule jobs with deadlines to maximise profit (at most one job per time slot).\n\nFunction: job_schedule(jobs) -> max profit\njobs: [[deadline, profit], ...]",
      boilerplate: "def job_schedule(jobs):\n    # Sort by profit desc, assign to latest free slot\n    pass",
      hint: "Sort by profit descending. For each job try to schedule it at the latest free slot <= its deadline.",
      testCases: JSON.stringify([
        { input: "[[2,100],[1,19],[2,27],[1,25],[3,15]]", expected: "142" }
      ]),
      gameType: 'greedy', gameTitle: 'Job Scheduler',
      gameDescription: 'Schedule jobs for maximum profit',
      gameIcon: 'ri-time-line', gameColor: 'from-orange-500 to-orange-700',
      gameAlgorithm: 'Job Scheduling', difficulty: 'Hard', sortOrder: 34
    },

    // Linked-list family
    {
      slug: 'doubly_linked',
      title: 'Reverse Doubly Linked List',
      description: "Simulate reversing a doubly linked list by reversing a list in-place.\n\nFunction: reverse_list(arr) -> reversed list",
      boilerplate: "def reverse_list(arr):\n    # Swap from both ends toward the center\n    pass",
      hint: "Use two pointers (start and end), swap elements, move inward until they meet.",
      testCases: JSON.stringify([
        { input: "[1,2,3,4,5]", expected: "[5,4,3,2,1]" },
        { input: "[10,20]", expected: "[20,10]" }
      ]),
      gameType: 'linkedlist', gameTitle: 'Reverse List',
      gameDescription: 'Reverse a doubly linked list',
      gameIcon: 'ri-arrow-left-right-line', gameColor: 'from-orange-300 to-orange-500',
      gameAlgorithm: 'Doubly Linked List', difficulty: 'Medium', sortOrder: 35
    },
    {
      slug: 'cycle_detect',
      title: 'Detect Cycle in Graph',
      description: "Given an undirected graph, detect if it contains a cycle.\n\nFunction: has_cycle(n, edges) -> bool\nedges: [[u, v], ...]",
      boilerplate: "def has_cycle(n, edges):\n    # Union-Find or DFS\n    pass",
      hint: "Union-Find: for each edge, if both endpoints already share the same root, a cycle exists.",
      testCases: JSON.stringify([
        { input: "4, [[0,1],[1,2],[2,3],[3,0]]", expected: "True" },
        { input: "3, [[0,1],[1,2]]", expected: "False" }
      ]),
      gameType: 'linkedlist', gameTitle: 'Cycle Detector',
      gameDescription: 'Detect a cycle in a graph',
      gameIcon: 'ri-refresh-line', gameColor: 'from-red-500 to-red-700',
      gameAlgorithm: 'Union-Find', difficulty: 'Medium', sortOrder: 36
    },
    {
      slug: 'merge_sorted',
      title: 'Merge Two Sorted Lists',
      description: "Merge two sorted lists into one sorted list.\n\nFunction: merge_sorted(a, b) -> merged sorted list",
      boilerplate: "def merge_sorted(a, b):\n    result = []\n    # Two-pointer merge\n    return result",
      hint: "Maintain two indices i, j. Compare a[i] and b[j], append the smaller one, advance that pointer.",
      testCases: JSON.stringify([
        { input: "[1,3,5], [2,4,6]", expected: "[1,2,3,4,5,6]" },
        { input: "[1,1], [2,2]", expected: "[1,1,2,2]" }
      ]),
      gameType: 'linkedlist', gameTitle: 'Merge Sorted',
      gameDescription: 'Merge two sorted arrays into one',
      gameIcon: 'ri-merge-cells-horizontal', gameColor: 'from-red-300 to-red-500',
      gameAlgorithm: 'Two-Pointer Merge', difficulty: 'Easy', sortOrder: 37
    },

    // Hash family
    {
      slug: 'two_sum_hash',
      title: 'Two Sum (Hash Map)',
      description: "Find two indices whose values sum to target using a hash map.\n\nFunction: two_sum(arr, target) -> [i, j]",
      boilerplate: "def two_sum(arr, target):\n    seen = {}\n    # Store complement -> index\n    pass",
      hint: "For each number, check if (target - number) exists in the dict. If yes return both indices; otherwise store number->index.",
      testCases: JSON.stringify([
        { input: "[2,7,11,15], 9", expected: "[0,1]" },
        { input: "[3,2,4], 6", expected: "[1,2]" }
      ]),
      gameType: 'hash', gameTitle: 'Two Sum Hash',
      gameDescription: 'Solve Two Sum with a hash map',
      gameIcon: 'ri-add-circle-line', gameColor: 'from-rose-500 to-rose-700',
      gameAlgorithm: 'Hash Map Lookup', difficulty: 'Easy', sortOrder: 38
    },
    {
      slug: 'anagram_group',
      title: 'Group Anagrams',
      description: "Group words that are anagrams of each other.\n\nFunction: group_anagrams(words) -> list of groups",
      boilerplate: "def group_anagrams(words):\n    groups = {}\n    # Sort each word as key\n    pass",
      hint: "For each word, sort its letters to create a key. Map key -> [words]. Return all values of the dict.",
      testCases: JSON.stringify([
        { input: "['eat','tea','tan','ate','nat','bat']", expected: "[['eat','tea','ate'],['tan','nat'],['bat']]" }
      ]),
      gameType: 'hash', gameTitle: 'Anagram Groups',
      gameDescription: 'Group words that are anagrams',
      gameIcon: 'ri-text', gameColor: 'from-rose-300 to-rose-500',
      gameAlgorithm: 'Hash Grouping', difficulty: 'Medium', sortOrder: 39
    },

    // DP family
    {
      slug: 'lcs_dp',
      title: 'Longest Common Subsequence',
      description: "Find the length of the longest common subsequence of two strings.\n\nFunction: lcs(a, b) -> number",
      boilerplate: "def lcs(a, b):\n    # Build a 2-D DP table\n    pass",
      hint: "dp[i][j] = LCS length of a[0..i-1] and b[0..j-1]. If a[i-1]==b[j-1] -> dp[i-1][j-1]+1, else max(dp[i-1][j], dp[i][j-1]).",
      testCases: JSON.stringify([
        { input: "'abcde', 'ace'", expected: "3" },
        { input: "'abc', 'def'", expected: "0" },
        { input: "'abc', 'abc'", expected: "3" }
      ]),
      gameType: 'dp', gameTitle: 'LCS Challenge',
      gameDescription: 'Find the longest common subsequence',
      gameIcon: 'ri-text-wrap', gameColor: 'from-pink-500 to-pink-700',
      gameAlgorithm: 'LCS (DP)', difficulty: 'Hard', sortOrder: 40
    },
    {
      slug: 'lis_dp',
      title: 'Longest Increasing Subsequence',
      description: "Find length of the longest strictly increasing subsequence.\n\nFunction: lis(arr) -> number",
      boilerplate: "def lis(arr):\n    # dp[i] = LIS length ending at index i\n    pass",
      hint: "dp[i] = 1 + max(dp[j]) for all j < i where arr[j] < arr[i]. Answer is max(dp).",
      testCases: JSON.stringify([
        { input: "[10,9,2,5,3,7,101,18]", expected: "4" },
        { input: "[0,1,0,3,2,3]", expected: "4" }
      ]),
      gameType: 'dp', gameTitle: 'LIS Challenge',
      gameDescription: 'Find the longest increasing subsequence',
      gameIcon: 'ri-line-chart-line', gameColor: 'from-pink-300 to-pink-500',
      gameAlgorithm: 'LIS (DP)', difficulty: 'Hard', sortOrder: 41
    },
    {
      slug: 'rod_cutting',
      title: 'Rod Cutting',
      description: "Given a rod of length n and prices for each length, find maximum revenue.\n\nFunction: rod_cut(prices, n) -> max revenue\nprices[i] = price for length (i+1)",
      boilerplate: "def rod_cut(prices, n):\n    # dp[i] = max revenue for rod of length i\n    pass",
      hint: "dp[i] = max(prices[j-1] + dp[i-j]) for j = 1..i. Base: dp[0] = 0.",
      testCases: JSON.stringify([
        { input: "[1,5,8,9,10,17,17,20], 8", expected: "22" },
        { input: "[3,5,8,9,10,17,17,20], 4", expected: "12" }
      ]),
      gameType: 'dp', gameTitle: 'Rod Cutter',
      gameDescription: 'Cut a rod for maximum revenue',
      gameIcon: 'ri-scissors-cut-line', gameColor: 'from-violet-500 to-violet-700',
      gameAlgorithm: 'Rod Cutting (DP)', difficulty: 'Hard', sortOrder: 42
    },

    // Tree family
    {
      slug: 'heap_build',
      title: 'Build Min-Heap',
      description: "Rearrange a list into a valid min-heap (parent <= children).\n\nFunction: build_min_heap(arr) -> min-heap list",
      boilerplate: "def build_min_heap(arr):\n    # Heapify from last non-leaf up to root\n    pass",
      hint: "Start from i = len(arr)//2 - 1 down to 0. Swap with smallest child if needed, then sift down.",
      testCases: JSON.stringify([
        { input: "[5,3,8,1,2]", expected: "valid min-heap" }
      ]),
      gameType: 'tree', gameTitle: 'Heap Builder',
      gameDescription: 'Build a min-heap from an array',
      gameIcon: 'ri-stack-line', gameColor: 'from-violet-300 to-violet-500',
      gameAlgorithm: 'Min-Heap', difficulty: 'Medium', sortOrder: 43
    },
    {
      slug: 'avl_check',
      title: 'Balanced BST Check',
      description: "Check if a binary tree (given as level-order list, None for missing) is a balanced BST.\n\nFunction: is_balanced_bst(arr) -> bool\nBalanced = height diff of subtrees <= 1 AND BST property holds",
      boilerplate: "def is_balanced_bst(arr):\n    # Rebuild tree, verify BST + balance\n    pass",
      hint: "Reconstruct the tree from the list. Check in-order traversal is sorted (BST) and height difference <= 1 at every node.",
      testCases: JSON.stringify([
        { input: "[2,1,3]", expected: "True" },
        { input: "[5,3,7,2,4,6,8]", expected: "True" }
      ]),
      gameType: 'tree', gameTitle: 'Balance Checker',
      gameDescription: 'Check if a tree is a balanced BST',
      gameIcon: 'ri-scales-3-line', gameColor: 'from-purple-300 to-purple-500',
      gameAlgorithm: 'Balanced BST', difficulty: 'Hard', sortOrder: 44
    },

    // Graph coloring family
    {
      slug: 'bipartite_check',
      title: 'Bipartite Graph Check',
      description: "Determine if an undirected graph is bipartite (2-colourable).\n\nFunction: is_bipartite(n, edges) -> bool\nedges: [[u, v], ...]",
      boilerplate: "from collections import deque\n\ndef is_bipartite(n, edges):\n    # BFS/DFS 2-colouring\n    pass",
      hint: "Colour start node 0. BFS: colour every uncoloured neighbour with the opposite colour. If a neighbour already has the same colour -> not bipartite.",
      testCases: JSON.stringify([
        { input: "4, [[0,1],[1,2],[2,3],[3,0]]", expected: "True" },
        { input: "3, [[0,1],[1,2],[2,0]]", expected: "False" }
      ]),
      gameType: 'graph_coloring', gameTitle: 'Bipartite Tester',
      gameDescription: 'Check if a graph is 2-colourable',
      gameIcon: 'ri-split-cells-horizontal', gameColor: 'from-fuchsia-300 to-fuchsia-500',
      gameAlgorithm: 'Bipartite Check', difficulty: 'Hard', sortOrder: 45
    }
  ];

  for (const c of challenges) {
    await connection.query(
      `INSERT INTO gameChallenges (slug, title, description, boilerplate, hint, testCases, gameType, gameTitle, gameDescription, gameIcon, gameColor, gameAlgorithm, difficulty, sortOrder) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [c.slug, c.title, c.description, c.boilerplate, c.hint, c.testCases, c.gameType, c.gameTitle, c.gameDescription, c.gameIcon, c.gameColor, c.gameAlgorithm, c.difficulty, c.sortOrder]
    );
  }

  console.log(`  ✅ Seeded ${challenges.length} game challenges (12 original + 33 extra)`);
}


seed().catch(err => {
  console.error(' Seed failed:', err.message);
  console.error(err.stack);
  process.exit(1);
});
