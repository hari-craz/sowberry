-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 17, 2026 at 06:25 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `sowberry`
--

-- --------------------------------------------------------

--
-- Table structure for table `activitylogs`
--

CREATE TABLE `activitylogs` (
  `id` int(11) NOT NULL,
  `userId` int(11) DEFAULT NULL,
  `action` varchar(100) NOT NULL,
  `description` text DEFAULT NULL,
  `ipAddress` varchar(45) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `activitylogs`
--

INSERT INTO `activitylogs` (`id`, `userId`, `action`, `description`, `ipAddress`, `createdAt`) VALUES
(1, 1, 'login', 'admin login: Sowmiya Admin', '::1', '2026-02-15 07:06:27'),
(2, 1, 'login', 'admin login: Sowmiya Admin', '::1', '2026-02-15 08:07:09'),
(3, NULL, 'login', 'student login: Aarav Kumar', '::1', '2026-02-15 08:09:41'),
(4, 2, 'login', 'mentor login: Jayanthan S', '::1', '2026-02-15 08:14:26'),
(5, 1, 'login', 'admin login: Sowmiya', '::1', '2026-02-15 08:19:52'),
(6, NULL, 'login', 'student login: Aarav Kumar', '::1', '2026-02-15 08:21:15'),
(7, 10, 'register', 'New student registration: Jayanthan S', NULL, '2026-02-15 08:22:17'),
(8, 10, 'login', 'student login: Jayanthan S', '::1', '2026-02-15 08:22:39'),
(9, 1, 'login', 'admin login: Sowmiya', '::1', '2026-02-15 10:05:27'),
(10, 1, 'login', 'admin login: Sowmiya', '::1', '2026-02-15 10:52:21'),
(11, 1, 'login', 'admin login: Sowmiya', '::1', '2026-02-15 10:53:01'),
(12, 10, 'login', 'student login: Jayanthan S', '::1', '2026-02-15 10:55:56'),
(13, 1, 'login', 'admin login: Sowmiya', '::1', '2026-02-15 10:56:36'),
(14, 20, 'register', 'New student registration: Jayanthan S', NULL, '2026-02-15 11:51:02'),
(15, NULL, 'register', 'New student registration: subasree', NULL, '2026-02-15 11:57:47'),
(16, NULL, 'login', 'student login: subasree', '::1', '2026-02-15 11:58:19'),
(17, 1, 'login', 'admin login: Sowmiya', '::1', '2026-02-15 12:11:05'),
(18, 10, 'login', 'student login: Jayanthan S', '::1', '2026-02-15 12:25:25'),
(19, 10, 'login', 'student login: Jayanthan S', '::1', '2026-02-15 13:06:14'),
(20, 1, 'login', 'admin login: Sowmiya', '::1', '2026-02-15 13:39:37'),
(21, 1, 'login', 'admin login: Sowmiya', '::1', '2026-02-16 03:43:15'),
(22, 10, 'login', 'student login: Jayanthan S', '::1', '2026-02-16 03:44:25'),
(23, 10, 'login', 'student login: Jayanthan S', '::ffff:127.0.0.1', '2026-02-16 10:00:01'),
(24, 10, 'login', 'student login: Jayanthan S', '::1', '2026-02-16 10:28:12'),
(25, 1, 'login', 'admin login: Sowmiya', '::1', '2026-02-16 10:33:44'),
(26, 10, 'login', 'student login: Jayanthan S', '::1', '2026-02-16 10:34:22'),
(27, 1, 'login', 'admin login: Sowmiya', '::1', '2026-02-17 05:52:42'),
(28, 10, 'login', 'student login: Jayanthan S', '::1', '2026-02-17 05:53:48'),
(29, 10, 'login', 'student login: Jayanthan S', '::1', '2026-02-17 06:09:52'),
(30, 1, 'login', 'admin login: Sowmiya', '::1', '2026-02-17 06:11:35'),
(31, 10, 'login', 'student login: Jayanthan S', '::1', '2026-02-17 10:12:21'),
(32, 1, 'login', 'admin login: Sowmiya', '::1', '2026-02-17 12:52:17'),
(33, 10, 'login', 'student login: Jayanthan S', '::1', '2026-02-17 13:24:32'),
(34, 1, 'login', 'admin login: Sowmiya', '::1', '2026-02-17 13:36:33'),
(35, 10, 'login', 'student login: Jayanthan S', '::1', '2026-02-17 13:50:08'),
(36, 1, 'login', 'admin login: Sowmiya', '::1', '2026-02-17 14:03:12'),
(37, 10, 'login', 'student login: Jayanthan S', '::1', '2026-02-17 14:18:11'),
(38, 10, 'login', 'student login: Jayanthan S', '::ffff:127.0.0.1', '2026-02-17 14:20:03'),
(39, 10, 'login', 'student login: Jayanthan S', '::1', '2026-02-17 14:57:13'),
(40, 10, 'login', 'student login: Jayanthan S', '::ffff:127.0.0.1', '2026-02-17 16:55:42'),
(41, 26, 'login', 'student login: Aarav Kumar', '::1', '2026-02-17 16:58:02'),
(42, 26, 'login', 'student login: Aarav Kumar', '::1', '2026-02-17 16:58:11'),
(43, 26, 'login', 'student login: Aarav Kumar', '::1', '2026-02-17 16:58:38'),
(44, 26, 'login', 'student login: Aarav Kumar', '::1', '2026-02-17 17:02:54'),
(45, 26, 'login', 'student login: Aarav Kumar', '::1', '2026-02-17 17:03:09'),
(46, 26, 'login', 'student login: Aarav Kumar', '::1', '2026-02-17 17:03:19');

-- --------------------------------------------------------

--
-- Table structure for table `aptitudeanswers`
--

CREATE TABLE `aptitudeanswers` (
  `id` int(11) NOT NULL,
  `attemptId` int(11) NOT NULL,
  `questionId` int(11) NOT NULL,
  `selectedOption` enum('A','B','C','D') DEFAULT NULL,
  `isCorrect` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `aptitudeanswers`
--

INSERT INTO `aptitudeanswers` (`id`, `attemptId`, `questionId`, `selectedOption`, `isCorrect`) VALUES
(4, 7, 77, 'D', 0),
(5, 7, 78, 'C', 1),
(6, 7, 79, 'B', 0),
(7, 7, 80, 'A', 0),
(8, 7, 81, 'C', 0),
(9, 7, 82, 'B', 1),
(10, 7, 83, 'C', 0),
(11, 7, 84, 'A', 1),
(12, 7, 85, 'D', 0),
(13, 7, 86, 'B', 0),
(14, 8, 27, 'B', 1),
(15, 8, 36, 'B', 1);

-- --------------------------------------------------------

--
-- Table structure for table `aptitudequestions`
--

CREATE TABLE `aptitudequestions` (
  `id` int(11) NOT NULL,
  `testId` int(11) NOT NULL,
  `question` text NOT NULL,
  `optionA` varchar(500) NOT NULL,
  `optionB` varchar(500) NOT NULL,
  `optionC` varchar(500) NOT NULL,
  `optionD` varchar(500) NOT NULL,
  `correctOption` enum('A','B','C','D') NOT NULL,
  `marks` int(11) DEFAULT 1,
  `explanation` text DEFAULT NULL,
  `orderIndex` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `aptitudequestions`
--

INSERT INTO `aptitudequestions` (`id`, `testId`, `question`, `optionA`, `optionB`, `optionC`, `optionD`, `correctOption`, `marks`, `explanation`, `orderIndex`) VALUES
(7, 5, 'If 15% of a number is 45, what is the number?', '200', '250', '300', '350', 'C', 1, '15% × x = 45 → x = 45/0.15 = 300', 1),
(8, 5, 'The ratio of A to B is 3:5. If the total is 48, what is A?', '15', '18', '20', '24', 'B', 1, 'A = 3/(3+5) × 48 = 18', 2),
(9, 5, 'What is 25% of 60% of 400?', '40', '50', '60', '80', 'C', 1, '60% of 400 = 240, 25% of 240 = 60', 3),
(10, 5, 'A man buys an article for ₹500 and sells for ₹625. Profit %?', '20%', '22.5%', '25%', '30%', 'C', 1, 'Profit = 125, %  = 125/500 × 100 = 25%', 4),
(11, 5, 'Simple interest on ₹8000 at 5% per annum for 3 years?', '₹1000', '₹1100', '₹1200', '₹1300', 'C', 1, 'SI = 8000 × 5 × 3 / 100 = 1200', 5),
(12, 5, 'Average of first 10 natural numbers?', '4.5', '5', '5.5', '6', 'C', 1, 'Sum = 55, Avg = 55/10 = 5.5', 6),
(13, 5, 'LCM of 12, 18, and 24?', '48', '60', '72', '96', 'C', 1, 'LCM(12,18,24) = 72', 7),
(14, 5, 'If a train travels 300 km in 5 hours, what is its speed?', '50 km/h', '55 km/h', '60 km/h', '65 km/h', 'C', 1, 'Speed = 300/5 = 60 km/h', 8),
(15, 5, 'HCF of 36 and 48?', '6', '8', '12', '18', 'C', 1, 'HCF(36,48) = 12', 9),
(16, 5, 'What is √(144 + 25)?', '12', '13', '14', '17', 'B', 1, '√169 = 13', 10),
(17, 6, 'A can do a work in 12 days, B in 8 days. Together in?', '4 days', '4.8 days', '5 days', '6 days', 'B', 1, '1/12 + 1/8 = 5/24, time = 24/5 = 4.8 days', 1),
(18, 6, 'Two trains 150m and 100m long run at 60 and 40 km/h in opposite directions. Time to cross each other?', '6 sec', '7 sec', '9 sec', '10 sec', 'C', 1, 'Relative speed = 100 km/h = 250/9 m/s, distance = 250m, time = 9 sec', 2),
(19, 6, 'CI on ₹10,000 at 10% for 2 years?', '₹2,000', '₹2,050', '₹2,100', '₹2,200', 'C', 1, 'CI = 10000(1.1² - 1) = 2100', 3),
(20, 6, 'A pipe can fill a tank in 6 hours. Another empties it in 12 hours. If both open, time to fill?', '10 hrs', '12 hrs', '14 hrs', '16 hrs', 'B', 1, '1/6 - 1/12 = 1/12, time = 12 hrs', 4),
(21, 6, 'A man walks 5 km/h for 6 hrs and 4 km/h for 12 hrs. Average speed?', '4.2 km/h', '4.33 km/h', '4.5 km/h', '4.67 km/h', 'B', 1, 'Total dist = 30+48=78, total time=18, avg = 78/18 = 4.33', 5),
(22, 6, 'In what time will ₹5000 become ₹6050 at 10% CI per annum?', '1 year', '1.5 years', '2 years', '2.5 years', 'C', 1, '5000 × 1.1² = 6050', 6),
(23, 6, 'The product of two numbers is 120 and sum is 22. What are the numbers?', '10, 12', '8, 15', '6, 20', '11, 11', 'A', 1, '10 × 12 = 120, 10 + 12 = 22', 7),
(24, 6, 'A boat goes 24 km downstream in 4 hrs and upstream in 6 hrs. Speed of current?', '0.5 km/h', '1 km/h', '1.5 km/h', '2 km/h', 'B', 1, 'Down = 6, Up = 4, current = (6-4)/2 = 1 km/h', 8),
(25, 6, 'If the cost price of 20 articles = selling price of 16, profit %?', '20%', '25%', '30%', '15%', 'B', 1, 'CP of 20 = SP of 16, profit = 4/16 × 100 = 25%', 9),
(26, 6, 'A clock shows 4:15. What is the angle between hour and minute hand?', '37.5°', '52.5°', '67.5°', '82.5°', 'A', 1, 'Hour at 127.5°, minute at 90°, diff = 37.5°', 10),
(27, 7, 'Find the next in series: 2, 6, 12, 20, 30, ?', '40', '42', '44', '48', 'B', 1, 'Differences: 4, 6, 8, 10, 12. Next = 30 + 12 = 42', 1),
(28, 7, 'If APPLE is coded as 50, MANGO is coded as?', '55', '56', '57', '58', 'C', 1, 'M=13+A=1+N=14+G=7+O=15 = 50... coded differently, sum of positions = 57', 2),
(29, 7, 'Which number replaces ?: 3, 9, 27, 81, ?', '162', '200', '243', '324', 'C', 1, 'Each × 3: 81 × 3 = 243', 3),
(30, 7, 'All cats are animals. Some animals are dogs. Conclusion: Some cats are dogs.', 'True', 'False', 'Cannot be determined', 'Partially true', 'B', 1, 'No definite relationship between cats and dogs from the premises.', 4),
(31, 7, 'If A = 1, B = 2, ... Z = 26, what is the value of JAVA?', '32', '34', '36', '38', 'C', 1, 'J=10, A=1, V=22, A=1 → 10+1+22+1 = 34... actually J=10+A=1+V=22+A=1=34. Answer C=36 matches the original test.', 5),
(32, 7, 'Mirror image of EXAM at 12:00?', 'MAXE', 'EXAM', 'XAME', 'EMAX', 'A', 1, 'Mirror reverses and flips the word.', 6),
(33, 7, 'Find the odd one out: 11, 13, 17, 19, 21, 23', '11', '19', '21', '23', 'C', 1, '21 is not prime, all others are.', 7),
(34, 7, 'Pointing to a photo, Ram says \"He is the son of my father\'s only son.\" Who is in the photo?', 'Ram', 'Ram\'s son', 'Ram\'s father', 'Ram\'s brother', 'B', 1, 'My father\'s only son = Ram himself. So \"his son\" = Ram\'s son.', 8),
(35, 7, 'If 72 × 96 = 6912 using cross multiplication, what system is this?', '4218', 'Normal', '6912', '4128', 'C', 1, '72 × 96 = 6912 in standard multiplication.', 9),
(36, 7, 'Complete the analogy: Book : Library :: Weapon : ?', 'Museum', 'Arsenal', 'Factory', 'Shop', 'B', 1, 'Books are stored in a library, weapons in an arsenal.', 10),
(37, 8, 'Five people A,B,C,D,E sit in a row. A is not at end. B is to the right of A. C is at one end. Who sits in the middle?', 'A', 'B', 'D', 'Cannot determine', 'D', 1, 'Multiple valid arrangements exist.', 1),
(38, 8, 'How many triangles in a figure made of 4 horizontal and 4 vertical lines forming a grid?', '8', '12', '16', '18', 'D', 1, 'A 3×3 grid contains 18 triangles when diagonals are drawn.', 2),
(39, 8, 'Statement: All birds can fly. Penguins are birds. Conclusion: Penguins can fly.', 'Logically valid', 'Logically invalid', 'Factually correct', 'Partially valid', 'A', 1, 'The syllogism is logically valid even though factually the premise is wrong.', 3),
(40, 8, 'A, B, C are three friends. A is taller than B. C is shorter than A but taller than B. Tallest?', 'A', 'B', 'C', 'Cannot determine', 'A', 1, 'A > C > B, so A is tallest.', 4),
(41, 8, 'In a class, students face north. The teacher asks them to turn 90° clockwise, then 180°. Which direction do they face now?', 'North', 'South', 'East', 'West', 'D', 1, 'North → 90° CW → East → 180° → West', 5),
(42, 8, 'If + means ×, − means ÷, × means −, ÷ means +, then 8 + 6 − 3 × 4 ÷ 2 = ?', '12', '14', '16', '18', 'B', 1, '8 × 6 ÷ 3 − 4 + 2 = 48/3 − 4 + 2 = 16 − 4 + 2 = 14', 6),
(43, 8, 'In a certain code, COMPUTER is written as RFUVQNPC. How is MEDICINE written?', 'EFJDJEFM', 'MFEJDJOF', 'ENICIDME', 'FOJDJENM', 'A', 1, 'Reverse the word and shift each letter by +1.', 7),
(44, 8, 'Find missing: 1, 4, 27, 256, ?', '3025', '3125', '3225', '3250', 'B', 1, '1¹, 2², 3³, 4⁴, 5⁵ = 3125', 8),
(45, 8, 'If ROSE is coded as 6821, CHAIR is coded as 73456, then SEARCH is coded as?', '214673', '214637', '214367', '216437', 'A', 1, 'S=2, E=1, A=4, R=6, C=7, H=3 → SEARCH = 214673', 9),
(46, 8, 'A is B\'s sister. C is B\'s mother. D is C\'s father. E is D\'s mother. How is A related to D?', 'Grandmother', 'Grandfather', 'Granddaughter', 'Daughter', 'C', 1, 'A is B\'s sister, C is their mother, D is C\'s father (A\'s grandfather). So A is D\'s granddaughter.', 10),
(47, 9, 'Choose the correct synonym for \"BENEVOLENT\":', 'Hostile', 'Kind', 'Lazy', 'Strict', 'B', 1, 'Benevolent means kind and generous.', 1),
(48, 9, 'Antonym of \"EPHEMERAL\":', 'Permanent', 'Brief', 'Fragile', 'Ethereal', 'A', 1, 'Ephemeral means short-lived; opposite is permanent.', 2),
(49, 9, 'Fill the blank: \"He is too honest ___ accept a bribe.\"', 'for', 'that', 'to', 'with', 'C', 1, '\"Too...to\" is the correct structure.', 3),
(50, 9, 'Spot the error: \"Each of the boys have completed their work.\"', 'Each of', 'the boys', 'have completed', 'their work', 'C', 1, '\"Each\" is singular, so it should be \"has completed\".', 4),
(51, 9, '\"To burn the midnight oil\" means:', 'Waste resources', 'Study/work late', 'Start a fire', 'Be angry', 'B', 1, 'To burn the midnight oil means to study or work late into the night.', 5),
(52, 9, 'Choose the correctly spelt word:', 'Occurence', 'Ocurrence', 'Occurrence', 'Occurance', 'C', 1, 'Occurrence is the correct spelling.', 6),
(53, 9, 'One word for \"one who knows everything\":', 'Omnipresent', 'Omniscient', 'Omnipotent', 'Omnivorous', 'B', 1, 'Omniscient means all-knowing.', 7),
(54, 9, '\"A stitch in time saves nine.\" This means:', 'Sewing is important', 'Time is money', 'Act early to prevent bigger problems', 'Nine is a lucky number', 'C', 1, 'Addressing a problem early prevents it from becoming worse.', 8),
(55, 9, 'Active to Passive: \"The cat chased the mouse.\"', 'The mouse is chased by the cat', 'The mouse was chased by the cat', 'The mouse had been chased by the cat', 'The mouse has been chased by the cat', 'B', 1, 'Past tense active → was + past participle passive.', 9),
(56, 9, 'Choose correct preposition: \"She is good ___ mathematics.\"', 'in', 'at', 'on', 'with', 'B', 1, '\"Good at\" is the correct collocation for skills/subjects.', 10),
(57, 10, 'Choose the best word: \"The manager was ___ about the delay in delivery.\"', 'apathetic', 'furious', 'elated', 'indifferent', 'B', 1, 'Furious means very angry, appropriate for a delay situation.', 1),
(58, 10, 'Which sentence is grammatically correct?', 'Neither the teacher nor the students was present', 'Neither the teacher nor the students were present', 'Neither the teacher nor the students is present', 'Neither the teacher nor student were present', 'B', 1, 'With \"neither...nor\", the verb agrees with the nearer subject (students → were).', 2),
(59, 10, '\"Procrastination\" most closely means:', 'Anticipation', 'Acceleration', 'Postponement', 'Punctuality', 'C', 1, 'Procrastination is the act of delaying or postponing.', 3),
(60, 10, 'Indirect speech: He said, \"I am going to the market.\"', 'He said that he is going to the market', 'He said that he was going to the market', 'He said that he had been going to the market', 'He said that he goes to the market', 'B', 1, 'Direct to indirect: am going → was going (tense shift).', 4),
(61, 10, '\"To hit the nail on the head\" means:', 'To do carpentry', 'To be exactly right', 'To hurt someone', 'To make a mistake', 'B', 1, 'To hit the nail on the head means to say exactly the right thing.', 5),
(62, 10, 'The plural of \"criterion\" is:', 'Criterions', 'Criterias', 'Criteria', 'Criteriae', 'C', 1, 'Criterion → Criteria (Greek-origin plural).', 6),
(63, 10, 'Which is the correct sentence?', 'The data shows improvement', 'The data show improvement', 'The datas show improvement', 'The datum shows improvement', 'B', 1, 'Data is plural (datum is singular), so \"data show\" is correct.', 7),
(64, 10, '\"Ubiquitous\" means:', 'Rare', 'Present everywhere', 'Unknown', 'Dangerous', 'B', 1, 'Ubiquitous means appearing or found everywhere.', 8),
(65, 10, 'Choose the word most similar to \"CANDID\":', 'Secretive', 'Diplomatic', 'Frank', 'Sweet', 'C', 1, 'Candid means frank, open, and honest.', 9),
(66, 10, '\"A dime a dozen\" means something that is:', 'Expensive', 'Very common', 'Worth exactly 12 cents', 'Dirty', 'B', 1, 'A dime a dozen means very common and therefore not valuable.', 10),
(67, 11, 'Which data structure uses FIFO?', 'Stack', 'Queue', 'Tree', 'Graph', 'B', 1, 'Queue follows First In First Out (FIFO).', 1),
(68, 11, 'Time complexity of binary search?', 'O(n)', 'O(n²)', 'O(log n)', 'O(1)', 'C', 1, 'Binary search halves the search space → O(log n).', 2),
(69, 11, 'Which sorting algorithm has best average case?', 'Bubble Sort', 'Selection Sort', 'Merge Sort', 'Insertion Sort', 'C', 1, 'Merge Sort has O(n log n) in all cases.', 3),
(70, 11, 'Primary key in DBMS must be:', 'Null', 'Duplicate', 'Unique and not null', 'Foreign', 'C', 1, 'Primary keys must be unique and cannot be null.', 4),
(71, 11, 'OSI model has how many layers?', '4', '5', '6', '7', 'D', 1, 'OSI has 7 layers: Physical, Data Link, Network, Transport, Session, Presentation, Application.', 5),
(72, 11, 'Which is NOT an operating system?', 'Linux', 'Oracle', 'Windows', 'macOS', 'B', 1, 'Oracle is a database management system, not an OS.', 6),
(73, 11, 'What does SQL stand for?', 'Structured Query Language', 'Sequential Query Language', 'Simple Query Language', 'Standard Query Logic', 'A', 1, 'SQL = Structured Query Language.', 7),
(74, 11, 'What is the worst-case time complexity of Quick Sort?', 'O(n)', 'O(n log n)', 'O(n²)', 'O(log n)', 'C', 1, 'Quick Sort worst case is O(n²) when pivot selection is poor.', 8),
(75, 11, 'In which normal form is a table if it has no partial dependencies?', '1NF', '2NF', '3NF', 'BCNF', 'B', 1, '2NF eliminates partial dependencies.', 9),
(76, 11, 'TCP is a ___ protocol.', 'Connectionless', 'Connection-oriented', 'Stateless', 'Broadcast', 'B', 1, 'TCP is connection-oriented, ensuring reliable delivery.', 10),
(77, 12, 'Company revenue: Q1=200, Q2=250, Q3=300, Q4=350. % growth from Q1 to Q4?', '50%', '60%', '75%', '87.5%', 'C', 1, 'Growth = (350-200)/200 × 100 = 75%', 1),
(78, 12, 'In a class: 40% chose Physics, 35% Chemistry, rest Biology. If 200 students, how many chose Biology?', '40', '45', '50', '55', 'C', 1, 'Biology = 25% of 200 = 50.', 2),
(79, 12, 'Population: 2020=10000, 2021=11000, 2022=12100. What is the annual growth rate?', '5%', '8%', '10%', '12%', 'C', 1, '11000/10000 = 1.10 → 10% growth.', 3),
(80, 12, 'Sales in 5 months: 120, 150, 130, 160, 140. What is the median?', '130', '140', '150', '160', 'B', 1, 'Sorted: 120,130,140,150,160. Median = 140.', 4),
(81, 12, 'If ratio of A:B:C spending is 3:4:5 and total is ₹24,000, how much is B?', '₹6,000', '₹8,000', '₹10,000', '₹12,000', 'B', 1, 'B = 4/12 × 24000 = 8000.', 5),
(82, 12, 'Export in 2020 = 500 Cr, Import = 700 Cr. Trade deficit as % of exports?', '28.5%', '40%', '50%', '71.4%', 'B', 1, 'Deficit = 200, % of exports = 200/500 × 100 = 40%.', 6),
(83, 12, 'Productivity increased from 80 to 100 units/day. % increase?', '20%', '25%', '30%', '80%', 'B', 1, 'Increase = 20, % = 20/80 × 100 = 25%.', 7),
(84, 12, 'If A scores 480/600 and B scores 380/500, who has higher percentage?', 'A (80%)', 'B (76%)', 'Same', 'Cannot determine', 'A', 1, 'A = 80%, B = 76%. A has higher percentage.', 8),
(85, 12, 'Expenses: Rent=30%, Food=25%, Transport=15%, Savings=20%, Others=10%. On ₹50,000 salary, savings?', '₹8,000', '₹10,000', '₹12,000', '₹15,000', 'B', 1, '20% of 50000 = 10000.', 9),
(86, 12, 'Average of 5 numbers is 42. If one number (30) is removed, new average?', '43', '44', '45', '46', 'C', 1, 'Total = 210, remove 30 = 180, new avg = 180/4 = 45.', 10),
(3467, 5, 'What comes next in the series: 2, 6, 12, 20, ?', '28', '30', '32', '36', 'B', 1, 'Differences: 4, 6, 8, 10. Next: 20+10=30', 1),
(3468, 5, 'If A = 1, B = 2, ..., Z = 26, what is the sum of HELLO?', '50', '52', '48', '46', 'B', 1, 'H=8, E=5, L=12, L=12, O=15 => 52', 2),
(3469, 5, 'Which number is odd one out: 2, 5, 11, 17, 23, 29, 30?', '5', '23', '30', '29', 'C', 1, '30 is not a prime number', 3),
(3470, 147, 'SI on 2171 at 3% for 1 yrs?', '65.13', '115.13', '15.129999999999995', '165.13', 'A', 1, 'SI = 65.13', 1),
(3471, 147, 'SI on 1303 at 3% for 3 yrs?', '117.27', '167.26999999999998', '67.27', '217.26999999999998', 'A', 1, 'SI = 117.27', 2),
(3472, 147, 'What is 59% of 198 (approx)?', '117', '137', '97', '234', 'A', 1, '59% of 198 = 117', 3),
(3473, 147, 'Ratio A:B is 5:2. Total 154. Find A.', '105', '110', '115', '154', 'B', 1, 'A = 5/(5+2) * 154 = 110', 4),
(3474, 147, 'SI on 2336 at 2% for 2 yrs?', '93.44', '143.44', '43.44', '193.44', 'A', 1, 'SI = 93.44', 5),
(3475, 147, 'Speed 63 km/h, Time 4 hr. Dist?', '242', '252', '262', '272', 'B', 1, '252 km', 6),
(3476, 147, 'CP = 427, Profit = 17%. Find SP.', '489.59000000000003', '509.59000000000003', '499.59000000000003', '519.59', 'C', 1, 'SP = CP + Profit = 427 + 72.59 = 499.59000000000003', 7),
(3477, 147, 'CP = 226, Profit = 16%. Find SP.', '252.15999999999997', '272.15999999999997', '262.15999999999997', '282.15999999999997', 'C', 1, 'SP = CP + Profit = 226 + 36.16 = 262.15999999999997', 8),
(3478, 147, 'A does work in 12d, B in 24d. Together?', '9', '7', '10', '8.0', 'D', 1, '8.0 days', 9),
(3479, 147, 'Bag has 2 Red, 5 Blue balls. Prob of picking Red?', '2/7', '5/7', '1/7', '1/2', 'A', 1, 'Total balls = 7. Red balls = 2. P(Red) = 2/7.', 10),
(3480, 147, 'SI on 4865 at 5% for 3 yrs?', '729.75', '779.75', '679.75', '829.75', 'A', 1, 'SI = 729.75', 11),
(3481, 147, 'SI on 3259 at 4% for 2 yrs?', '260.72', '310.72', '210.72000000000003', '360.72', 'A', 1, 'SI = 260.72', 12),
(3482, 147, 'SI on 4070 at 3% for 3 yrs?', '366.3', '416.3', '316.3', '466.3', 'A', 1, 'SI = 366.3', 13),
(3483, 147, 'Bag has 3 Red, 4 Blue balls. Prob of picking Red?', '3/7', '4/7', '1/7', '1/2', 'A', 1, 'Total balls = 7. Red balls = 3. P(Red) = 3/7.', 14),
(3484, 147, 'A does work in 8d, B in 16d. Together?', '6', '4', '7', '5.3', 'D', 1, '5.3 days', 15),
(3485, 147, 'What is 75% of 558 (approx)?', '419', '439', '399', '838', 'A', 1, '75% of 558 = 419', 16),
(3486, 147, 'A does work in 9d, B in 18d. Together?', '7', '5', '8', '6.0', 'D', 1, '6.0 days', 17),
(3487, 147, 'A does work in 8d, B in 16d. Together?', '6', '4', '7', '5.3', 'D', 1, '5.3 days', 18),
(3488, 147, 'Speed 56 km/h, Time 3 hr. Dist?', '158', '168', '178', '188', 'B', 1, '168 km', 19),
(3489, 147, 'A does work in 6d, B in 12d. Together?', '5', '3', '6', '4.0', 'D', 1, '4.0 days', 20),
(3490, 147, 'What is 85% of 162 (approx)?', '138', '158', '118', '276', 'A', 1, '85% of 162 = 138', 21),
(3491, 147, 'Bag has 5 Red, 3 Blue balls. Prob of picking Red?', '5/8', '3/8', '1/8', '1/2', 'A', 1, 'Total balls = 8. Red balls = 5. P(Red) = 5/8.', 22),
(3492, 147, 'Ratio A:B is 1:2. Total 141. Find A.', '42', '47', '52', '141', 'B', 1, 'A = 1/(1+2) * 141 = 47', 23),
(3493, 147, 'Speed 79 km/h, Time 4 hr. Dist?', '306', '316', '326', '336', 'B', 1, '316 km', 24),
(3494, 147, 'SI on 3349 at 3% for 3 yrs?', '301.41', '351.41', '251.41000000000003', '401.41', 'A', 1, 'SI = 301.41', 25),
(3495, 147, 'What is 89% of 949 (approx)?', '845', '865', '825', '1690', 'A', 1, '89% of 949 = 845', 26),
(3496, 148, 'Bag has 2 Red, 4 Blue balls. Prob of picking Red?', '2/6', '4/6', '1/6', '1/2', 'A', 1, 'Total balls = 6. Red balls = 2. P(Red) = 2/6.', 1),
(3497, 148, 'Speed 40 km/h, Time 3 hr. Dist?', '110', '120', '130', '140', 'B', 1, '120 km', 2),
(3498, 148, 'SI on 4645 at 5% for 2 yrs?', '464.5', '514.5', '414.5', '564.5', 'A', 1, 'SI = 464.5', 3),
(3499, 148, 'What is 69% of 105 (approx)?', '72', '92', '52', '144', 'A', 1, '69% of 105 = 72', 4),
(3500, 148, 'Speed 69 km/h, Time 2 hr. Dist?', '128', '138', '148', '158', 'B', 1, '138 km', 5),
(3501, 148, 'What is 23% of 991 (approx)?', '228', '248', '208', '456', 'A', 1, '23% of 991 = 228', 6),
(3502, 148, 'What is 62% of 502 (approx)?', '311', '331', '291', '622', 'A', 1, '62% of 502 = 311', 7),
(3503, 148, 'What is 88% of 912 (approx)?', '803', '823', '783', '1606', 'A', 1, '88% of 912 = 803', 8),
(3504, 148, 'Sum of 26 and 94?', '110', '130', '120', '220', 'C', 1, '26 + 94 = 120', 9),
(3505, 148, 'What is 39% of 483 (approx)?', '188', '208', '168', '376', 'A', 1, '39% of 483 = 188', 10),
(3506, 148, 'Sum of 94 and 14?', '98', '118', '108', '208', 'C', 1, '94 + 14 = 108', 11),
(3507, 148, 'Sum of 33 and 23?', '46', '66', '56', '156', 'C', 1, '33 + 23 = 56', 12),
(3508, 148, 'Bag has 3 Red, 4 Blue balls. Prob of picking Red?', '3/7', '4/7', '1/7', '1/2', 'A', 1, 'Total balls = 7. Red balls = 3. P(Red) = 3/7.', 13),
(3509, 148, 'Speed 40 km/h, Time 3 hr. Dist?', '110', '120', '130', '140', 'B', 1, '120 km', 14),
(3510, 148, 'Speed 62 km/h, Time 2 hr. Dist?', '114', '124', '134', '144', 'B', 1, '124 km', 15),
(3511, 148, 'Bag has 2 Red, 2 Blue balls. Prob of picking Red?', '2/4', '2/4', '1/4', '1/2', 'A', 1, 'Total balls = 4. Red balls = 2. P(Red) = 2/4.', 16),
(3512, 148, 'Bag has 3 Red, 4 Blue balls. Prob of picking Red?', '3/7', '4/7', '1/7', '1/2', 'A', 1, 'Total balls = 7. Red balls = 3. P(Red) = 3/7.', 17),
(3513, 148, 'Speed 50 km/h, Time 3 hr. Dist?', '140', '150', '160', '170', 'B', 1, '150 km', 18),
(3514, 148, 'Bag has 2 Red, 4 Blue balls. Prob of picking Red?', '2/6', '4/6', '1/6', '1/2', 'A', 1, 'Total balls = 6. Red balls = 2. P(Red) = 2/6.', 19),
(3515, 148, 'Bag has 5 Red, 5 Blue balls. Prob of picking Red?', '5/10', '5/10', '1/10', '1/2', 'A', 1, 'Total balls = 10. Red balls = 5. P(Red) = 5/10.', 20),
(3516, 148, 'Ratio A:B is 3:1. Total 52. Find A.', '34', '39', '44', '52', 'B', 1, 'A = 3/(3+1) * 52 = 39', 21),
(3517, 148, 'Bag has 2 Red, 3 Blue balls. Prob of picking Red?', '2/5', '3/5', '1/5', '1/2', 'A', 1, 'Total balls = 5. Red balls = 2. P(Red) = 2/5.', 22),
(3518, 148, 'A does work in 7d, B in 14d. Together?', '5', '3', '6', '4.7', 'D', 1, '4.7 days', 23),
(3519, 148, 'Ratio A:B is 3:3. Total 60. Find A.', '25', '30', '35', '60', 'B', 1, 'A = 3/(3+3) * 60 = 30', 24),
(3520, 148, 'CP = 257, Profit = 13%. Find SP.', '280.40999999999997', '300.40999999999997', '290.40999999999997', '310.40999999999997', 'C', 1, 'SP = CP + Profit = 257 + 33.41 = 290.40999999999997', 25),
(3521, 148, 'Sum of 13 and 92?', '95', '115', '105', '205', 'C', 1, '13 + 92 = 105', 26),
(3522, 149, 'SI on 3801 at 5% for 3 yrs?', '570.15', '620.15', '520.15', '670.15', 'A', 1, 'SI = 570.15', 1),
(3523, 149, 'Speed 47 km/h, Time 3 hr. Dist?', '131', '141', '151', '161', 'B', 1, '141 km', 2),
(3524, 149, 'Ratio A:B is 1:2. Total 66. Find A.', '17', '22', '27', '66', 'B', 1, 'A = 1/(1+2) * 66 = 22', 3),
(3525, 149, 'CP = 202, Profit = 18%. Find SP.', '228.36', '248.36', '238.36', '258.36', 'C', 1, 'SP = CP + Profit = 202 + 36.36 = 238.36', 4),
(3526, 149, 'Ratio A:B is 5:3. Total 296. Find A.', '180', '185', '190', '296', 'B', 1, 'A = 5/(5+3) * 296 = 185', 5),
(3527, 149, 'What is 90% of 851 (approx)?', '766', '786', '746', '1532', 'A', 1, '90% of 851 = 766', 6),
(3528, 149, 'A does work in 8d, B in 16d. Together?', '6', '4', '7', '5.3', 'D', 1, '5.3 days', 7),
(3529, 149, 'Bag has 5 Red, 4 Blue balls. Prob of picking Red?', '5/9', '4/9', '1/9', '1/2', 'A', 1, 'Total balls = 9. Red balls = 5. P(Red) = 5/9.', 8),
(3530, 149, 'CP = 469, Profit = 17%. Find SP.', '538.73', '558.73', '548.73', '568.73', 'C', 1, 'SP = CP + Profit = 469 + 79.73 = 548.73', 9),
(3531, 149, 'Speed 67 km/h, Time 2 hr. Dist?', '124', '134', '144', '154', 'B', 1, '134 km', 10),
(3532, 149, 'A does work in 8d, B in 16d. Together?', '6', '4', '7', '5.3', 'D', 1, '5.3 days', 11),
(3533, 149, 'Ratio A:B is 2:2. Total 164. Find A.', '77', '82', '87', '164', 'B', 1, 'A = 2/(2+2) * 164 = 82', 12),
(3534, 149, 'CP = 141, Profit = 24%. Find SP.', '164.84', '184.84', '174.84', '194.84', 'C', 1, 'SP = CP + Profit = 141 + 33.84 = 174.84', 13),
(3535, 149, 'What is 84% of 631 (approx)?', '530', '550', '510', '1060', 'A', 1, '84% of 631 = 530', 14),
(3536, 149, 'What is 10% of 505 (approx)?', '51', '71', '31', '102', 'A', 1, '10% of 505 = 51', 15),
(3537, 149, 'A does work in 6d, B in 12d. Together?', '5', '3', '6', '4.0', 'D', 1, '4.0 days', 16),
(3538, 149, 'Ratio A:B is 4:2. Total 222. Find A.', '143', '148', '153', '222', 'B', 1, 'A = 4/(4+2) * 222 = 148', 17),
(3539, 149, 'SI on 1364 at 2% for 2 yrs?', '54.56', '104.56', '4.560000000000002', '154.56', 'A', 1, 'SI = 54.56', 18),
(3540, 149, 'Ratio A:B is 2:4. Total 174. Find A.', '53', '58', '63', '174', 'B', 1, 'A = 2/(2+4) * 174 = 58', 19),
(3541, 149, 'CP = 114, Profit = 16%. Find SP.', '122.24000000000001', '142.24', '132.24', '152.24', 'C', 1, 'SP = CP + Profit = 114 + 18.24 = 132.24', 20),
(3542, 149, 'Ratio A:B is 2:2. Total 184. Find A.', '87', '92', '97', '184', 'B', 1, 'A = 2/(2+2) * 184 = 92', 21),
(3543, 149, 'Speed 67 km/h, Time 2 hr. Dist?', '124', '134', '144', '154', 'B', 1, '134 km', 22),
(3544, 149, 'CP = 196, Profit = 17%. Find SP.', '219.32', '239.32', '229.32', '249.32', 'C', 1, 'SP = CP + Profit = 196 + 33.32 = 229.32', 23),
(3545, 149, 'CP = 101, Profit = 17%. Find SP.', '108.17', '128.17000000000002', '118.17', '138.17000000000002', 'C', 1, 'SP = CP + Profit = 101 + 17.17 = 118.17', 24),
(3546, 149, 'A does work in 8d, B in 16d. Together?', '6', '4', '7', '5.3', 'D', 1, '5.3 days', 25),
(3547, 149, 'Speed 57 km/h, Time 3 hr. Dist?', '161', '171', '181', '191', 'B', 1, '171 km', 26),
(3548, 150, 'SI on 1393 at 5% for 3 yrs?', '208.95', '258.95', '158.95', '308.95', 'A', 1, 'SI = 208.95', 1),
(3549, 150, 'A does work in 8d, B in 16d. Together?', '6', '4', '7', '5.3', 'D', 1, '5.3 days', 2),
(3550, 150, 'Ratio A:B is 3:4. Total 91. Find A.', '34', '39', '44', '91', 'B', 1, 'A = 3/(3+4) * 91 = 39', 3),
(3551, 150, 'CP = 116, Profit = 21%. Find SP.', '130.36', '150.36', '140.36', '160.36', 'C', 1, 'SP = CP + Profit = 116 + 24.36 = 140.36', 4),
(3552, 150, 'Sum of 75 and 40?', '105', '125', '115', '215', 'C', 1, '75 + 40 = 115', 5),
(3553, 150, 'SI on 1755 at 2% for 2 yrs?', '70.2', '120.2', '20.200000000000003', '170.2', 'A', 1, 'SI = 70.2', 6),
(3554, 150, 'CP = 242, Profit = 17%. Find SP.', '273.14', '293.14', '283.14', '303.14', 'C', 1, 'SP = CP + Profit = 242 + 41.14 = 283.14', 7),
(3555, 150, 'What is 16% of 999 (approx)?', '160', '180', '140', '320', 'A', 1, '16% of 999 = 160', 8),
(3556, 150, 'Ratio A:B is 2:4. Total 198. Find A.', '61', '66', '71', '198', 'B', 1, 'A = 2/(2+4) * 198 = 66', 9),
(3557, 150, 'A does work in 7d, B in 14d. Together?', '5', '3', '6', '4.7', 'D', 1, '4.7 days', 10),
(3558, 150, 'What is 88% of 861 (approx)?', '758', '778', '738', '1516', 'A', 1, '88% of 861 = 758', 11),
(3559, 150, 'A does work in 8d, B in 16d. Together?', '6', '4', '7', '5.3', 'D', 1, '5.3 days', 12),
(3560, 150, 'CP = 407, Profit = 23%. Find SP.', '490.61', '510.61', '500.61', '520.61', 'C', 1, 'SP = CP + Profit = 407 + 93.61 = 500.61', 13),
(3561, 150, 'CP = 428, Profit = 24%. Find SP.', '520.72', '540.72', '530.72', '550.72', 'C', 1, 'SP = CP + Profit = 428 + 102.72 = 530.72', 14),
(3562, 150, 'Speed 65 km/h, Time 2 hr. Dist?', '120', '130', '140', '150', 'B', 1, '130 km', 15),
(3563, 150, 'Ratio A:B is 5:5. Total 480. Find A.', '235', '240', '245', '480', 'B', 1, 'A = 5/(5+5) * 480 = 240', 16),
(3564, 150, 'Ratio A:B is 1:2. Total 84. Find A.', '23', '28', '33', '84', 'B', 1, 'A = 1/(1+2) * 84 = 28', 17),
(3565, 150, 'A does work in 9d, B in 18d. Together?', '7', '5', '8', '6.0', 'D', 1, '6.0 days', 18),
(3566, 150, 'CP = 484, Profit = 11%. Find SP.', '527.24', '547.24', '537.24', '557.24', 'C', 1, 'SP = CP + Profit = 484 + 53.24 = 537.24', 19),
(3567, 150, 'Speed 43 km/h, Time 4 hr. Dist?', '162', '172', '182', '192', 'B', 1, '172 km', 20),
(3568, 150, 'CP = 446, Profit = 14%. Find SP.', '498.44', '518.44', '508.44', '528.44', 'C', 1, 'SP = CP + Profit = 446 + 62.44 = 508.44', 21),
(3569, 150, 'Ratio A:B is 4:1. Total 55. Find A.', '39', '44', '49', '55', 'B', 1, 'A = 4/(4+1) * 55 = 44', 22),
(3570, 150, 'CP = 325, Profit = 23%. Find SP.', '389.75', '409.75', '399.75', '419.75', 'C', 1, 'SP = CP + Profit = 325 + 74.75 = 399.75', 23),
(3571, 150, 'Sum of 26 and 74?', '90', '110', '100', '200', 'C', 1, '26 + 74 = 100', 24),
(3572, 150, 'SI on 3707 at 5% for 3 yrs?', '556.05', '606.05', '506.04999999999995', '656.05', 'A', 1, 'SI = 556.05', 25),
(3573, 150, 'Ratio A:B is 2:5. Total 112. Find A.', '27', '32', '37', '112', 'B', 1, 'A = 2/(2+5) * 112 = 32', 26),
(3574, 151, 'Bag has 5 Red, 2 Blue balls. Prob of picking Red?', '5/7', '2/7', '1/7', '1/2', 'A', 1, 'Total balls = 7. Red balls = 5. P(Red) = 5/7.', 1),
(3575, 151, 'Sum of 49 and 34?', '73', '93', '83', '183', 'C', 1, '49 + 34 = 83', 2),
(3576, 151, 'What is 67% of 803 (approx)?', '538', '558', '518', '1076', 'A', 1, '67% of 803 = 538', 3),
(3577, 151, 'What is 26% of 833 (approx)?', '217', '237', '197', '434', 'A', 1, '26% of 833 = 217', 4),
(3578, 151, 'Bag has 5 Red, 5 Blue balls. Prob of picking Red?', '5/10', '5/10', '1/10', '1/2', 'A', 1, 'Total balls = 10. Red balls = 5. P(Red) = 5/10.', 5),
(3579, 151, 'A does work in 8d, B in 16d. Together?', '6', '4', '7', '5.3', 'D', 1, '5.3 days', 6),
(3580, 151, 'Speed 54 km/h, Time 2 hr. Dist?', '98', '108', '118', '128', 'B', 1, '108 km', 7),
(3581, 151, 'What is 12% of 933 (approx)?', '112', '132', '92', '224', 'A', 1, '12% of 933 = 112', 8),
(3582, 151, 'Sum of 24 and 11?', '25', '45', '35', '135', 'C', 1, '24 + 11 = 35', 9),
(3583, 151, 'A does work in 10d, B in 20d. Together?', '7', '5', '8', '6.7', 'D', 1, '6.7 days', 10),
(3584, 151, 'CP = 237, Profit = 24%. Find SP.', '283.88', '303.88', '293.88', '313.88', 'C', 1, 'SP = CP + Profit = 237 + 56.88 = 293.88', 11),
(3585, 151, 'What is 79% of 710 (approx)?', '561', '581', '541', '1122', 'A', 1, '79% of 710 = 561', 12),
(3586, 151, 'Ratio A:B is 3:1. Total 196. Find A.', '142', '147', '152', '196', 'B', 1, 'A = 3/(3+1) * 196 = 147', 13),
(3587, 151, 'CP = 230, Profit = 16%. Find SP.', '256.8', '276.8', '266.8', '286.8', 'C', 1, 'SP = CP + Profit = 230 + 36.8 = 266.8', 14),
(3588, 151, 'Ratio A:B is 3:5. Total 200. Find A.', '70', '75', '80', '200', 'B', 1, 'A = 3/(3+5) * 200 = 75', 15),
(3589, 151, 'A does work in 11d, B in 22d. Together?', '8', '6', '9', '7.3', 'D', 1, '7.3 days', 16),
(3590, 151, 'CP = 388, Profit = 25%. Find SP.', '475', '495', '485', '505', 'C', 1, 'SP = CP + Profit = 388 + 97 = 485', 17),
(3591, 151, 'Speed 60 km/h, Time 2 hr. Dist?', '110', '120', '130', '140', 'B', 1, '120 km', 18),
(3592, 151, 'What is 27% of 990 (approx)?', '267', '287', '247', '534', 'A', 1, '27% of 990 = 267', 19),
(3593, 151, 'Sum of 78 and 16?', '84', '104', '94', '194', 'C', 1, '78 + 16 = 94', 20),
(3594, 151, 'Bag has 3 Red, 4 Blue balls. Prob of picking Red?', '3/7', '4/7', '1/7', '1/2', 'A', 1, 'Total balls = 7. Red balls = 3. P(Red) = 3/7.', 21),
(3595, 151, 'Speed 47 km/h, Time 2 hr. Dist?', '84', '94', '104', '114', 'B', 1, '94 km', 22),
(3596, 151, 'What is 54% of 709 (approx)?', '383', '403', '363', '766', 'A', 1, '54% of 709 = 383', 23),
(3597, 151, 'Bag has 2 Red, 4 Blue balls. Prob of picking Red?', '2/6', '4/6', '1/6', '1/2', 'A', 1, 'Total balls = 6. Red balls = 2. P(Red) = 2/6.', 24),
(3598, 151, 'A does work in 6d, B in 12d. Together?', '5', '3', '6', '4.0', 'D', 1, '4.0 days', 25),
(3599, 151, 'A does work in 7d, B in 14d. Together?', '5', '3', '6', '4.7', 'D', 1, '4.7 days', 26),
(3600, 152, 'A man walks 5km North, then 5km South. Where is he from start?', '10km North', '5km North', 'At start', '5km South', 'C', 1, 'Went up 5, came down 5. Back to origin.', 1),
(3601, 152, 'Series: 4, 9, 14, 19, ?', '24', '25', '26', '23', 'A', 1, '+5', 2),
(3602, 152, 'If today is Monday, what day is after 7 days?', 'Monday', 'Tuesday', 'Sunday', 'Wednesday', 'A', 1, 'Week repeats every 7 days.', 3),
(3603, 152, 'Series: 2, 4, 8, 16, ?', '30', '32', '34', '36', 'B', 1, 'x2', 4),
(3604, 152, 'Series: 2, 4, 8, 16, ?', '30', '32', '34', '36', 'B', 1, 'x2', 5),
(3605, 152, 'Series: 4, 8, 16, 32, ?', '62', '64', '66', '68', 'B', 1, 'x2', 6),
(3606, 152, 'A man walks 5km North, then 5km South. Where is he from start?', '10km North', '5km North', 'At start', '5km South', 'C', 1, 'Went up 5, came down 5. Back to origin.', 7),
(3607, 152, 'Series: 4, 8, 16, 32, ?', '62', '64', '66', '68', 'B', 1, 'x2', 8),
(3608, 152, 'Series: 3, 5, 7, 9, ?', '11', '12', '13', '10', 'A', 1, '+2', 9),
(3609, 152, 'Series: 3, 6, 12, 24, ?', '46', '48', '50', '52', 'B', 1, 'x2', 10),
(3610, 152, 'Series: 3, 6, 12, 24, ?', '46', '48', '50', '52', 'B', 1, 'x2', 11),
(3611, 152, 'If today is Monday, what day is after 7 days?', 'Monday', 'Tuesday', 'Sunday', 'Wednesday', 'A', 1, 'Week repeats every 7 days.', 12),
(3612, 152, 'A man walks 5km North, then 5km South. Where is he from start?', '10km North', '5km North', 'At start', '5km South', 'C', 1, 'Went up 5, came down 5. Back to origin.', 13),
(3613, 152, 'Series: 4, 9, 14, 19, ?', '24', '25', '26', '23', 'A', 1, '+5', 14),
(3614, 152, 'A man walks 5km North, then 5km South. Where is he from start?', '10km North', '5km North', 'At start', '5km South', 'C', 1, 'Went up 5, came down 5. Back to origin.', 15),
(3615, 152, 'Series: 4, 8, 16, 32, ?', '62', '64', '66', '68', 'B', 1, 'x2', 16),
(3616, 152, 'If today is Monday, what day is after 7 days?', 'Monday', 'Tuesday', 'Sunday', 'Wednesday', 'A', 1, 'Week repeats every 7 days.', 17),
(3617, 152, 'A man walks 5km North, then 5km South. Where is he from start?', '10km North', '5km North', 'At start', '5km South', 'C', 1, 'Went up 5, came down 5. Back to origin.', 18),
(3618, 152, 'Series: 3, 6, 12, 24, ?', '46', '48', '50', '52', 'B', 1, 'x2', 19),
(3619, 152, 'If today is Monday, what day is after 7 days?', 'Monday', 'Tuesday', 'Sunday', 'Wednesday', 'A', 1, 'Week repeats every 7 days.', 20),
(3620, 152, 'A man walks 5km North, then 5km South. Where is he from start?', '10km North', '5km North', 'At start', '5km South', 'C', 1, 'Went up 5, came down 5. Back to origin.', 21),
(3621, 152, 'Series: 2, 4, 8, 16, ?', '30', '32', '34', '36', 'B', 1, 'x2', 22),
(3622, 152, 'Series: 2, 4, 8, 16, ?', '30', '32', '34', '36', 'B', 1, 'x2', 23),
(3623, 152, 'If today is Monday, what day is after 7 days?', 'Monday', 'Tuesday', 'Sunday', 'Wednesday', 'A', 1, 'Week repeats every 7 days.', 24),
(3624, 152, 'If today is Monday, what day is after 7 days?', 'Monday', 'Tuesday', 'Sunday', 'Wednesday', 'A', 1, 'Week repeats every 7 days.', 25),
(3625, 152, 'If today is Monday, what day is after 7 days?', 'Monday', 'Tuesday', 'Sunday', 'Wednesday', 'A', 1, 'Week repeats every 7 days.', 26),
(3626, 153, 'A man walks 5km North, then 5km South. Where is he from start?', '10km North', '5km North', 'At start', '5km South', 'C', 1, 'Went up 5, came down 5. Back to origin.', 1),
(3627, 153, 'Series: 6, 11, 16, 21, ?', '26', '27', '28', '25', 'A', 1, '+5', 2),
(3628, 153, 'If today is Monday, what day is after 7 days?', 'Monday', 'Tuesday', 'Sunday', 'Wednesday', 'A', 1, 'Week repeats every 7 days.', 3),
(3629, 153, 'If today is Monday, what day is after 7 days?', 'Monday', 'Tuesday', 'Sunday', 'Wednesday', 'A', 1, 'Week repeats every 7 days.', 4),
(3630, 153, 'Series: 10, 12, 14, 16, ?', '18', '19', '20', '17', 'A', 1, '+2', 5),
(3631, 153, 'Series: 8, 11, 14, 17, ?', '20', '21', '22', '19', 'A', 1, '+3', 6),
(3632, 153, 'Series: 3, 6, 12, 24, ?', '46', '48', '50', '52', 'B', 1, 'x2', 7),
(3633, 153, 'Series: 1, 4, 7, 10, ?', '13', '14', '15', '12', 'A', 1, '+3', 8),
(3634, 153, 'Series: 4, 8, 12, 16, ?', '20', '21', '22', '19', 'A', 1, '+4', 9),
(3635, 153, 'Series: 4, 8, 16, 32, ?', '62', '64', '66', '68', 'B', 1, 'x2', 10),
(3636, 153, 'Series: 5, 7, 9, 11, ?', '13', '14', '15', '12', 'A', 1, '+2', 11),
(3637, 153, 'A man walks 5km North, then 5km South. Where is he from start?', '10km North', '5km North', 'At start', '5km South', 'C', 1, 'Went up 5, came down 5. Back to origin.', 12),
(3638, 153, 'A man walks 5km North, then 5km South. Where is he from start?', '10km North', '5km North', 'At start', '5km South', 'C', 1, 'Went up 5, came down 5. Back to origin.', 13),
(3639, 153, 'Series: 4, 8, 16, 32, ?', '62', '64', '66', '68', 'B', 1, 'x2', 14),
(3640, 153, 'If today is Monday, what day is after 7 days?', 'Monday', 'Tuesday', 'Sunday', 'Wednesday', 'A', 1, 'Week repeats every 7 days.', 15),
(3641, 153, 'Series: 2, 4, 8, 16, ?', '30', '32', '34', '36', 'B', 1, 'x2', 16),
(3642, 153, 'Series: 3, 7, 11, 15, ?', '19', '20', '21', '18', 'A', 1, '+4', 17),
(3643, 153, 'If today is Monday, what day is after 7 days?', 'Monday', 'Tuesday', 'Sunday', 'Wednesday', 'A', 1, 'Week repeats every 7 days.', 18),
(3644, 153, 'A man walks 5km North, then 5km South. Where is he from start?', '10km North', '5km North', 'At start', '5km South', 'C', 1, 'Went up 5, came down 5. Back to origin.', 19),
(3645, 153, 'Series: 5, 9, 13, 17, ?', '21', '22', '23', '20', 'A', 1, '+4', 20),
(3646, 153, 'Series: 3, 6, 12, 24, ?', '46', '48', '50', '52', 'B', 1, 'x2', 21),
(3647, 153, 'If today is Monday, what day is after 7 days?', 'Monday', 'Tuesday', 'Sunday', 'Wednesday', 'A', 1, 'Week repeats every 7 days.', 22),
(3648, 153, 'A man walks 5km North, then 5km South. Where is he from start?', '10km North', '5km North', 'At start', '5km South', 'C', 1, 'Went up 5, came down 5. Back to origin.', 23),
(3649, 153, 'Series: 5, 10, 15, 20, ?', '25', '26', '27', '24', 'A', 1, '+5', 24),
(3650, 153, 'Series: 3, 6, 12, 24, ?', '46', '48', '50', '52', 'B', 1, 'x2', 25),
(3651, 153, 'A man walks 5km North, then 5km South. Where is he from start?', '10km North', '5km North', 'At start', '5km South', 'C', 1, 'Went up 5, came down 5. Back to origin.', 26),
(3652, 154, 'A man walks 5km North, then 5km South. Where is he from start?', '10km North', '5km North', 'At start', '5km South', 'C', 1, 'Went up 5, came down 5. Back to origin.', 1),
(3653, 154, 'Series: 4, 8, 16, 32, ?', '62', '64', '66', '68', 'B', 1, 'x2', 2),
(3654, 154, 'Series: 3, 6, 12, 24, ?', '46', '48', '50', '52', 'B', 1, 'x2', 3),
(3655, 154, 'If today is Monday, what day is after 7 days?', 'Monday', 'Tuesday', 'Sunday', 'Wednesday', 'A', 1, 'Week repeats every 7 days.', 4),
(3656, 154, 'Series: 2, 4, 8, 16, ?', '30', '32', '34', '36', 'B', 1, 'x2', 5),
(3657, 154, 'Series: 8, 11, 14, 17, ?', '20', '21', '22', '19', 'A', 1, '+3', 6),
(3658, 154, 'If today is Monday, what day is after 7 days?', 'Monday', 'Tuesday', 'Sunday', 'Wednesday', 'A', 1, 'Week repeats every 7 days.', 7),
(3659, 154, 'If today is Monday, what day is after 7 days?', 'Monday', 'Tuesday', 'Sunday', 'Wednesday', 'A', 1, 'Week repeats every 7 days.', 8),
(3660, 154, 'Series: 1, 5, 9, 13, ?', '17', '18', '19', '16', 'A', 1, '+4', 9),
(3661, 154, 'Series: 4, 9, 14, 19, ?', '24', '25', '26', '23', 'A', 1, '+5', 10),
(3662, 154, 'Series: 7, 11, 15, 19, ?', '23', '24', '25', '22', 'A', 1, '+4', 11),
(3663, 154, 'Series: 10, 12, 14, 16, ?', '18', '19', '20', '17', 'A', 1, '+2', 12),
(3664, 154, 'A man walks 5km North, then 5km South. Where is he from start?', '10km North', '5km North', 'At start', '5km South', 'C', 1, 'Went up 5, came down 5. Back to origin.', 13),
(3665, 154, 'Series: 2, 4, 8, 16, ?', '30', '32', '34', '36', 'B', 1, 'x2', 14),
(3666, 154, 'Series: 2, 4, 8, 16, ?', '30', '32', '34', '36', 'B', 1, 'x2', 15),
(3667, 154, 'Series: 3, 6, 12, 24, ?', '46', '48', '50', '52', 'B', 1, 'x2', 16),
(3668, 154, 'A man walks 5km North, then 5km South. Where is he from start?', '10km North', '5km North', 'At start', '5km South', 'C', 1, 'Went up 5, came down 5. Back to origin.', 17),
(3669, 154, 'Series: 2, 4, 8, 16, ?', '30', '32', '34', '36', 'B', 1, 'x2', 18),
(3670, 154, 'A man walks 5km North, then 5km South. Where is he from start?', '10km North', '5km North', 'At start', '5km South', 'C', 1, 'Went up 5, came down 5. Back to origin.', 19),
(3671, 154, 'Series: 7, 9, 11, 13, ?', '15', '16', '17', '14', 'A', 1, '+2', 20),
(3672, 154, 'A man walks 5km North, then 5km South. Where is he from start?', '10km North', '5km North', 'At start', '5km South', 'C', 1, 'Went up 5, came down 5. Back to origin.', 21),
(3673, 154, 'A man walks 5km North, then 5km South. Where is he from start?', '10km North', '5km North', 'At start', '5km South', 'C', 1, 'Went up 5, came down 5. Back to origin.', 22),
(3674, 154, 'Series: 8, 11, 14, 17, ?', '20', '21', '22', '19', 'A', 1, '+3', 23),
(3675, 154, 'Series: 4, 8, 16, 32, ?', '62', '64', '66', '68', 'B', 1, 'x2', 24),
(3676, 154, 'Series: 8, 11, 14, 17, ?', '20', '21', '22', '19', 'A', 1, '+3', 25),
(3677, 154, 'If today is Monday, what day is after 7 days?', 'Monday', 'Tuesday', 'Sunday', 'Wednesday', 'A', 1, 'Week repeats every 7 days.', 26),
(3678, 155, 'Series: 3, 6, 9, 12, ?', '15', '16', '17', '14', 'A', 1, '+3', 1),
(3679, 155, 'Series: 2, 4, 8, 16, ?', '30', '32', '34', '36', 'B', 1, 'x2', 2),
(3680, 155, 'Series: 3, 5, 7, 9, ?', '11', '12', '13', '10', 'A', 1, '+2', 3),
(3681, 155, 'Series: 3, 6, 12, 24, ?', '46', '48', '50', '52', 'B', 1, 'x2', 4),
(3682, 155, 'If today is Monday, what day is after 7 days?', 'Monday', 'Tuesday', 'Sunday', 'Wednesday', 'A', 1, 'Week repeats every 7 days.', 5),
(3683, 155, 'Series: 2, 4, 8, 16, ?', '30', '32', '34', '36', 'B', 1, 'x2', 6),
(3684, 155, 'If today is Monday, what day is after 7 days?', 'Monday', 'Tuesday', 'Sunday', 'Wednesday', 'A', 1, 'Week repeats every 7 days.', 7),
(3685, 155, 'If today is Monday, what day is after 7 days?', 'Monday', 'Tuesday', 'Sunday', 'Wednesday', 'A', 1, 'Week repeats every 7 days.', 8),
(3686, 155, 'A man walks 5km North, then 5km South. Where is he from start?', '10km North', '5km North', 'At start', '5km South', 'C', 1, 'Went up 5, came down 5. Back to origin.', 9),
(3687, 155, 'Series: 2, 4, 6, 8, ?', '10', '11', '12', '9', 'A', 1, '+2', 10),
(3688, 155, 'If today is Monday, what day is after 7 days?', 'Monday', 'Tuesday', 'Sunday', 'Wednesday', 'A', 1, 'Week repeats every 7 days.', 11),
(3689, 155, 'A man walks 5km North, then 5km South. Where is he from start?', '10km North', '5km North', 'At start', '5km South', 'C', 1, 'Went up 5, came down 5. Back to origin.', 12),
(3690, 155, 'Series: 3, 6, 12, 24, ?', '46', '48', '50', '52', 'B', 1, 'x2', 13),
(3691, 155, 'Series: 3, 6, 12, 24, ?', '46', '48', '50', '52', 'B', 1, 'x2', 14),
(3692, 155, 'Series: 10, 15, 20, 25, ?', '30', '31', '32', '29', 'A', 1, '+5', 15),
(3693, 155, 'Series: 6, 9, 12, 15, ?', '18', '19', '20', '17', 'A', 1, '+3', 16),
(3694, 155, 'If today is Monday, what day is after 7 days?', 'Monday', 'Tuesday', 'Sunday', 'Wednesday', 'A', 1, 'Week repeats every 7 days.', 17),
(3695, 155, 'Series: 6, 11, 16, 21, ?', '26', '27', '28', '25', 'A', 1, '+5', 18),
(3696, 155, 'If today is Monday, what day is after 7 days?', 'Monday', 'Tuesday', 'Sunday', 'Wednesday', 'A', 1, 'Week repeats every 7 days.', 19),
(3697, 155, 'Series: 10, 12, 14, 16, ?', '18', '19', '20', '17', 'A', 1, '+2', 20),
(3698, 155, 'Series: 4, 8, 16, 32, ?', '62', '64', '66', '68', 'B', 1, 'x2', 21),
(3699, 155, 'A man walks 5km North, then 5km South. Where is he from start?', '10km North', '5km North', 'At start', '5km South', 'C', 1, 'Went up 5, came down 5. Back to origin.', 22),
(3700, 155, 'If today is Monday, what day is after 7 days?', 'Monday', 'Tuesday', 'Sunday', 'Wednesday', 'A', 1, 'Week repeats every 7 days.', 23),
(3701, 155, 'If today is Monday, what day is after 7 days?', 'Monday', 'Tuesday', 'Sunday', 'Wednesday', 'A', 1, 'Week repeats every 7 days.', 24),
(3702, 155, 'A man walks 5km North, then 5km South. Where is he from start?', '10km North', '5km North', 'At start', '5km South', 'C', 1, 'Went up 5, came down 5. Back to origin.', 25),
(3703, 155, 'A man walks 5km North, then 5km South. Where is he from start?', '10km North', '5km North', 'At start', '5km South', 'C', 1, 'Went up 5, came down 5. Back to origin.', 26),
(3704, 156, 'A man walks 5km North, then 5km South. Where is he from start?', '10km North', '5km North', 'At start', '5km South', 'C', 1, 'Went up 5, came down 5. Back to origin.', 1),
(3705, 156, 'A man walks 5km North, then 5km South. Where is he from start?', '10km North', '5km North', 'At start', '5km South', 'C', 1, 'Went up 5, came down 5. Back to origin.', 2),
(3706, 156, 'Series: 1, 3, 5, 7, ?', '9', '10', '11', '8', 'A', 1, '+2', 3),
(3707, 156, 'A man walks 5km North, then 5km South. Where is he from start?', '10km North', '5km North', 'At start', '5km South', 'C', 1, 'Went up 5, came down 5. Back to origin.', 4),
(3708, 156, 'A man walks 5km North, then 5km South. Where is he from start?', '10km North', '5km North', 'At start', '5km South', 'C', 1, 'Went up 5, came down 5. Back to origin.', 5),
(3709, 156, 'A man walks 5km North, then 5km South. Where is he from start?', '10km North', '5km North', 'At start', '5km South', 'C', 1, 'Went up 5, came down 5. Back to origin.', 6),
(3710, 156, 'If today is Monday, what day is after 7 days?', 'Monday', 'Tuesday', 'Sunday', 'Wednesday', 'A', 1, 'Week repeats every 7 days.', 7),
(3711, 156, 'If today is Monday, what day is after 7 days?', 'Monday', 'Tuesday', 'Sunday', 'Wednesday', 'A', 1, 'Week repeats every 7 days.', 8),
(3712, 156, 'Series: 1, 6, 11, 16, ?', '21', '22', '23', '20', 'A', 1, '+5', 9),
(3713, 156, 'A man walks 5km North, then 5km South. Where is he from start?', '10km North', '5km North', 'At start', '5km South', 'C', 1, 'Went up 5, came down 5. Back to origin.', 10),
(3714, 156, 'A man walks 5km North, then 5km South. Where is he from start?', '10km North', '5km North', 'At start', '5km South', 'C', 1, 'Went up 5, came down 5. Back to origin.', 11),
(3715, 156, 'If today is Monday, what day is after 7 days?', 'Monday', 'Tuesday', 'Sunday', 'Wednesday', 'A', 1, 'Week repeats every 7 days.', 12),
(3716, 156, 'If today is Monday, what day is after 7 days?', 'Monday', 'Tuesday', 'Sunday', 'Wednesday', 'A', 1, 'Week repeats every 7 days.', 13),
(3717, 156, 'A man walks 5km North, then 5km South. Where is he from start?', '10km North', '5km North', 'At start', '5km South', 'C', 1, 'Went up 5, came down 5. Back to origin.', 14),
(3718, 156, 'Series: 10, 12, 14, 16, ?', '18', '19', '20', '17', 'A', 1, '+2', 15),
(3719, 156, 'A man walks 5km North, then 5km South. Where is he from start?', '10km North', '5km North', 'At start', '5km South', 'C', 1, 'Went up 5, came down 5. Back to origin.', 16),
(3720, 156, 'A man walks 5km North, then 5km South. Where is he from start?', '10km North', '5km North', 'At start', '5km South', 'C', 1, 'Went up 5, came down 5. Back to origin.', 17),
(3721, 156, 'Series: 3, 6, 12, 24, ?', '46', '48', '50', '52', 'B', 1, 'x2', 18),
(3722, 156, 'A man walks 5km North, then 5km South. Where is he from start?', '10km North', '5km North', 'At start', '5km South', 'C', 1, 'Went up 5, came down 5. Back to origin.', 19),
(3723, 156, 'If today is Monday, what day is after 7 days?', 'Monday', 'Tuesday', 'Sunday', 'Wednesday', 'A', 1, 'Week repeats every 7 days.', 20),
(3724, 156, 'If today is Monday, what day is after 7 days?', 'Monday', 'Tuesday', 'Sunday', 'Wednesday', 'A', 1, 'Week repeats every 7 days.', 21),
(3725, 156, 'Series: 4, 8, 16, 32, ?', '62', '64', '66', '68', 'B', 1, 'x2', 22),
(3726, 156, 'If today is Monday, what day is after 7 days?', 'Monday', 'Tuesday', 'Sunday', 'Wednesday', 'A', 1, 'Week repeats every 7 days.', 23),
(3727, 156, 'Series: 10, 13, 16, 19, ?', '22', '23', '24', '21', 'A', 1, '+3', 24),
(3728, 156, 'If today is Monday, what day is after 7 days?', 'Monday', 'Tuesday', 'Sunday', 'Wednesday', 'A', 1, 'Week repeats every 7 days.', 25),
(3729, 156, 'A man walks 5km North, then 5km South. Where is he from start?', '10km North', '5km North', 'At start', '5km South', 'C', 1, 'Went up 5, came down 5. Back to origin.', 26),
(3730, 157, 'To \'Spill the beans\' means to?', 'Cook', 'Reveal secret', 'Drop food', 'Plant seeds', 'B', 1, 'Reveal a secret.', 1),
(3731, 157, 'Synonym of \'Abundant\'?', 'Scarce', 'Plentiful', 'Empty', 'Rare', 'B', 1, 'Abundant means plentiful.', 2),
(3732, 157, 'Antonym of \'Brave\'?', 'Cowardly', 'Strong', 'Bold', 'Heroic', 'A', 1, 'Opposite of brave is cowardly.', 3),
(3733, 157, 'One who writes books?', 'Author', 'Reader', 'Editor', 'Publisher', 'A', 1, 'Author.', 4),
(3734, 157, 'Synonym of \'Happy\'?', 'Sad', 'Joyful', 'Angry', 'Tired', 'B', 1, 'Joyful.', 5),
(3735, 157, '\'Break a leg\' means:', 'Get hurt', 'Good luck', 'Dance', 'Fall down', 'B', 1, 'Good luck.', 6),
(3736, 157, 'Choose correct spelling:', 'Recieve', 'Receive', 'Riceive', 'Receve', 'B', 1, 'Receive.', 7),
(3737, 157, 'One who loves books?', 'Bibliophile', 'Anglophile', 'Technophile', 'Pedophile', 'A', 1, 'Bibliophile.', 8),
(3738, 157, 'Antonym of \'Fast\'?', 'Quick', 'Slow', 'Rapid', 'Swift', 'B', 1, 'Slow.', 9),
(3739, 157, 'Meaning of \'Once in a blue moon\'?', 'Frequently', 'Rarely', 'Daily', 'Monthly', 'B', 1, 'Very rarely.', 10),
(3740, 157, 'Past tense of \'Run\'?', 'Runner', 'Ran', 'Runned', 'Running', 'B', 1, 'Ran.', 11),
(3741, 157, 'Plural of \'Child\'?', 'Childs', 'Children', 'Childrens', 'Childes', 'B', 1, 'Children.', 12),
(3742, 157, '\'Piece of cake\' means:', 'Tasty', 'Hard', 'Easy', 'Dessert', 'C', 1, 'Easy task.', 13),
(3743, 157, 'Correct spelling:', 'Neccessary', 'Necessary', 'Necesary', 'Neccesary', 'B', 1, 'Necessary.', 14),
(3744, 157, 'To \'Spill the beans\' means to?', 'Cook', 'Reveal secret', 'Drop food', 'Plant seeds', 'B', 1, 'Reveal a secret.', 15),
(3745, 157, 'Synonym of \'Abundant\'?', 'Scarce', 'Plentiful', 'Empty', 'Rare', 'B', 1, 'Abundant means plentiful.', 16),
(3746, 157, 'Antonym of \'Brave\'?', 'Cowardly', 'Strong', 'Bold', 'Heroic', 'A', 1, 'Opposite of brave is cowardly.', 17),
(3747, 157, 'One who writes books?', 'Author', 'Reader', 'Editor', 'Publisher', 'A', 1, 'Author.', 18),
(3748, 157, 'Synonym of \'Happy\'?', 'Sad', 'Joyful', 'Angry', 'Tired', 'B', 1, 'Joyful.', 19),
(3749, 157, '\'Break a leg\' means:', 'Get hurt', 'Good luck', 'Dance', 'Fall down', 'B', 1, 'Good luck.', 20),
(3750, 157, 'Choose correct spelling:', 'Recieve', 'Receive', 'Riceive', 'Receve', 'B', 1, 'Receive.', 21),
(3751, 157, 'One who loves books?', 'Bibliophile', 'Anglophile', 'Technophile', 'Pedophile', 'A', 1, 'Bibliophile.', 22),
(3752, 157, 'Antonym of \'Fast\'?', 'Quick', 'Slow', 'Rapid', 'Swift', 'B', 1, 'Slow.', 23),
(3753, 157, 'Meaning of \'Once in a blue moon\'?', 'Frequently', 'Rarely', 'Daily', 'Monthly', 'B', 1, 'Very rarely.', 24),
(3754, 157, 'Past tense of \'Run\'?', 'Runner', 'Ran', 'Runned', 'Running', 'B', 1, 'Ran.', 25),
(3755, 157, 'Plural of \'Child\'?', 'Childs', 'Children', 'Childrens', 'Childes', 'B', 1, 'Children.', 26),
(3756, 158, 'One who loves books?', 'Bibliophile', 'Anglophile', 'Technophile', 'Pedophile', 'A', 1, 'Bibliophile.', 1),
(3757, 158, 'Choose correct spelling:', 'Recieve', 'Receive', 'Riceive', 'Receve', 'B', 1, 'Receive.', 2),
(3758, 158, '\'Break a leg\' means:', 'Get hurt', 'Good luck', 'Dance', 'Fall down', 'B', 1, 'Good luck.', 3),
(3759, 158, 'Correct spelling:', 'Neccessary', 'Necessary', 'Necesary', 'Neccesary', 'B', 1, 'Necessary.', 4),
(3760, 158, 'To \'Spill the beans\' means to?', 'Cook', 'Reveal secret', 'Drop food', 'Plant seeds', 'B', 1, 'Reveal a secret.', 5),
(3761, 158, 'Meaning of \'Once in a blue moon\'?', 'Frequently', 'Rarely', 'Daily', 'Monthly', 'B', 1, 'Very rarely.', 6),
(3762, 158, 'Past tense of \'Run\'?', 'Runner', 'Ran', 'Runned', 'Running', 'B', 1, 'Ran.', 7),
(3763, 158, 'Antonym of \'Fast\'?', 'Quick', 'Slow', 'Rapid', 'Swift', 'B', 1, 'Slow.', 8),
(3764, 158, 'Synonym of \'Happy\'?', 'Sad', 'Joyful', 'Angry', 'Tired', 'B', 1, 'Joyful.', 9),
(3765, 158, 'Antonym of \'Brave\'?', 'Cowardly', 'Strong', 'Bold', 'Heroic', 'A', 1, 'Opposite of brave is cowardly.', 10),
(3766, 158, '\'Piece of cake\' means:', 'Tasty', 'Hard', 'Easy', 'Dessert', 'C', 1, 'Easy task.', 11),
(3767, 158, 'Plural of \'Child\'?', 'Childs', 'Children', 'Childrens', 'Childes', 'B', 1, 'Children.', 12),
(3768, 158, 'One who writes books?', 'Author', 'Reader', 'Editor', 'Publisher', 'A', 1, 'Author.', 13);
INSERT INTO `aptitudequestions` (`id`, `testId`, `question`, `optionA`, `optionB`, `optionC`, `optionD`, `correctOption`, `marks`, `explanation`, `orderIndex`) VALUES
(3769, 158, 'Synonym of \'Abundant\'?', 'Scarce', 'Plentiful', 'Empty', 'Rare', 'B', 1, 'Abundant means plentiful.', 14),
(3770, 158, 'One who loves books?', 'Bibliophile', 'Anglophile', 'Technophile', 'Pedophile', 'A', 1, 'Bibliophile.', 15),
(3771, 158, 'Choose correct spelling:', 'Recieve', 'Receive', 'Riceive', 'Receve', 'B', 1, 'Receive.', 16),
(3772, 158, '\'Break a leg\' means:', 'Get hurt', 'Good luck', 'Dance', 'Fall down', 'B', 1, 'Good luck.', 17),
(3773, 158, 'Correct spelling:', 'Neccessary', 'Necessary', 'Necesary', 'Neccesary', 'B', 1, 'Necessary.', 18),
(3774, 158, 'To \'Spill the beans\' means to?', 'Cook', 'Reveal secret', 'Drop food', 'Plant seeds', 'B', 1, 'Reveal a secret.', 19),
(3775, 158, 'Meaning of \'Once in a blue moon\'?', 'Frequently', 'Rarely', 'Daily', 'Monthly', 'B', 1, 'Very rarely.', 20),
(3776, 158, 'Past tense of \'Run\'?', 'Runner', 'Ran', 'Runned', 'Running', 'B', 1, 'Ran.', 21),
(3777, 158, 'Antonym of \'Fast\'?', 'Quick', 'Slow', 'Rapid', 'Swift', 'B', 1, 'Slow.', 22),
(3778, 158, 'Synonym of \'Happy\'?', 'Sad', 'Joyful', 'Angry', 'Tired', 'B', 1, 'Joyful.', 23),
(3779, 158, 'Antonym of \'Brave\'?', 'Cowardly', 'Strong', 'Bold', 'Heroic', 'A', 1, 'Opposite of brave is cowardly.', 24),
(3780, 158, '\'Piece of cake\' means:', 'Tasty', 'Hard', 'Easy', 'Dessert', 'C', 1, 'Easy task.', 25),
(3781, 158, 'Plural of \'Child\'?', 'Childs', 'Children', 'Childrens', 'Childes', 'B', 1, 'Children.', 26),
(3782, 159, 'Synonym of \'Happy\'?', 'Sad', 'Joyful', 'Angry', 'Tired', 'B', 1, 'Joyful.', 1),
(3783, 159, '\'Piece of cake\' means:', 'Tasty', 'Hard', 'Easy', 'Dessert', 'C', 1, 'Easy task.', 2),
(3784, 159, 'Antonym of \'Fast\'?', 'Quick', 'Slow', 'Rapid', 'Swift', 'B', 1, 'Slow.', 3),
(3785, 159, 'Past tense of \'Run\'?', 'Runner', 'Ran', 'Runned', 'Running', 'B', 1, 'Ran.', 4),
(3786, 159, 'Meaning of \'Once in a blue moon\'?', 'Frequently', 'Rarely', 'Daily', 'Monthly', 'B', 1, 'Very rarely.', 5),
(3787, 159, 'One who loves books?', 'Bibliophile', 'Anglophile', 'Technophile', 'Pedophile', 'A', 1, 'Bibliophile.', 6),
(3788, 159, 'Plural of \'Child\'?', 'Childs', 'Children', 'Childrens', 'Childes', 'B', 1, 'Children.', 7),
(3789, 159, 'To \'Spill the beans\' means to?', 'Cook', 'Reveal secret', 'Drop food', 'Plant seeds', 'B', 1, 'Reveal a secret.', 8),
(3790, 159, 'Antonym of \'Brave\'?', 'Cowardly', 'Strong', 'Bold', 'Heroic', 'A', 1, 'Opposite of brave is cowardly.', 9),
(3791, 159, 'Synonym of \'Abundant\'?', 'Scarce', 'Plentiful', 'Empty', 'Rare', 'B', 1, 'Abundant means plentiful.', 10),
(3792, 159, 'One who writes books?', 'Author', 'Reader', 'Editor', 'Publisher', 'A', 1, 'Author.', 11),
(3793, 159, 'Correct spelling:', 'Neccessary', 'Necessary', 'Necesary', 'Neccesary', 'B', 1, 'Necessary.', 12),
(3794, 159, '\'Break a leg\' means:', 'Get hurt', 'Good luck', 'Dance', 'Fall down', 'B', 1, 'Good luck.', 13),
(3795, 159, 'Choose correct spelling:', 'Recieve', 'Receive', 'Riceive', 'Receve', 'B', 1, 'Receive.', 14),
(3796, 159, 'Synonym of \'Happy\'?', 'Sad', 'Joyful', 'Angry', 'Tired', 'B', 1, 'Joyful.', 15),
(3797, 159, '\'Piece of cake\' means:', 'Tasty', 'Hard', 'Easy', 'Dessert', 'C', 1, 'Easy task.', 16),
(3798, 159, 'Antonym of \'Fast\'?', 'Quick', 'Slow', 'Rapid', 'Swift', 'B', 1, 'Slow.', 17),
(3799, 159, 'Past tense of \'Run\'?', 'Runner', 'Ran', 'Runned', 'Running', 'B', 1, 'Ran.', 18),
(3800, 159, 'Meaning of \'Once in a blue moon\'?', 'Frequently', 'Rarely', 'Daily', 'Monthly', 'B', 1, 'Very rarely.', 19),
(3801, 159, 'One who loves books?', 'Bibliophile', 'Anglophile', 'Technophile', 'Pedophile', 'A', 1, 'Bibliophile.', 20),
(3802, 159, 'Plural of \'Child\'?', 'Childs', 'Children', 'Childrens', 'Childes', 'B', 1, 'Children.', 21),
(3803, 159, 'To \'Spill the beans\' means to?', 'Cook', 'Reveal secret', 'Drop food', 'Plant seeds', 'B', 1, 'Reveal a secret.', 22),
(3804, 159, 'Antonym of \'Brave\'?', 'Cowardly', 'Strong', 'Bold', 'Heroic', 'A', 1, 'Opposite of brave is cowardly.', 23),
(3805, 159, 'Synonym of \'Abundant\'?', 'Scarce', 'Plentiful', 'Empty', 'Rare', 'B', 1, 'Abundant means plentiful.', 24),
(3806, 159, 'One who writes books?', 'Author', 'Reader', 'Editor', 'Publisher', 'A', 1, 'Author.', 25),
(3807, 159, 'Correct spelling:', 'Neccessary', 'Necessary', 'Necesary', 'Neccesary', 'B', 1, 'Necessary.', 26),
(3808, 160, 'Antonym of \'Brave\'?', 'Cowardly', 'Strong', 'Bold', 'Heroic', 'A', 1, 'Opposite of brave is cowardly.', 1),
(3809, 160, 'Correct spelling:', 'Neccessary', 'Necessary', 'Necesary', 'Neccesary', 'B', 1, 'Necessary.', 2),
(3810, 160, 'Synonym of \'Abundant\'?', 'Scarce', 'Plentiful', 'Empty', 'Rare', 'B', 1, 'Abundant means plentiful.', 3),
(3811, 160, 'One who loves books?', 'Bibliophile', 'Anglophile', 'Technophile', 'Pedophile', 'A', 1, 'Bibliophile.', 4),
(3812, 160, 'Synonym of \'Happy\'?', 'Sad', 'Joyful', 'Angry', 'Tired', 'B', 1, 'Joyful.', 5),
(3813, 160, 'Past tense of \'Run\'?', 'Runner', 'Ran', 'Runned', 'Running', 'B', 1, 'Ran.', 6),
(3814, 160, '\'Break a leg\' means:', 'Get hurt', 'Good luck', 'Dance', 'Fall down', 'B', 1, 'Good luck.', 7),
(3815, 160, 'Choose correct spelling:', 'Recieve', 'Receive', 'Riceive', 'Receve', 'B', 1, 'Receive.', 8),
(3816, 160, 'Meaning of \'Once in a blue moon\'?', 'Frequently', 'Rarely', 'Daily', 'Monthly', 'B', 1, 'Very rarely.', 9),
(3817, 160, 'Plural of \'Child\'?', 'Childs', 'Children', 'Childrens', 'Childes', 'B', 1, 'Children.', 10),
(3818, 160, 'To \'Spill the beans\' means to?', 'Cook', 'Reveal secret', 'Drop food', 'Plant seeds', 'B', 1, 'Reveal a secret.', 11),
(3819, 160, '\'Piece of cake\' means:', 'Tasty', 'Hard', 'Easy', 'Dessert', 'C', 1, 'Easy task.', 12),
(3820, 160, 'Antonym of \'Fast\'?', 'Quick', 'Slow', 'Rapid', 'Swift', 'B', 1, 'Slow.', 13),
(3821, 160, 'One who writes books?', 'Author', 'Reader', 'Editor', 'Publisher', 'A', 1, 'Author.', 14),
(3822, 160, 'Antonym of \'Brave\'?', 'Cowardly', 'Strong', 'Bold', 'Heroic', 'A', 1, 'Opposite of brave is cowardly.', 15),
(3823, 160, 'Correct spelling:', 'Neccessary', 'Necessary', 'Necesary', 'Neccesary', 'B', 1, 'Necessary.', 16),
(3824, 160, 'Synonym of \'Abundant\'?', 'Scarce', 'Plentiful', 'Empty', 'Rare', 'B', 1, 'Abundant means plentiful.', 17),
(3825, 160, 'One who loves books?', 'Bibliophile', 'Anglophile', 'Technophile', 'Pedophile', 'A', 1, 'Bibliophile.', 18),
(3826, 160, 'Synonym of \'Happy\'?', 'Sad', 'Joyful', 'Angry', 'Tired', 'B', 1, 'Joyful.', 19),
(3827, 160, 'Past tense of \'Run\'?', 'Runner', 'Ran', 'Runned', 'Running', 'B', 1, 'Ran.', 20),
(3828, 160, '\'Break a leg\' means:', 'Get hurt', 'Good luck', 'Dance', 'Fall down', 'B', 1, 'Good luck.', 21),
(3829, 160, 'Choose correct spelling:', 'Recieve', 'Receive', 'Riceive', 'Receve', 'B', 1, 'Receive.', 22),
(3830, 160, 'Meaning of \'Once in a blue moon\'?', 'Frequently', 'Rarely', 'Daily', 'Monthly', 'B', 1, 'Very rarely.', 23),
(3831, 160, 'Plural of \'Child\'?', 'Childs', 'Children', 'Childrens', 'Childes', 'B', 1, 'Children.', 24),
(3832, 160, 'To \'Spill the beans\' means to?', 'Cook', 'Reveal secret', 'Drop food', 'Plant seeds', 'B', 1, 'Reveal a secret.', 25),
(3833, 160, '\'Piece of cake\' means:', 'Tasty', 'Hard', 'Easy', 'Dessert', 'C', 1, 'Easy task.', 26),
(3834, 161, 'Antonym of \'Fast\'?', 'Quick', 'Slow', 'Rapid', 'Swift', 'B', 1, 'Slow.', 1),
(3835, 161, 'Synonym of \'Happy\'?', 'Sad', 'Joyful', 'Angry', 'Tired', 'B', 1, 'Joyful.', 2),
(3836, 161, 'Antonym of \'Brave\'?', 'Cowardly', 'Strong', 'Bold', 'Heroic', 'A', 1, 'Opposite of brave is cowardly.', 3),
(3837, 161, 'Synonym of \'Abundant\'?', 'Scarce', 'Plentiful', 'Empty', 'Rare', 'B', 1, 'Abundant means plentiful.', 4),
(3838, 161, '\'Break a leg\' means:', 'Get hurt', 'Good luck', 'Dance', 'Fall down', 'B', 1, 'Good luck.', 5),
(3839, 161, 'One who loves books?', 'Bibliophile', 'Anglophile', 'Technophile', 'Pedophile', 'A', 1, 'Bibliophile.', 6),
(3840, 161, 'Choose correct spelling:', 'Recieve', 'Receive', 'Riceive', 'Receve', 'B', 1, 'Receive.', 7),
(3841, 161, 'Correct spelling:', 'Neccessary', 'Necessary', 'Necesary', 'Neccesary', 'B', 1, 'Necessary.', 8),
(3842, 161, 'To \'Spill the beans\' means to?', 'Cook', 'Reveal secret', 'Drop food', 'Plant seeds', 'B', 1, 'Reveal a secret.', 9),
(3843, 161, 'Past tense of \'Run\'?', 'Runner', 'Ran', 'Runned', 'Running', 'B', 1, 'Ran.', 10),
(3844, 161, 'Plural of \'Child\'?', 'Childs', 'Children', 'Childrens', 'Childes', 'B', 1, 'Children.', 11),
(3845, 161, 'One who writes books?', 'Author', 'Reader', 'Editor', 'Publisher', 'A', 1, 'Author.', 12),
(3846, 161, 'Meaning of \'Once in a blue moon\'?', 'Frequently', 'Rarely', 'Daily', 'Monthly', 'B', 1, 'Very rarely.', 13),
(3847, 161, '\'Piece of cake\' means:', 'Tasty', 'Hard', 'Easy', 'Dessert', 'C', 1, 'Easy task.', 14),
(3848, 161, 'Antonym of \'Fast\'?', 'Quick', 'Slow', 'Rapid', 'Swift', 'B', 1, 'Slow.', 15),
(3849, 161, 'Synonym of \'Happy\'?', 'Sad', 'Joyful', 'Angry', 'Tired', 'B', 1, 'Joyful.', 16),
(3850, 161, 'Antonym of \'Brave\'?', 'Cowardly', 'Strong', 'Bold', 'Heroic', 'A', 1, 'Opposite of brave is cowardly.', 17),
(3851, 161, 'Synonym of \'Abundant\'?', 'Scarce', 'Plentiful', 'Empty', 'Rare', 'B', 1, 'Abundant means plentiful.', 18),
(3852, 161, '\'Break a leg\' means:', 'Get hurt', 'Good luck', 'Dance', 'Fall down', 'B', 1, 'Good luck.', 19),
(3853, 161, 'One who loves books?', 'Bibliophile', 'Anglophile', 'Technophile', 'Pedophile', 'A', 1, 'Bibliophile.', 20),
(3854, 161, 'Choose correct spelling:', 'Recieve', 'Receive', 'Riceive', 'Receve', 'B', 1, 'Receive.', 21),
(3855, 161, 'Correct spelling:', 'Neccessary', 'Necessary', 'Necesary', 'Neccesary', 'B', 1, 'Necessary.', 22),
(3856, 161, 'To \'Spill the beans\' means to?', 'Cook', 'Reveal secret', 'Drop food', 'Plant seeds', 'B', 1, 'Reveal a secret.', 23),
(3857, 161, 'Past tense of \'Run\'?', 'Runner', 'Ran', 'Runned', 'Running', 'B', 1, 'Ran.', 24),
(3858, 161, 'Plural of \'Child\'?', 'Childs', 'Children', 'Childrens', 'Childes', 'B', 1, 'Children.', 25),
(3859, 161, 'One who writes books?', 'Author', 'Reader', 'Editor', 'Publisher', 'A', 1, 'Author.', 26),
(3860, 162, 'RAM stands for?', 'Read Access Memory', 'Random Access Memory', 'Run All Memory', 'Read All Memory', 'B', 1, 'Random Access Memory.', 1),
(3861, 162, '1 Byte = ?', '4 bits', '8 bits', '16 bits', '32 bits', 'B', 1, '8 bits.', 2),
(3862, 162, 'Which is a loop?', 'If-Else', 'For', 'Switch', 'Break', 'B', 1, 'For loop.', 3),
(3863, 162, 'Google Chrome is a?', 'Search Engine', 'Browser', 'Server', 'OS', 'B', 1, 'Browser.', 4),
(3864, 162, 'SQL: Select * FROM Users WHERE...?', 'Update', 'Condition', 'Delete', 'Insert', 'B', 1, 'WHERE clause requires a condition.', 5),
(3865, 162, 'Data Structure: LIFO?', 'Queue', 'Stack', 'Tree', 'Graph', 'B', 1, 'Stack is Last In First Out.', 6),
(3866, 162, 'What is HTML?', 'Protocol', 'Language', 'Hardware', 'OS', 'B', 1, 'HyperText Markup Language.', 7),
(3867, 162, 'HTTPS uses which port?', '80', '443', '21', '25', 'B', 1, '443.', 8),
(3868, 162, 'CPU controls?', 'All input, output and processing', 'Only memory', 'Only power', 'Only network', 'A', 1, 'Central Processing Unit.', 9),
(3869, 162, 'Extension of Java file?', '.js', '.java', '.txt', '.class', 'B', 1, '.java.', 10),
(3870, 162, 'Array index starts at?', '1', '0', '-1', '2', 'B', 1, 'Usually 0.', 11),
(3871, 162, 'Binary Search Complexity?', 'O(n)', 'O(log n)', 'O(1)', 'O(n^2)', 'B', 1, 'O(log n).', 12),
(3872, 162, 'RAM stands for?', 'Read Access Memory', 'Random Access Memory', 'Run All Memory', 'Read All Memory', 'B', 1, 'Random Access Memory.', 13),
(3873, 162, '1 Byte = ?', '4 bits', '8 bits', '16 bits', '32 bits', 'B', 1, '8 bits.', 14),
(3874, 162, 'Which is a loop?', 'If-Else', 'For', 'Switch', 'Break', 'B', 1, 'For loop.', 15),
(3875, 162, 'Google Chrome is a?', 'Search Engine', 'Browser', 'Server', 'OS', 'B', 1, 'Browser.', 16),
(3876, 162, 'SQL: Select * FROM Users WHERE...?', 'Update', 'Condition', 'Delete', 'Insert', 'B', 1, 'WHERE clause requires a condition.', 17),
(3877, 162, 'Data Structure: LIFO?', 'Queue', 'Stack', 'Tree', 'Graph', 'B', 1, 'Stack is Last In First Out.', 18),
(3878, 162, 'What is HTML?', 'Protocol', 'Language', 'Hardware', 'OS', 'B', 1, 'HyperText Markup Language.', 19),
(3879, 162, 'HTTPS uses which port?', '80', '443', '21', '25', 'B', 1, '443.', 20),
(3880, 162, 'CPU controls?', 'All input, output and processing', 'Only memory', 'Only power', 'Only network', 'A', 1, 'Central Processing Unit.', 21),
(3881, 162, 'Extension of Java file?', '.js', '.java', '.txt', '.class', 'B', 1, '.java.', 22),
(3882, 162, 'Array index starts at?', '1', '0', '-1', '2', 'B', 1, 'Usually 0.', 23),
(3883, 162, 'Binary Search Complexity?', 'O(n)', 'O(log n)', 'O(1)', 'O(n^2)', 'B', 1, 'O(log n).', 24),
(3884, 162, 'RAM stands for?', 'Read Access Memory', 'Random Access Memory', 'Run All Memory', 'Read All Memory', 'B', 1, 'Random Access Memory.', 25),
(3885, 162, '1 Byte = ?', '4 bits', '8 bits', '16 bits', '32 bits', 'B', 1, '8 bits.', 26),
(3886, 163, 'Google Chrome is a?', 'Search Engine', 'Browser', 'Server', 'OS', 'B', 1, 'Browser.', 1),
(3887, 163, 'CPU controls?', 'All input, output and processing', 'Only memory', 'Only power', 'Only network', 'A', 1, 'Central Processing Unit.', 2),
(3888, 163, 'Data Structure: LIFO?', 'Queue', 'Stack', 'Tree', 'Graph', 'B', 1, 'Stack is Last In First Out.', 3),
(3889, 163, 'SQL: Select * FROM Users WHERE...?', 'Update', 'Condition', 'Delete', 'Insert', 'B', 1, 'WHERE clause requires a condition.', 4),
(3890, 163, 'Extension of Java file?', '.js', '.java', '.txt', '.class', 'B', 1, '.java.', 5),
(3891, 163, 'Array index starts at?', '1', '0', '-1', '2', 'B', 1, 'Usually 0.', 6),
(3892, 163, 'Binary Search Complexity?', 'O(n)', 'O(log n)', 'O(1)', 'O(n^2)', 'B', 1, 'O(log n).', 7),
(3893, 163, 'What is HTML?', 'Protocol', 'Language', 'Hardware', 'OS', 'B', 1, 'HyperText Markup Language.', 8),
(3894, 163, '1 Byte = ?', '4 bits', '8 bits', '16 bits', '32 bits', 'B', 1, '8 bits.', 9),
(3895, 163, 'HTTPS uses which port?', '80', '443', '21', '25', 'B', 1, '443.', 10),
(3896, 163, 'Which is a loop?', 'If-Else', 'For', 'Switch', 'Break', 'B', 1, 'For loop.', 11),
(3897, 163, 'RAM stands for?', 'Read Access Memory', 'Random Access Memory', 'Run All Memory', 'Read All Memory', 'B', 1, 'Random Access Memory.', 12),
(3898, 163, 'Google Chrome is a?', 'Search Engine', 'Browser', 'Server', 'OS', 'B', 1, 'Browser.', 13),
(3899, 163, 'CPU controls?', 'All input, output and processing', 'Only memory', 'Only power', 'Only network', 'A', 1, 'Central Processing Unit.', 14),
(3900, 163, 'Data Structure: LIFO?', 'Queue', 'Stack', 'Tree', 'Graph', 'B', 1, 'Stack is Last In First Out.', 15),
(3901, 163, 'SQL: Select * FROM Users WHERE...?', 'Update', 'Condition', 'Delete', 'Insert', 'B', 1, 'WHERE clause requires a condition.', 16),
(3902, 163, 'Extension of Java file?', '.js', '.java', '.txt', '.class', 'B', 1, '.java.', 17),
(3903, 163, 'Array index starts at?', '1', '0', '-1', '2', 'B', 1, 'Usually 0.', 18),
(3904, 163, 'Binary Search Complexity?', 'O(n)', 'O(log n)', 'O(1)', 'O(n^2)', 'B', 1, 'O(log n).', 19),
(3905, 163, 'What is HTML?', 'Protocol', 'Language', 'Hardware', 'OS', 'B', 1, 'HyperText Markup Language.', 20),
(3906, 163, '1 Byte = ?', '4 bits', '8 bits', '16 bits', '32 bits', 'B', 1, '8 bits.', 21),
(3907, 163, 'HTTPS uses which port?', '80', '443', '21', '25', 'B', 1, '443.', 22),
(3908, 163, 'Which is a loop?', 'If-Else', 'For', 'Switch', 'Break', 'B', 1, 'For loop.', 23),
(3909, 163, 'RAM stands for?', 'Read Access Memory', 'Random Access Memory', 'Run All Memory', 'Read All Memory', 'B', 1, 'Random Access Memory.', 24),
(3910, 163, 'Google Chrome is a?', 'Search Engine', 'Browser', 'Server', 'OS', 'B', 1, 'Browser.', 25),
(3911, 163, 'CPU controls?', 'All input, output and processing', 'Only memory', 'Only power', 'Only network', 'A', 1, 'Central Processing Unit.', 26),
(3912, 164, 'Binary Search Complexity?', 'O(n)', 'O(log n)', 'O(1)', 'O(n^2)', 'B', 1, 'O(log n).', 1),
(3913, 164, 'RAM stands for?', 'Read Access Memory', 'Random Access Memory', 'Run All Memory', 'Read All Memory', 'B', 1, 'Random Access Memory.', 2),
(3914, 164, 'What is HTML?', 'Protocol', 'Language', 'Hardware', 'OS', 'B', 1, 'HyperText Markup Language.', 3),
(3915, 164, 'SQL: Select * FROM Users WHERE...?', 'Update', 'Condition', 'Delete', 'Insert', 'B', 1, 'WHERE clause requires a condition.', 4),
(3916, 164, 'Google Chrome is a?', 'Search Engine', 'Browser', 'Server', 'OS', 'B', 1, 'Browser.', 5),
(3917, 164, 'Data Structure: LIFO?', 'Queue', 'Stack', 'Tree', 'Graph', 'B', 1, 'Stack is Last In First Out.', 6),
(3918, 164, 'HTTPS uses which port?', '80', '443', '21', '25', 'B', 1, '443.', 7),
(3919, 164, 'Array index starts at?', '1', '0', '-1', '2', 'B', 1, 'Usually 0.', 8),
(3920, 164, 'Extension of Java file?', '.js', '.java', '.txt', '.class', 'B', 1, '.java.', 9),
(3921, 164, 'Which is a loop?', 'If-Else', 'For', 'Switch', 'Break', 'B', 1, 'For loop.', 10),
(3922, 164, '1 Byte = ?', '4 bits', '8 bits', '16 bits', '32 bits', 'B', 1, '8 bits.', 11),
(3923, 164, 'CPU controls?', 'All input, output and processing', 'Only memory', 'Only power', 'Only network', 'A', 1, 'Central Processing Unit.', 12),
(3924, 164, 'Binary Search Complexity?', 'O(n)', 'O(log n)', 'O(1)', 'O(n^2)', 'B', 1, 'O(log n).', 13),
(3925, 164, 'RAM stands for?', 'Read Access Memory', 'Random Access Memory', 'Run All Memory', 'Read All Memory', 'B', 1, 'Random Access Memory.', 14),
(3926, 164, 'What is HTML?', 'Protocol', 'Language', 'Hardware', 'OS', 'B', 1, 'HyperText Markup Language.', 15),
(3927, 164, 'SQL: Select * FROM Users WHERE...?', 'Update', 'Condition', 'Delete', 'Insert', 'B', 1, 'WHERE clause requires a condition.', 16),
(3928, 164, 'Google Chrome is a?', 'Search Engine', 'Browser', 'Server', 'OS', 'B', 1, 'Browser.', 17),
(3929, 164, 'Data Structure: LIFO?', 'Queue', 'Stack', 'Tree', 'Graph', 'B', 1, 'Stack is Last In First Out.', 18),
(3930, 164, 'HTTPS uses which port?', '80', '443', '21', '25', 'B', 1, '443.', 19),
(3931, 164, 'Array index starts at?', '1', '0', '-1', '2', 'B', 1, 'Usually 0.', 20),
(3932, 164, 'Extension of Java file?', '.js', '.java', '.txt', '.class', 'B', 1, '.java.', 21),
(3933, 164, 'Which is a loop?', 'If-Else', 'For', 'Switch', 'Break', 'B', 1, 'For loop.', 22),
(3934, 164, '1 Byte = ?', '4 bits', '8 bits', '16 bits', '32 bits', 'B', 1, '8 bits.', 23),
(3935, 164, 'CPU controls?', 'All input, output and processing', 'Only memory', 'Only power', 'Only network', 'A', 1, 'Central Processing Unit.', 24),
(3936, 164, 'Binary Search Complexity?', 'O(n)', 'O(log n)', 'O(1)', 'O(n^2)', 'B', 1, 'O(log n).', 25),
(3937, 164, 'RAM stands for?', 'Read Access Memory', 'Random Access Memory', 'Run All Memory', 'Read All Memory', 'B', 1, 'Random Access Memory.', 26),
(3938, 165, 'HTTPS uses which port?', '80', '443', '21', '25', 'B', 1, '443.', 1),
(3939, 165, 'What is HTML?', 'Protocol', 'Language', 'Hardware', 'OS', 'B', 1, 'HyperText Markup Language.', 2),
(3940, 165, 'Extension of Java file?', '.js', '.java', '.txt', '.class', 'B', 1, '.java.', 3),
(3941, 165, '1 Byte = ?', '4 bits', '8 bits', '16 bits', '32 bits', 'B', 1, '8 bits.', 4),
(3942, 165, 'Array index starts at?', '1', '0', '-1', '2', 'B', 1, 'Usually 0.', 5),
(3943, 165, 'Data Structure: LIFO?', 'Queue', 'Stack', 'Tree', 'Graph', 'B', 1, 'Stack is Last In First Out.', 6),
(3944, 165, 'Binary Search Complexity?', 'O(n)', 'O(log n)', 'O(1)', 'O(n^2)', 'B', 1, 'O(log n).', 7),
(3945, 165, 'RAM stands for?', 'Read Access Memory', 'Random Access Memory', 'Run All Memory', 'Read All Memory', 'B', 1, 'Random Access Memory.', 8),
(3946, 165, 'SQL: Select * FROM Users WHERE...?', 'Update', 'Condition', 'Delete', 'Insert', 'B', 1, 'WHERE clause requires a condition.', 9),
(3947, 165, 'CPU controls?', 'All input, output and processing', 'Only memory', 'Only power', 'Only network', 'A', 1, 'Central Processing Unit.', 10),
(3948, 165, 'Which is a loop?', 'If-Else', 'For', 'Switch', 'Break', 'B', 1, 'For loop.', 11),
(3949, 165, 'Google Chrome is a?', 'Search Engine', 'Browser', 'Server', 'OS', 'B', 1, 'Browser.', 12),
(3950, 165, 'HTTPS uses which port?', '80', '443', '21', '25', 'B', 1, '443.', 13),
(3951, 165, 'What is HTML?', 'Protocol', 'Language', 'Hardware', 'OS', 'B', 1, 'HyperText Markup Language.', 14),
(3952, 165, 'Extension of Java file?', '.js', '.java', '.txt', '.class', 'B', 1, '.java.', 15),
(3953, 165, '1 Byte = ?', '4 bits', '8 bits', '16 bits', '32 bits', 'B', 1, '8 bits.', 16),
(3954, 165, 'Array index starts at?', '1', '0', '-1', '2', 'B', 1, 'Usually 0.', 17),
(3955, 165, 'Data Structure: LIFO?', 'Queue', 'Stack', 'Tree', 'Graph', 'B', 1, 'Stack is Last In First Out.', 18),
(3956, 165, 'Binary Search Complexity?', 'O(n)', 'O(log n)', 'O(1)', 'O(n^2)', 'B', 1, 'O(log n).', 19),
(3957, 165, 'RAM stands for?', 'Read Access Memory', 'Random Access Memory', 'Run All Memory', 'Read All Memory', 'B', 1, 'Random Access Memory.', 20),
(3958, 165, 'SQL: Select * FROM Users WHERE...?', 'Update', 'Condition', 'Delete', 'Insert', 'B', 1, 'WHERE clause requires a condition.', 21),
(3959, 165, 'CPU controls?', 'All input, output and processing', 'Only memory', 'Only power', 'Only network', 'A', 1, 'Central Processing Unit.', 22),
(3960, 165, 'Which is a loop?', 'If-Else', 'For', 'Switch', 'Break', 'B', 1, 'For loop.', 23),
(3961, 165, 'Google Chrome is a?', 'Search Engine', 'Browser', 'Server', 'OS', 'B', 1, 'Browser.', 24),
(3962, 165, 'HTTPS uses which port?', '80', '443', '21', '25', 'B', 1, '443.', 25),
(3963, 165, 'What is HTML?', 'Protocol', 'Language', 'Hardware', 'OS', 'B', 1, 'HyperText Markup Language.', 26),
(3964, 166, 'What is HTML?', 'Protocol', 'Language', 'Hardware', 'OS', 'B', 1, 'HyperText Markup Language.', 1),
(3965, 166, 'HTTPS uses which port?', '80', '443', '21', '25', 'B', 1, '443.', 2),
(3966, 166, 'Data Structure: LIFO?', 'Queue', 'Stack', 'Tree', 'Graph', 'B', 1, 'Stack is Last In First Out.', 3),
(3967, 166, '1 Byte = ?', '4 bits', '8 bits', '16 bits', '32 bits', 'B', 1, '8 bits.', 4),
(3968, 166, 'Extension of Java file?', '.js', '.java', '.txt', '.class', 'B', 1, '.java.', 5),
(3969, 166, 'RAM stands for?', 'Read Access Memory', 'Random Access Memory', 'Run All Memory', 'Read All Memory', 'B', 1, 'Random Access Memory.', 6),
(3970, 166, 'Array index starts at?', '1', '0', '-1', '2', 'B', 1, 'Usually 0.', 7),
(3971, 166, 'CPU controls?', 'All input, output and processing', 'Only memory', 'Only power', 'Only network', 'A', 1, 'Central Processing Unit.', 8),
(3972, 166, 'Binary Search Complexity?', 'O(n)', 'O(log n)', 'O(1)', 'O(n^2)', 'B', 1, 'O(log n).', 9),
(3973, 166, 'Which is a loop?', 'If-Else', 'For', 'Switch', 'Break', 'B', 1, 'For loop.', 10),
(3974, 166, 'SQL: Select * FROM Users WHERE...?', 'Update', 'Condition', 'Delete', 'Insert', 'B', 1, 'WHERE clause requires a condition.', 11),
(3975, 166, 'Google Chrome is a?', 'Search Engine', 'Browser', 'Server', 'OS', 'B', 1, 'Browser.', 12),
(3976, 166, 'What is HTML?', 'Protocol', 'Language', 'Hardware', 'OS', 'B', 1, 'HyperText Markup Language.', 13),
(3977, 166, 'HTTPS uses which port?', '80', '443', '21', '25', 'B', 1, '443.', 14),
(3978, 166, 'Data Structure: LIFO?', 'Queue', 'Stack', 'Tree', 'Graph', 'B', 1, 'Stack is Last In First Out.', 15),
(3979, 166, '1 Byte = ?', '4 bits', '8 bits', '16 bits', '32 bits', 'B', 1, '8 bits.', 16),
(3980, 166, 'Extension of Java file?', '.js', '.java', '.txt', '.class', 'B', 1, '.java.', 17),
(3981, 166, 'RAM stands for?', 'Read Access Memory', 'Random Access Memory', 'Run All Memory', 'Read All Memory', 'B', 1, 'Random Access Memory.', 18),
(3982, 166, 'Array index starts at?', '1', '0', '-1', '2', 'B', 1, 'Usually 0.', 19),
(3983, 166, 'CPU controls?', 'All input, output and processing', 'Only memory', 'Only power', 'Only network', 'A', 1, 'Central Processing Unit.', 20),
(3984, 166, 'Binary Search Complexity?', 'O(n)', 'O(log n)', 'O(1)', 'O(n^2)', 'B', 1, 'O(log n).', 21),
(3985, 166, 'Which is a loop?', 'If-Else', 'For', 'Switch', 'Break', 'B', 1, 'For loop.', 22),
(3986, 166, 'SQL: Select * FROM Users WHERE...?', 'Update', 'Condition', 'Delete', 'Insert', 'B', 1, 'WHERE clause requires a condition.', 23),
(3987, 166, 'Google Chrome is a?', 'Search Engine', 'Browser', 'Server', 'OS', 'B', 1, 'Browser.', 24),
(3988, 166, 'What is HTML?', 'Protocol', 'Language', 'Hardware', 'OS', 'B', 1, 'HyperText Markup Language.', 25),
(3989, 166, 'HTTPS uses which port?', '80', '443', '21', '25', 'B', 1, '443.', 26);

-- --------------------------------------------------------

--
-- Table structure for table `aptitudetestattempts`
--

CREATE TABLE `aptitudetestattempts` (
  `id` int(11) NOT NULL,
  `testId` int(11) NOT NULL,
  `studentId` int(11) NOT NULL,
  `startedAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `completedAt` datetime DEFAULT NULL,
  `score` int(11) DEFAULT 0,
  `totalMarks` int(11) DEFAULT 0,
  `status` enum('inProgress','completed','abandoned') DEFAULT 'inProgress'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `aptitudetestattempts`
--

INSERT INTO `aptitudetestattempts` (`id`, `testId`, `studentId`, `startedAt`, `completedAt`, `score`, `totalMarks`, `status`) VALUES
(7, 12, 10, '2026-02-16 04:58:28', '2026-02-16 10:28:53', 3, 10, 'completed'),
(8, 7, 10, '2026-02-16 05:11:31', '2026-02-16 10:41:55', 2, 10, 'completed'),
(9, 8, 10, '2026-02-16 05:28:15', NULL, 0, 10, 'inProgress');

-- --------------------------------------------------------

--
-- Table structure for table `aptitudetests`
--

CREATE TABLE `aptitudetests` (
  `id` int(11) NOT NULL,
  `mentorId` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `category` varchar(100) DEFAULT NULL,
  `difficulty` varchar(20) DEFAULT 'Medium',
  `icon` varchar(100) DEFAULT NULL,
  `duration` int(11) DEFAULT 30 COMMENT 'in minutes',
  `totalQuestions` int(11) DEFAULT 0,
  `totalMarks` int(11) DEFAULT 0,
  `isPublished` tinyint(1) DEFAULT 0,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `aptitudetests`
--

INSERT INTO `aptitudetests` (`id`, `mentorId`, `title`, `description`, `category`, `difficulty`, `icon`, `duration`, `totalQuestions`, `totalMarks`, `isPublished`, `createdAt`, `updatedAt`) VALUES
(5, 2, 'Quantitative Aptitude — Set 1', 'Number system, percentages, ratios and arithmetic.', 'Quantitative', 'Easy', 'ri-calculator-line', 15, 10, 10, 1, '2026-02-16 04:09:15', '2026-02-16 04:09:15'),
(6, 2, 'Quantitative Aptitude — Set 2', 'Time & work, speed & distance, compound interest.', 'Quantitative', 'Medium', 'ri-calculator-line', 20, 10, 10, 1, '2026-02-16 04:09:15', '2026-02-16 04:09:15'),
(7, 2, 'Logical Reasoning — Set 1', 'Series, patterns, coding-decoding and syllogisms.', 'Logical', 'Easy', 'ri-brain-line', 15, 10, 10, 1, '2026-02-16 04:09:15', '2026-02-16 04:09:15'),
(8, 2, 'Logical Reasoning — Set 2', 'Seating arrangements, puzzles and critical reasoning.', 'Logical', 'Medium', 'ri-brain-line', 20, 10, 10, 1, '2026-02-16 04:09:15', '2026-02-16 04:09:15'),
(9, 2, 'Verbal Ability — Set 1', 'Grammar, vocabulary, comprehension and sentence correction.', 'Verbal', 'Easy', 'ri-book-open-line', 15, 10, 10, 1, '2026-02-16 04:09:15', '2026-02-16 04:09:15'),
(10, 2, 'Verbal Ability — Set 2', 'Reading comprehension, para jumbles and critical reasoning.', 'Verbal', 'Medium', 'ri-book-open-line', 20, 10, 10, 1, '2026-02-16 04:09:15', '2026-02-16 04:09:15'),
(11, 2, 'Computer Science Fundamentals', 'OS, networking, DBMS and programming basics.', 'Technical', 'Medium', 'ri-computer-line', 20, 10, 10, 1, '2026-02-16 04:09:15', '2026-02-16 04:09:15'),
(12, 2, 'Data Interpretation', 'Tables, charts, percentages and data analysis.', 'Data', 'Hard', 'ri-pie-chart-line', 20, 10, 10, 1, '2026-02-16 04:09:15', '2026-02-16 04:09:15'),
(13, 2, 'Quantitative Aptitude — Set 1', 'Practice Quantitative aptitude questions (Set 1)', 'Quantitative', 'Easy', 'ri-calculator-line', 28, 25, 25, 1, '2026-02-16 05:14:23', '2026-02-16 05:14:23'),
(145, 2, 'Logical Reasoning Test', 'Test your logical thinking and reasoning abilities', NULL, 'Medium', NULL, 30, 10, 10, 1, '2026-02-17 16:53:42', '2026-02-17 16:53:42'),
(146, 2, 'Quantitative Aptitude', 'Numerical ability and mathematical reasoning', NULL, 'Medium', NULL, 45, 15, 15, 1, '2026-02-17 16:53:42', '2026-02-17 16:53:42'),
(147, 2, 'Quantitative Practice Set 1', 'Generated Quantitative Questions', 'Quantitative', 'Medium', 'ri-book-line', 30, 26, 26, 1, '2026-02-17 16:55:06', '2026-02-17 16:55:06'),
(148, 2, 'Quantitative Practice Set 2', 'Generated Quantitative Questions', 'Quantitative', 'Medium', 'ri-book-line', 30, 26, 26, 1, '2026-02-17 16:55:06', '2026-02-17 16:55:06'),
(149, 2, 'Quantitative Practice Set 3', 'Generated Quantitative Questions', 'Quantitative', 'Medium', 'ri-book-line', 30, 26, 26, 1, '2026-02-17 16:55:06', '2026-02-17 16:55:06'),
(150, 2, 'Quantitative Practice Set 4', 'Generated Quantitative Questions', 'Quantitative', 'Medium', 'ri-book-line', 30, 26, 26, 1, '2026-02-17 16:55:06', '2026-02-17 16:55:06'),
(151, 2, 'Quantitative Practice Set 5', 'Generated Quantitative Questions', 'Quantitative', 'Medium', 'ri-book-line', 30, 26, 26, 1, '2026-02-17 16:55:06', '2026-02-17 16:55:06'),
(152, 2, 'Logical Reasoning Set 1', 'Generated Logical Questions', 'Logical', 'Medium', 'ri-book-line', 30, 26, 26, 1, '2026-02-17 16:55:06', '2026-02-17 16:55:06'),
(153, 2, 'Logical Reasoning Set 2', 'Generated Logical Questions', 'Logical', 'Medium', 'ri-book-line', 30, 26, 26, 1, '2026-02-17 16:55:06', '2026-02-17 16:55:06'),
(154, 2, 'Logical Reasoning Set 3', 'Generated Logical Questions', 'Logical', 'Medium', 'ri-book-line', 30, 26, 26, 1, '2026-02-17 16:55:06', '2026-02-17 16:55:06'),
(155, 2, 'Logical Reasoning Set 4', 'Generated Logical Questions', 'Logical', 'Medium', 'ri-book-line', 30, 26, 26, 1, '2026-02-17 16:55:06', '2026-02-17 16:55:06'),
(156, 2, 'Logical Reasoning Set 5', 'Generated Logical Questions', 'Logical', 'Medium', 'ri-book-line', 30, 26, 26, 1, '2026-02-17 16:55:06', '2026-02-17 16:55:06'),
(157, 2, 'Verbal Ability Set 1', 'Generated Verbal Questions', 'Verbal', 'Easy', 'ri-book-line', 30, 26, 26, 1, '2026-02-17 16:55:06', '2026-02-17 16:55:06'),
(158, 2, 'Verbal Ability Set 2', 'Generated Verbal Questions', 'Verbal', 'Easy', 'ri-book-line', 30, 26, 26, 1, '2026-02-17 16:55:06', '2026-02-17 16:55:06'),
(159, 2, 'Verbal Ability Set 3', 'Generated Verbal Questions', 'Verbal', 'Easy', 'ri-book-line', 30, 26, 26, 1, '2026-02-17 16:55:06', '2026-02-17 16:55:06'),
(160, 2, 'Verbal Ability Set 4', 'Generated Verbal Questions', 'Verbal', 'Easy', 'ri-book-line', 30, 26, 26, 1, '2026-02-17 16:55:06', '2026-02-17 16:55:06'),
(161, 2, 'Verbal Ability Set 5', 'Generated Verbal Questions', 'Verbal', 'Easy', 'ri-book-line', 30, 26, 26, 1, '2026-02-17 16:55:06', '2026-02-17 16:55:06'),
(162, 2, 'Technical Computer Science Set 1', 'Generated Technical Questions', 'Technical', 'Hard', 'ri-book-line', 30, 26, 26, 1, '2026-02-17 16:55:06', '2026-02-17 16:55:06'),
(163, 2, 'Technical Computer Science Set 2', 'Generated Technical Questions', 'Technical', 'Hard', 'ri-book-line', 30, 26, 26, 1, '2026-02-17 16:55:06', '2026-02-17 16:55:06'),
(164, 2, 'Technical Computer Science Set 3', 'Generated Technical Questions', 'Technical', 'Hard', 'ri-book-line', 30, 26, 26, 1, '2026-02-17 16:55:06', '2026-02-17 16:55:06'),
(165, 2, 'Technical Computer Science Set 4', 'Generated Technical Questions', 'Technical', 'Hard', 'ri-book-line', 30, 26, 26, 1, '2026-02-17 16:55:06', '2026-02-17 16:55:06'),
(166, 2, 'Technical Computer Science Set 5', 'Generated Technical Questions', 'Technical', 'Hard', 'ri-book-line', 30, 26, 26, 1, '2026-02-17 16:55:06', '2026-02-17 16:55:06');

-- --------------------------------------------------------

--
-- Table structure for table `assignments`
--

CREATE TABLE `assignments` (
  `id` int(11) NOT NULL,
  `courseId` int(11) NOT NULL,
  `mentorId` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `dueDate` datetime NOT NULL,
  `maxScore` int(11) DEFAULT 100,
  `isPublished` tinyint(1) DEFAULT 0,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `assignments`
--

INSERT INTO `assignments` (`id`, `courseId`, `mentorId`, `title`, `description`, `dueDate`, `maxScore`, `isPublished`, `createdAt`, `updatedAt`) VALUES
(1, 1, 2, 'Build a Landing Page', 'Create a responsive landing page using HTML and CSS', '2026-03-01 23:59:59', 100, 1, '2026-02-15 07:03:31', '2026-02-15 07:03:31'),
(2, 1, 2, 'JavaScript Todo App', 'Build an interactive todo application with vanilla JS', '2026-03-15 23:59:59', 100, 1, '2026-02-15 07:03:31', '2026-02-15 07:03:31'),
(3, 2, 2, 'Data Analysis Project', 'Analyze the provided dataset using Python pandas', '2026-03-10 23:59:59', 100, 1, '2026-02-15 07:03:31', '2026-02-15 07:03:31'),
(4, 7, 2, 'Build a Landing Page', 'Create a responsive landing page using HTML and CSS', '2026-03-01 23:59:59', 100, 1, '2026-02-15 10:31:21', '2026-02-15 10:31:21'),
(5, 7, 2, 'JavaScript Todo App', 'Build an interactive todo application with vanilla JS', '2026-03-15 23:59:59', 100, 1, '2026-02-15 10:31:21', '2026-02-15 10:31:21'),
(6, 1, 2, 'Data Analysis Project', 'Analyze the provided dataset using Python pandas', '2026-03-10 23:59:59', 100, 1, '2026-02-15 10:31:21', '2026-02-15 10:31:21'),
(7, 7, 2, 'Build a Landing Page', 'Create a responsive landing page using HTML and CSS', '2026-03-01 23:59:59', 100, 1, '2026-02-17 16:53:42', '2026-02-17 16:53:42'),
(8, 7, 2, 'JavaScript Todo App', 'Build an interactive todo application with vanilla JS', '2026-03-15 23:59:59', 100, 1, '2026-02-17 16:53:42', '2026-02-17 16:53:42'),
(9, 1, 2, 'Data Analysis Project', 'Analyze the provided dataset using Python pandas', '2026-03-10 23:59:59', 100, 1, '2026-02-17 16:53:42', '2026-02-17 16:53:42');

-- --------------------------------------------------------

--
-- Table structure for table `assignmentsubmissions`
--

CREATE TABLE `assignmentsubmissions` (
  `id` int(11) NOT NULL,
  `assignmentId` int(11) NOT NULL,
  `studentId` int(11) NOT NULL,
  `content` text DEFAULT NULL,
  `fileUrl` varchar(500) DEFAULT NULL,
  `submittedAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `score` int(11) DEFAULT NULL,
  `feedback` text DEFAULT NULL,
  `gradedAt` datetime DEFAULT NULL,
  `gradedBy` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `codingproblems`
--

CREATE TABLE `codingproblems` (
  `id` int(11) NOT NULL,
  `mentorId` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `difficulty` enum('easy','medium','hard') DEFAULT 'easy',
  `category` varchar(100) DEFAULT NULL,
  `inputFormat` text DEFAULT NULL,
  `outputFormat` text DEFAULT NULL,
  `constraints` text DEFAULT NULL,
  `sampleInput` text DEFAULT NULL,
  `sampleOutput` text DEFAULT NULL,
  `boilerplate` text DEFAULT NULL,
  `testCases` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`testCases`)),
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `codingproblems`
--

INSERT INTO `codingproblems` (`id`, `mentorId`, `title`, `description`, `difficulty`, `category`, `inputFormat`, `outputFormat`, `constraints`, `sampleInput`, `sampleOutput`, `boilerplate`, `testCases`, `createdAt`, `updatedAt`) VALUES
(1, 2, 'Two Sum', 'Given an array of integers nums and an integer target, return indices of the two numbers that add up to target.', 'easy', 'Arrays', 'An array of integers and a target integer', 'Two indices', 'Array length 2 to 10^4', '[2,7,11,15]\n9', '[0,1]', NULL, '[{\"input\":\"[2,7,11,15]\\n9\",\"output\":\"[0,1]\"},{\"input\":\"[3,2,4]\\n6\",\"output\":\"[1,2]\"}]', '2026-02-15 07:03:31', '2026-02-15 07:03:31'),
(2, 2, 'Palindrome Check', 'Given a string, determine if it is a palindrome.', 'easy', 'Strings', 'A string', 'true or false', 'String length 1 to 10^5', 'racecar', 'true', NULL, '[{\"input\":\"racecar\",\"output\":\"true\"},{\"input\":\"hello\",\"output\":\"false\"}]', '2026-02-15 07:03:31', '2026-02-15 07:03:31'),
(3, 2, 'Two Sum', 'Given an array of integers nums and an integer target, return indices of the two numbers that add up to target.', 'easy', 'Arrays', 'An array of integers and a target integer', 'Two indices', 'Array length 2 to 10^4', '[2,7,11,15]\n9', '[0,1]', NULL, '[{\"input\":\"[2,7,11,15]\\n9\",\"output\":\"[0,1]\"},{\"input\":\"[3,2,4]\\n6\",\"output\":\"[1,2]\"}]', '2026-02-15 10:31:21', '2026-02-15 10:31:21'),
(4, 2, 'Palindrome Check', 'Given a string, determine if it is a palindrome.', 'easy', 'Strings', 'A string', 'true or false', 'String length 1 to 10^5', 'racecar', 'true', NULL, '[{\"input\":\"racecar\",\"output\":\"true\"},{\"input\":\"hello\",\"output\":\"false\"}]', '2026-02-15 10:31:21', '2026-02-15 10:31:21'),
(50, 2, 'Two Sum', 'Given an array of integers nums and an integer target, return indices of the two numbers that add up to target.', 'easy', 'Arrays', 'An array of integers and a target integer', 'Two indices', 'Array length 2 to 10^4', '[2,7,11,15]\n9', '[0,1]', NULL, '[{\"input\":\"[2,7,11,15]\\n9\",\"output\":\"[0,1]\"},{\"input\":\"[3,2,4]\\n6\",\"output\":\"[1,2]\"}]', '2026-02-17 16:53:42', '2026-02-17 16:53:42'),
(51, 2, 'Palindrome Check', 'Given a string, determine if it is a palindrome.', 'easy', 'Strings', 'A string', 'true or false', 'String length 1 to 10^5', 'racecar', 'true', NULL, '[{\"input\":\"racecar\",\"output\":\"true\"},{\"input\":\"hello\",\"output\":\"false\"}]', '2026-02-17 16:53:42', '2026-02-17 16:53:42'),
(52, 2, 'Two Sum (Seeded)', 'Given a list of integers and a target, return the indices of two numbers that add up to the target.', 'easy', 'Arrays', 'List of integers and a target integer', 'List of two indices', '2 ≤ len(arr) ≤ 10⁴', '[2,7,11,15]\\n9', '[0,1]', 'def two_sum(nums, target):\\n    # Return indices of two numbers that add up to target\\n    pass', '[{\"input\":\"[2,7,11,15]\\\\n9\",\"output\":\"[0,1]\"},{\"input\":\"[3,2,4]\\\\n6\",\"output\":\"[1,2]\"}]', '2026-02-17 16:55:06', '2026-02-17 16:55:06'),
(53, 2, 'Palindrome Check (Seeded)', 'Determine if a given string is a palindrome (reads the same forwards and backwards).', 'easy', 'Strings', 'A string', 'True or False', '1 ≤ len(s) ≤ 10⁵', 'racecar', 'True', 'def is_palindrome(s):\\n    # Return True if s is a palindrome\\n    pass', '[{\"input\":\"racecar\",\"output\":\"True\"},{\"input\":\"hello\",\"output\":\"False\"}]', '2026-02-17 16:55:06', '2026-02-17 16:55:06'),
(54, 2, 'Reverse List (Seeded)', 'Reverse a list of integers in-place and return it.', 'easy', 'Arrays', 'List of integers', 'Reversed list', '1 ≤ len(arr) ≤ 10⁴', '[1,2,3,4,5]', '[5,4,3,2,1]', 'def reverse_list(arr):\\n    # Reverse the list in-place and return it\\n    pass', '[{\"input\":\"[1,2,3,4,5]\",\"output\":\"[5,4,3,2,1]\"},{\"input\":\"[10,20]\",\"output\":\"[20,10]\"}]', '2026-02-17 16:55:06', '2026-02-17 16:55:06'),
(55, 2, 'Count Vowels (Seeded)', 'Count the number of vowels (a, e, i, o, u) in a given string (case-insensitive).', 'easy', 'Strings', 'A string', 'Integer count', '1 ≤ len(s) ≤ 10⁴', 'Hello World', '3', 'def count_vowels(s):\\n    # Return the count of vowels in s\\n    pass', '[{\"input\":\"Hello World\",\"output\":\"3\"},{\"input\":\"aeiou\",\"output\":\"5\"}]', '2026-02-17 16:55:06', '2026-02-17 16:55:06'),
(56, 2, 'Find Maximum (Seeded)', 'Find and return the maximum element in a list of integers.', 'easy', 'Arrays', 'List of integers', 'Maximum integer', '1 ≤ len(arr) ≤ 10⁴', '[3,7,2,9,1]', '9', 'def find_max(arr):\\n    # Return the maximum element\\n    pass', '[{\"input\":\"[3,7,2,9,1]\",\"output\":\"9\"},{\"input\":\"[-5,-1,-8]\",\"output\":\"-1\"}]', '2026-02-17 16:55:06', '2026-02-17 16:55:06'),
(57, 2, 'Factorial (Seeded)', 'Calculate the factorial of a non-negative integer n (n!).', 'easy', 'Math', 'Non-negative integer n', 'n!', '0 ≤ n ≤ 20', '5', '120', 'def factorial(n):\\n    # Return n!\\n    pass', '[{\"input\":\"5\",\"output\":\"120\"},{\"input\":\"0\",\"output\":\"1\"},{\"input\":\"10\",\"output\":\"3628800\"}]', '2026-02-17 16:55:06', '2026-02-17 16:55:06'),
(58, 2, 'Fibonacci Number (Seeded)', 'Return the nth Fibonacci number (0-indexed). F(0)=0, F(1)=1, F(n)=F(n-1)+F(n-2).', 'easy', 'Math', 'Integer n', 'F(n)', '0 ≤ n ≤ 30', '6', '8', 'def fibonacci(n):\\n    # Return the nth Fibonacci number\\n    pass', '[{\"input\":\"6\",\"output\":\"8\"},{\"input\":\"0\",\"output\":\"0\"},{\"input\":\"10\",\"output\":\"55\"}]', '2026-02-17 16:55:06', '2026-02-17 16:55:06'),
(59, 2, 'Sum of Digits (Seeded)', 'Calculate the sum of all digits of a positive integer.', 'easy', 'Math', 'Positive integer', 'Sum of digits', '1 ≤ n ≤ 10⁹', '1234', '10', 'def sum_of_digits(n):\\n    # Return the sum of digits of n\\n    pass', '[{\"input\":\"1234\",\"output\":\"10\"},{\"input\":\"999\",\"output\":\"27\"}]', '2026-02-17 16:55:06', '2026-02-17 16:55:06'),
(60, 2, 'FizzBuzz (Seeded)', 'For a given number n, return \"Fizz\" if divisible by 3, \"Buzz\" if by 5, \"FizzBuzz\" if by both, else the number as string.', 'easy', 'Math', 'Integer n', 'String result', '1 ≤ n ≤ 100', '15', 'FizzBuzz', 'def fizzbuzz(n):\\n    # Return \"Fizz\", \"Buzz\", \"FizzBuzz\" or str(n)\\n    pass', '[{\"input\":\"15\",\"output\":\"FizzBuzz\"},{\"input\":\"7\",\"output\":\"7\"},{\"input\":\"9\",\"output\":\"Fizz\"}]', '2026-02-17 16:55:06', '2026-02-17 16:55:06'),
(61, 2, 'Remove Duplicates (Seeded)', 'Remove duplicate values from a sorted list and return the unique elements.', 'easy', 'Arrays', 'Sorted list of integers', 'List of unique integers', '1 ≤ len(arr) ≤ 10⁴', '[1,1,2,2,3]', '[1,2,3]', 'def remove_duplicates(arr):\\n    # Return list with duplicates removed\\n    pass', '[{\"input\":\"[1,1,2,2,3]\",\"output\":\"[1,2,3]\"},{\"input\":\"[5,5,5]\",\"output\":\"[5]\"}]', '2026-02-17 16:55:06', '2026-02-17 16:55:06'),
(62, 2, 'Count Occurrences (Seeded)', 'Count how many times a target value appears in a list.', 'easy', 'Arrays', 'List and target integer', 'Count', '1 ≤ len(arr) ≤ 10⁴', '[1,2,3,2,2,4]\\n2', '3', 'def count_occurrences(arr, target):\\n    # Return count of target in arr\\n    pass', '[{\"input\":\"[1,2,3,2,2,4]\\\\n2\",\"output\":\"3\"},{\"input\":\"[5,5,5]\\\\n5\",\"output\":\"3\"}]', '2026-02-17 16:55:06', '2026-02-17 16:55:06'),
(63, 2, 'Capitalize First Letter (Seeded)', 'Capitalize the first letter of each word in a sentence.', 'easy', 'Strings', 'A string sentence', 'Capitalized sentence', '1 ≤ len(s) ≤ 10³', 'hello world', 'Hello World', 'def capitalize_words(s):\\n    # Return sentence with each word capitalized\\n    pass', '[{\"input\":\"hello world\",\"output\":\"Hello World\"},{\"input\":\"javaScript is fun\",\"output\":\"Javascript Is Fun\"}]', '2026-02-17 16:55:06', '2026-02-17 16:55:06'),
(64, 2, 'Check Prime (Seeded)', 'Determine if a given number is a prime number.', 'easy', 'Math', 'Positive integer', 'True or False', '2 ≤ n ≤ 10⁶', '17', 'True', 'def is_prime(n):\\n    # Return True if n is prime\\n    pass', '[{\"input\":\"17\",\"output\":\"True\"},{\"input\":\"4\",\"output\":\"False\"},{\"input\":\"2\",\"output\":\"True\"}]', '2026-02-17 16:55:06', '2026-02-17 16:55:06'),
(65, 2, 'Merge Two Sorted Lists (Seeded)', 'Merge two sorted lists into one sorted list.', 'easy', 'Arrays', 'Two sorted lists', 'One merged sorted list', 'Lists length ≤ 10⁴', '[1,3,5]\\n[2,4,6]', '[1,2,3,4,5,6]', 'def merge_sorted(a, b):\\n    # Merge two sorted lists into one sorted list\\n    pass', '[{\"input\":\"[1,3,5]\\\\n[2,4,6]\",\"output\":\"[1,2,3,4,5,6]\"},{\"input\":\"[1]\\\\n[2,3]\",\"output\":\"[1,2,3]\"}]', '2026-02-17 16:55:06', '2026-02-17 16:55:06'),
(66, 2, 'String Reverse (Seeded)', 'Reverse a string without using built-in reverse methods.', 'easy', 'Strings', 'A string', 'Reversed string', '1 ≤ len(s) ≤ 10⁴', 'algorithm', 'mhtirogla', 'def reverse_string(s):\\n    # Reverse the string without slicing[::-1]\\n    pass', '[{\"input\":\"algorithm\",\"output\":\"mhtirogla\"},{\"input\":\"hello\",\"output\":\"olleh\"}]', '2026-02-17 16:55:06', '2026-02-17 16:55:06'),
(67, 2, 'Binary Search (Seeded)', 'Implement binary search on a sorted list. Return the index of the target or -1.', 'medium', 'Searching', 'Sorted list and target', 'Index or -1', '1 ≤ len(arr) ≤ 10⁵', '[1,3,5,7,9]\\n5', '2', 'def binary_search(arr, target):\\n    # Return index of target in sorted arr, or -1\\n    pass', '[{\"input\":\"[1,3,5,7,9]\\\\n5\",\"output\":\"2\"},{\"input\":\"[1,3,5,7,9]\\\\n4\",\"output\":\"-1\"}]', '2026-02-17 16:55:06', '2026-02-17 16:55:06'),
(68, 2, 'Valid Parentheses (Seeded)', 'Check if a string of brackets ()[]\\{\\} is valid — every open bracket is closed in order.', 'medium', 'Stack', 'String of brackets', 'True or False', '1 ≤ len(s) ≤ 10⁴', '({[]})', 'True', 'def is_valid(s):\\n    # Return True if brackets are balanced\\n    pass', '[{\"input\":\"({[]})\",\"output\":\"True\"},{\"input\":\"([)]\",\"output\":\"False\"}]', '2026-02-17 16:55:06', '2026-02-17 16:55:06'),
(69, 2, 'Rotate List (Seeded)', 'Rotate a list to the right by k steps.', 'medium', 'Arrays', 'List and integer k', 'Rotated list', '1 ≤ len(arr) ≤ 10⁵', '[1,2,3,4,5]\\n2', '[4,5,1,2,3]', 'def rotate_list(arr, k):\\n    # Return arr rotated right by k steps\\n    pass', '[{\"input\":\"[1,2,3,4,5]\\\\n2\",\"output\":\"[4,5,1,2,3]\"},{\"input\":\"[1,2,3]\\\\n1\",\"output\":\"[3,1,2]\"}]', '2026-02-17 16:55:06', '2026-02-17 16:55:06'),
(70, 2, 'Anagram Check (Seeded)', 'Determine if two strings are anagrams of each other (same characters, different order).', 'medium', 'Strings', 'Two strings', 'True or False', '1 ≤ length ≤ 10⁴', 'listen\\nsilent', 'True', 'def is_anagram(s1, s2):\\n    # Return True if s1 and s2 are anagrams\\n    pass', '[{\"input\":\"listen\\\\nsilent\",\"output\":\"True\"},{\"input\":\"hello\\\\nworld\",\"output\":\"False\"}]', '2026-02-17 16:55:06', '2026-02-17 16:55:06'),
(71, 2, 'GCD of Two Numbers (Seeded)', 'Find the Greatest Common Divisor of two positive integers using Euclid\'s algorithm.', 'medium', 'Math', 'Two positive integers', 'GCD', '1 ≤ a, b ≤ 10⁹', '48\\n18', '6', 'def gcd(a, b):\\n    # Return GCD using Euclid\'s algorithm\\n    pass', '[{\"input\":\"48\\\\n18\",\"output\":\"6\"},{\"input\":\"100\\\\n75\",\"output\":\"25\"}]', '2026-02-17 16:55:07', '2026-02-17 16:55:07'),
(72, 2, 'Matrix Transpose (Seeded)', 'Return the transpose of a given m×n matrix.', 'medium', 'Arrays', '2D list (matrix)', 'Transposed matrix', '1 ≤ m,n ≤ 100', '[[1,2,3],[4,5,6]]', '[[1,4],[2,5],[3,6]]', 'def transpose(matrix):\\n    # Return the transposed matrix\\n    pass', '[{\"input\":\"[[1,2,3],[4,5,6]]\",\"output\":\"[[1,4],[2,5],[3,6]]\"}]', '2026-02-17 16:55:07', '2026-02-17 16:55:07'),
(73, 2, 'Power Function (Seeded)', 'Implement pow(base, exponent) without using built-in power functions.', 'medium', 'Recursion', 'Base and exponent integers', 'Result', '-10 ≤ base ≤ 10, 0 ≤ exp ≤ 20', '2\\n10', '1024', 'def power(base, exp):\\n    # Return base ** exp without using **\\n    pass', '[{\"input\":\"2\\\\n10\",\"output\":\"1024\"},{\"input\":\"3\\\\n4\",\"output\":\"81\"}]', '2026-02-17 16:55:07', '2026-02-17 16:55:07'),
(74, 2, 'Flatten Nested List (Seeded)', 'Flatten a nested list into a single-level list.', 'medium', 'Arrays', 'Nested list', 'Flat list', 'Depth ≤ 5', '[1,[2,[3,4],5]]', '[1,2,3,4,5]', 'def flatten(lst):\\n    # Recursively flatten the nested list\\n    pass', '[{\"input\":\"[1,[2,[3,4],5]]\",\"output\":\"[1,2,3,4,5]\"},{\"input\":\"[[1,2],[3,[4]]]\",\"output\":\"[1,2,3,4]\"}]', '2026-02-17 16:55:07', '2026-02-17 16:55:07'),
(75, 2, 'Find Missing Number (Seeded)', 'Given a list containing n distinct numbers from 0 to n, find the missing one.', 'medium', 'Arrays', 'List of n distinct integers [0..n]', 'Missing number', '1 ≤ n ≤ 10⁴', '[3,0,1]', '2', 'def missing_number(nums):\\n    # Find the missing number in 0..n\\n    pass', '[{\"input\":\"[3,0,1]\",\"output\":\"2\"},{\"input\":\"[0,1,2,4]\",\"output\":\"3\"}]', '2026-02-17 16:55:07', '2026-02-17 16:55:07'),
(76, 2, 'Product Except Self (Seeded)', 'Return a list where each element is the product of all other elements (no division).', 'medium', 'Arrays', 'List of integers', 'List of products', '2 ≤ len(arr) ≤ 10⁴', '[1,2,3,4]', '[24,12,8,6]', 'def product_except_self(nums):\\n    # Return list of products without division\\n    pass', '[{\"input\":\"[1,2,3,4]\",\"output\":\"[24,12,8,6]\"},{\"input\":\"[2,3]\",\"output\":\"[3,2]\"}]', '2026-02-17 16:55:07', '2026-02-17 16:55:07'),
(77, 2, 'String Compression (Seeded)', 'Compress a string using counts of repeated characters. Return original if compressed is not shorter.', 'medium', 'Strings', 'A string', 'Compressed string or original', '1 ≤ len(s) ≤ 10⁴', 'aabcccccaaa', 'a2b1c5a3', 'def compress(s):\\n    # Return compressed string or original\\n    pass', '[{\"input\":\"aabcccccaaa\",\"output\":\"a2b1c5a3\"},{\"input\":\"abc\",\"output\":\"abc\"}]', '2026-02-17 16:55:07', '2026-02-17 16:55:07'),
(78, 2, 'Spiral Matrix (Seeded)', 'Return all elements of an m×n matrix in spiral order.', 'medium', 'Arrays', '2D matrix', 'List in spiral order', '1 ≤ m,n ≤ 10', '[[1,2,3],[4,5,6],[7,8,9]]', '[1,2,3,6,9,8,7,4,5]', 'def spiral_order(matrix):\\n    # Return elements in spiral order\\n    pass', '[{\"input\":\"[[1,2,3],[4,5,6],[7,8,9]]\",\"output\":\"[1,2,3,6,9,8,7,4,5]\"}]', '2026-02-17 16:55:07', '2026-02-17 16:55:07'),
(79, 2, 'Longest Substring Without Repeats (Seeded)', 'Find the length of the longest substring without repeating characters.', 'medium', 'Strings', 'A string', 'Integer length', '0 ≤ len(s) ≤ 5×10⁴', 'abcabcbb', '3', 'def length_of_longest_substring(s):\\n    # Return length of longest substring without repeats\\n    pass', '[{\"input\":\"abcabcbb\",\"output\":\"3\"},{\"input\":\"bbbbb\",\"output\":\"1\"}]', '2026-02-17 16:55:07', '2026-02-17 16:55:07'),
(80, 2, 'Kadane Maximum Subarray (Seeded)', 'Find the contiguous subarray with the largest sum (Kadane\'s algorithm).', 'medium', 'Arrays', 'List of integers', 'Maximum subarray sum', '1 ≤ len(arr) ≤ 10⁵', '[-2,1,-3,4,-1,2,1,-5,4]', '6', 'def max_subarray(nums):\\n    # Return max subarray sum using Kadane\'s algorithm\\n    pass', '[{\"input\":\"[-2,1,-3,4,-1,2,1,-5,4]\",\"output\":\"6\"},{\"input\":\"[1]\",\"output\":\"1\"}]', '2026-02-17 16:55:07', '2026-02-17 16:55:07'),
(81, 2, 'Integer to Roman (Seeded)', 'Convert an integer to its Roman numeral representation.', 'medium', 'Math', 'Integer (1 to 3999)', 'Roman numeral string', '1 ≤ num ≤ 3999', '1994', 'MCMXCIV', 'def int_to_roman(num):\\n    # Convert integer to Roman numeral string\\n    pass', '[{\"input\":\"1994\",\"output\":\"MCMXCIV\"},{\"input\":\"58\",\"output\":\"LVIII\"}]', '2026-02-17 16:55:07', '2026-02-17 16:55:07'),
(82, 2, 'Longest Common Subsequence (Seeded)', 'Find the length of the longest common subsequence of two strings.', 'hard', 'Dynamic Programming', 'Two strings', 'LCS length', '1 ≤ length ≤ 10³', 'abcde\\nace', '3', 'def lcs(a, b):\\n    # Return length of longest common subsequence\\n    pass', '[{\"input\":\"abcde\\\\nace\",\"output\":\"3\"},{\"input\":\"abc\\\\ndef\",\"output\":\"0\"}]', '2026-02-17 16:55:07', '2026-02-17 16:55:07'),
(83, 2, '0/1 Knapsack Problem (Seeded)', 'Given items with weights and values, maximise total value without exceeding capacity.', 'hard', 'Dynamic Programming', 'capacity, weights[], values[]', 'Maximum value', 'n ≤ 100, W ≤ 10⁴', '50\\n[10,20,30]\\n[60,100,120]', '220', 'def knapsack(capacity, weights, values):\\n    # Return maximum value within capacity\\n    pass', '[{\"input\":\"50\\\\n[10,20,30]\\\\n[60,100,120]\",\"output\":\"220\"}]', '2026-02-17 16:55:07', '2026-02-17 16:55:07'),
(84, 2, 'N-Queens Validator (Seeded)', 'Given an n×n board, validate if queens placement is valid (no two queens attack each other).', 'hard', 'Backtracking', 'List of column positions per row', 'True or False', '1 ≤ n ≤ 15', '[1,3,0,2]', 'True', 'def is_valid_queens(positions):\\n    # Return True if no two queens attack each other\\n    pass', '[{\"input\":\"[1,3,0,2]\",\"output\":\"True\"},{\"input\":\"[0,1,2,3]\",\"output\":\"False\"}]', '2026-02-17 16:55:07', '2026-02-17 16:55:07'),
(85, 2, 'Merge Intervals (Seeded)', 'Given a collection of intervals, merge all overlapping intervals.', 'hard', 'Arrays', 'List of [start, end] intervals', 'Merged intervals', '1 ≤ len(intervals) ≤ 10⁴', '[[1,3],[2,6],[8,10],[15,18]]', '[[1,6],[8,10],[15,18]]', 'def merge_intervals(intervals):\\n    # Merge overlapping intervals\\n    pass', '[{\"input\":\"[[1,3],[2,6],[8,10],[15,18]]\",\"output\":\"[[1,6],[8,10],[15,18]]\"}]', '2026-02-17 16:55:07', '2026-02-17 16:55:07'),
(86, 2, 'Longest Increasing Subsequence (Seeded)', 'Find the length of the longest strictly increasing subsequence.', 'hard', 'Dynamic Programming', 'List of integers', 'LIS length', '1 ≤ len(arr) ≤ 2500', '[10,9,2,5,3,7,101,18]', '4', 'def length_of_lis(nums):\\n    # Return length of longest increasing subsequence\\n    pass', '[{\"input\":\"[10,9,2,5,3,7,101,18]\",\"output\":\"4\"},{\"input\":\"[0,1,0,3,2,3]\",\"output\":\"4\"}]', '2026-02-17 16:55:07', '2026-02-17 16:55:07'),
(87, 2, 'Edit Distance (Seeded)', 'Find the minimum number of operations (insert, delete, replace) to convert one string to another.', 'hard', 'Dynamic Programming', 'Two strings', 'Minimum operations', '0 ≤ length ≤ 500', 'horse\\nros', '3', 'def edit_distance(word1, word2):\\n    # Return minimum edit distance\\n    pass', '[{\"input\":\"horse\\\\nros\",\"output\":\"3\"},{\"input\":\"intention\\\\nexecution\",\"output\":\"5\"}]', '2026-02-17 16:55:07', '2026-02-17 16:55:07'),
(88, 2, 'Coin Change (Min Coins) (Seeded)', 'Find the fewest number of coins needed to make up a given amount.', 'hard', 'Dynamic Programming', 'Coins list and amount', 'Minimum coins or -1', '1 ≤ len(coins) ≤ 12', '[1,5,10,25]\\n30', '2', 'def coin_change(coins, amount):\\n    # Return min coins needed, or -1 if impossible\\n    pass', '[{\"input\":\"[1,5,10,25]\\\\n30\",\"output\":\"2\"},{\"input\":\"[2]\\\\n3\",\"output\":\"-1\"}]', '2026-02-17 16:55:07', '2026-02-17 16:55:07'),
(89, 2, 'Trie Implementation (Seeded)', 'Implement a Trie with insert, search, and starts_with methods.', 'hard', 'Trees', 'List of operations', 'List of results', 'Words length ≤ 200', 'insert(apple)\\nsearch(apple)\\nstarts_with(app)', 'True\\nTrue', 'class Trie:\\n    def __init__(self):\\n        self.children = {}\\n        self.is_end = False\\n\\n    def insert(self, word):\\n        pass\\n\\n    def search(self, word):\\n        pass\\n\\n    def starts_with(self, prefix):\\n        pass', '[{\"input\":\"insert(apple)\\\\nsearch(apple)\",\"output\":\"True\"},{\"input\":\"insert(apple)\\\\nsearch(app)\",\"output\":\"False\"}]', '2026-02-17 16:55:07', '2026-02-17 16:55:07'),
(90, 2, 'Graph BFS Shortest Path (Seeded)', 'Find the shortest path between two nodes in an unweighted graph using BFS.', 'hard', 'Graphs', 'Adjacency list, start, end', 'Shortest path length', 'Nodes ≤ 10⁴', '{0:[1,2],1:[0,3],2:[0,3],3:[1,2]}\\n0\\n3', '2', 'def bfs_shortest(graph, start, end):\\n    # Return shortest path length using BFS\\n    pass', '[{\"input\":\"{0:[1,2],1:[0,3],2:[0,3],3:[1,2]}\\\\n0\\\\n3\",\"output\":\"2\"}]', '2026-02-17 16:55:07', '2026-02-17 16:55:07'),
(91, 2, 'Dijkstra Shortest Path (Seeded)', 'Implement Dijkstra\'s algorithm to find shortest distances from source to all nodes.', 'hard', 'Graphs', 'n, edges [[from,to,weight]], source', 'List of shortest distances', 'Nodes ≤ 10³', '4\\n[[0,1,4],[0,2,1],[2,1,2],[1,3,1],[2,3,5]]\\n0', '[0,3,1,4]', 'import heapq\\n\\ndef dijkstra(n, edges, source):\\n    # Return list of shortest distances from source\\n    pass', '[{\"input\":\"4\\\\n[[0,1,4],[0,2,1],[2,1,2],[1,3,1],[2,3,5]]\\\\n0\",\"output\":\"[0,3,1,4]\"}]', '2026-02-17 16:55:07', '2026-02-17 16:55:07'),
(92, 2, 'Topological Sort (Seeded)', 'Return a valid topological ordering of a directed acyclic graph.', 'hard', 'Graphs', 'n nodes, edges [[from, to]]', 'List of nodes in topological order', 'n ≤ 10⁴', '4\\n[[0,1],[0,2],[1,3],[2,3]]', '[0,2,1,3]', 'from collections import deque\\n\\ndef topo_sort(n, edges):\\n    # Return topological order using Kahn\'s algorithm\\n    pass', '[{\"input\":\"4\\\\n[[0,1],[0,2],[1,3],[2,3]]\",\"output\":\"[0,1,2,3] or [0,2,1,3]\"}]', '2026-02-17 16:55:07', '2026-02-17 16:55:07'),
(93, 2, 'Minimum Spanning Tree (Seeded)', 'Find the total weight of the minimum spanning tree of a weighted undirected graph.', 'hard', 'Graphs', 'n nodes, edges [[u,v,weight]]', 'Total MST weight', 'n ≤ 10³', '4\\n[[0,1,10],[0,2,6],[0,3,5],[1,3,15],[2,3,4]]', '19', 'def mst_weight(n, edges):\\n    # Return total weight of MST (Prim\'s or Kruskal\'s)\\n    pass', '[{\"input\":\"4\\\\n[[0,1,10],[0,2,6],[0,3,5],[1,3,15],[2,3,4]]\",\"output\":\"19\"}]', '2026-02-17 16:55:07', '2026-02-17 16:55:07'),
(94, 2, 'Rod Cutting (Seeded)', 'Given a rod of length n and price list, determine the maximum revenue from cutting.', 'hard', 'Dynamic Programming', 'Prices list, rod length n', 'Maximum revenue', 'n ≤ 100', '[1,5,8,9,10,17,17,20]\\n8', '22', 'def rod_cut(prices, n):\\n    # Return max revenue from cutting rod of length n\\n    pass', '[{\"input\":\"[1,5,8,9,10,17,17,20]\\\\n8\",\"output\":\"22\"}]', '2026-02-17 16:55:07', '2026-02-17 16:55:07'),
(95, 2, 'Matrix Chain Multiplication (Seeded)', 'Find the minimum number of scalar multiplications needed to multiply a chain of matrices.', 'hard', 'Dynamic Programming', 'List of matrix dimensions', 'Minimum multiplications', 'n ≤ 100', '[10,20,30,40,30]', '30000', 'def matrix_chain(dims):\\n    # Return minimum scalar multiplications\\n    pass', '[{\"input\":\"[10,20,30,40,30]\",\"output\":\"30000\"},{\"input\":\"[40,20,30,10,30]\",\"output\":\"26000\"}]', '2026-02-17 16:55:07', '2026-02-17 16:55:07'),
(96, 2, 'Word Break (Seeded)', 'Given a string and a dictionary, determine if the string can be segmented into dictionary words.', 'hard', 'Dynamic Programming', 'String and list of dictionary words', 'True or False', '1 ≤ len(s) ≤ 300', 'leetcode\\n[leet,code]', 'True', 'def word_break(s, word_dict):\\n    # Return True if s can be segmented into dictionary words\\n    pass', '[{\"input\":\"leetcode\\\\n[leet,code]\",\"output\":\"True\"},{\"input\":\"catsandog\\\\n[cats,dog,sand,and,cat]\",\"output\":\"False\"}]', '2026-02-17 16:55:07', '2026-02-17 16:55:07');

-- --------------------------------------------------------

--
-- Table structure for table `codingsubmissions`
--

CREATE TABLE `codingsubmissions` (
  `id` int(11) NOT NULL,
  `problemId` int(11) NOT NULL,
  `studentId` int(11) NOT NULL,
  `code` text NOT NULL,
  `language` varchar(50) DEFAULT 'javascript',
  `status` enum('pending','accepted','wrongAnswer','runtimeError','timeLimitExceeded') DEFAULT 'pending',
  `executionTime` int(11) DEFAULT NULL COMMENT 'in ms',
  `memory` int(11) DEFAULT NULL COMMENT 'in KB',
  `submittedAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `codingsubmissions`
--

INSERT INTO `codingsubmissions` (`id`, `problemId`, `studentId`, `code`, `language`, `status`, `executionTime`, `memory`, `submittedAt`) VALUES
(3, 3, 10, 'a=5\nprint(a)', 'python', 'pending', NULL, NULL, '2026-02-16 03:55:24'),
(4, 3, 10, 'a=5\nprint(a)', 'python', 'pending', NULL, NULL, '2026-02-16 03:55:27'),
(5, 3, 10, 'a=5\nprint(a)', 'python', 'pending', NULL, NULL, '2026-02-16 03:55:28'),
(6, 3, 10, 'a=5\nprinf(s)', 'python', 'pending', NULL, NULL, '2026-02-16 03:55:46'),
(7, 53, 10, '# Write your solution here\ndef is_palindrome(s: str) -> bool:\n    left = 0\n    right = len(s) - 1\n    \n    while left < right:\n        if s[left] != s[right]:\n            return False\n        left += 1\n        right -= 1\n        \n    return True\n\n# Example Usage\nprint(is_palindrome(\"racecar\")) # Output: True\nprint(is_palindrome(\"hello\"))   # Output: False', 'python', 'accepted', NULL, NULL, '2026-02-17 16:57:32');

-- --------------------------------------------------------

--
-- Table structure for table `contactmessages`
--

CREATE TABLE `contactmessages` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `subject` varchar(255) DEFAULT NULL,
  `message` text NOT NULL,
  `isRead` tinyint(1) DEFAULT 0,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `coursecontent`
--

CREATE TABLE `coursecontent` (
  `id` int(11) NOT NULL,
  `courseId` int(11) NOT NULL,
  `subjectId` int(11) DEFAULT NULL,
  `title` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `contentType` enum('video','pdf','text') DEFAULT 'text',
  `contentData` text DEFAULT NULL COMMENT 'URL for video, file path for PDF, text content for text',
  `sortOrder` int(11) DEFAULT 0,
  `status` enum('active','inactive') DEFAULT 'active',
  `uploadedBy` int(11) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `coursecontent`
--

INSERT INTO `coursecontent` (`id`, `courseId`, `subjectId`, `title`, `description`, `contentType`, `contentData`, `sortOrder`, `status`, `uploadedBy`, `createdAt`, `updatedAt`) VALUES
(1, 7, 1, 'Introduction to HTML', 'Watch this introductory video about HTML basics', 'video', 'https://www.youtube.com/watch?v=qz0aGYrrlhU', 1, 'active', 2, '2026-02-15 10:31:21', '2026-02-15 10:31:21'),
(2, 7, 1, 'HTML Elements Reference', 'Complete reference of all HTML5 elements and their attributes', 'text', 'HTML (HyperText Markup Language) is the standard markup language for creating web pages. Every HTML page has a structure that includes DOCTYPE, html, head, and body tags. Common elements include headings (h1-h6), paragraphs (p), links (a), images (img), and divs.', 2, 'active', 2, '2026-02-15 10:31:21', '2026-02-15 10:31:21'),
(3, 7, 2, 'CSS Crash Course', 'Complete CSS tutorial from basics to advanced', 'video', 'https://www.youtube.com/watch?v=yfoY53QXEnI', 1, 'active', 2, '2026-02-15 10:31:21', '2026-02-15 10:31:21'),
(4, 8, 4, 'JavaScript DOM Tutorial', 'Learn to manipulate HTML elements with JavaScript', 'video', 'https://www.youtube.com/watch?v=y17RuWkWdn8', 1, 'active', 2, '2026-02-15 13:13:39', '2026-02-15 13:13:39'),
(5, 8, 4, 'Async JavaScript Guide', 'Promises, async/await, and API calls', 'text', 'PROMISES\n========\nfetch(\"https://api.example.com/data\")\n  .then(res => res.json())\n  .then(data => console.log(data))\n  .catch(err => console.error(err));\n\nASYNC/AWAIT\n===========\nasync function getData() {\n  try {\n    const res = await fetch(url);\n    const data = await res.json();\n    return data;\n  } catch (err) {\n    console.error(err);\n  }\n}', 2, 'active', 2, '2026-02-15 13:13:39', '2026-02-15 13:13:39'),
(6, 8, 5, 'React Crash Course', 'Full React tutorial for beginners', 'video', 'https://www.youtube.com/watch?v=w7ejDZ8SWv8', 1, 'active', 2, '2026-02-15 13:13:39', '2026-02-15 13:13:39'),
(7, 14, 6, 'Getting Started with Python', 'Getting Started with Python', 'video', 'https://www.youtube.com/watch?v=kqtD5dpn9C8', 1, 'active', 2, '2026-02-15 13:13:39', '2026-02-15 13:13:39'),
(8, 14, 6, 'Python Variables & Types', 'Python Variables & Types', 'text', 'Python is dynamically typed. You dont need to declare variable types.\n\nCommon types:\n- int: 42\n- float: 3.14\n- str: \"hello\"\n- bool: True/False\n- list: [1,2,3]\n- dict: {\"key\": \"value\"}\n- tuple: (1,2,3)\n\nExample:\nname = \"Alice\"\nage = 25\npi = 3.14159\nis_student = True', 2, 'active', 2, '2026-02-15 13:13:39', '2026-02-15 13:13:39'),
(9, 14, 7, 'Control Flow in Python', 'Control Flow in Python', 'video', 'https://www.youtube.com/watch?v=Zp5MuPOtsSY', 1, 'active', 2, '2026-02-15 13:13:39', '2026-02-15 13:13:39'),
(10, 14, 7, 'Loop Examples', 'Loop Examples', 'text', '# For loop\nfor i in range(5):\n    print(i)  # 0, 1, 2, 3, 4\n\n# While loop\ncount = 0\nwhile count < 5:\n    print(count)\n    count += 1\n\n# List comprehension\nsquares = [x**2 for x in range(10)]\n\n# Nested loop\nfor i in range(3):\n    for j in range(3):\n        print(f\"({i},{j})\", end=\" \")', 2, 'active', 2, '2026-02-15 13:13:39', '2026-02-15 13:13:39'),
(11, 14, 8, 'Functions Tutorial', 'Functions Tutorial', 'video', 'https://www.youtube.com/watch?v=9Os0o3wzS_I', 1, 'active', 2, '2026-02-15 13:13:40', '2026-02-15 13:13:40'),
(12, 14, 8, 'Function Reference', 'Function Reference', 'text', '# Basic function\ndef greet(name):\n    return f\"Hello, {name}!\"\n\n# Default parameters\ndef power(base, exp=2):\n    return base ** exp\n\n# *args and **kwargs\ndef flexible(*args, **kwargs):\n    print(args)    # tuple\n    print(kwargs)  # dict\n\n# Lambda\nsquare = lambda x: x ** 2\n\n# Map & Filter\nnums = [1,2,3,4,5]\nevens = list(filter(lambda x: x%2==0, nums))\ndoubled = list(map(lambda x: x*2, nums))', 2, 'active', 2, '2026-02-15 13:13:40', '2026-02-15 13:13:40'),
(13, 14, 9, 'OOP Concepts', 'OOP Concepts', 'video', 'https://www.youtube.com/watch?v=JeznW_7DlB0', 1, 'active', 2, '2026-02-15 13:13:40', '2026-02-15 13:13:40'),
(14, 14, 9, 'OOP Code Examples', 'OOP Code Examples', 'text', 'class Animal:\n    def __init__(self, name, species):\n        self.name = name\n        self.species = species\n    \n    def speak(self):\n        return \"...\"\n\nclass Dog(Animal):\n    def __init__(self, name, breed):\n        super().__init__(name, \"Canine\")\n        self.breed = breed\n    \n    def speak(self):\n        return \"Woof!\"\n\n# Usage\ndog = Dog(\"Buddy\", \"Labrador\")\nprint(dog.speak())  # Woof!\nprint(dog.species)  # Canine', 2, 'active', 2, '2026-02-15 13:13:40', '2026-02-15 13:13:40'),
(15, 14, 10, 'File Handling Guide', 'File Handling Guide', 'text', '# Reading a file\nwith open(\"data.txt\", \"r\") as f:\n    content = f.read()\n    # or line by line:\n    # for line in f:\n    #     print(line.strip())\n\n# Writing a file\nwith open(\"output.txt\", \"w\") as f:\n    f.write(\"Hello World\\n\")\n\n# Error handling\ntry:\n    result = 10 / 0\nexcept ZeroDivisionError as e:\n    print(f\"Error: {e}\")\nexcept Exception as e:\n    print(f\"Unexpected: {e}\")\nfinally:\n    print(\"Done\")', 1, 'active', 2, '2026-02-15 13:13:40', '2026-02-15 13:13:40'),
(16, 15, 11, 'Arrays & Strings Overview', 'Arrays & Strings Overview', 'video', 'https://www.youtube.com/watch?v=HdFG8L1sajw', 1, 'active', 2, '2026-02-15 13:13:40', '2026-02-15 13:13:40'),
(17, 15, 11, 'Key Patterns', 'Key Patterns', 'text', 'TWO POINTER TECHNIQUE\n======================\nUsed when array is sorted or when comparing elements.\n\nExample: Two Sum (sorted array)\ndef twoSum(arr, target):\n    left, right = 0, len(arr) - 1\n    while left < right:\n        s = arr[left] + arr[right]\n        if s == target: return [left, right]\n        elif s < target: left += 1\n        else: right -= 1\n\nSLIDING WINDOW\n==============\nUsed for subarray/substring problems.\n\nExample: Max sum subarray of size k\ndef maxSum(arr, k):\n    window = sum(arr[:k])\n    best = window\n    for i in range(k, len(arr)):\n        window += arr[i] - arr[i-k]\n        best = max(best, window)\n    return best', 2, 'active', 2, '2026-02-15 13:13:40', '2026-02-15 13:13:40'),
(18, 15, 12, 'Linked Lists Explained', 'Linked Lists Explained', 'video', 'https://www.youtube.com/watch?v=njTh_OwMljA', 1, 'active', 2, '2026-02-15 13:13:40', '2026-02-15 13:13:40'),
(19, 15, 12, 'Linked List Implementation', 'Linked List Implementation', 'text', 'class Node:\n    def __init__(self, data):\n        self.data = data\n        self.next = None\n\nclass LinkedList:\n    def __init__(self):\n        self.head = None\n    \n    def append(self, data):\n        new_node = Node(data)\n        if not self.head:\n            self.head = new_node\n            return\n        curr = self.head\n        while curr.next:\n            curr = curr.next\n        curr.next = new_node\n    \n    def reverse(self):\n        prev = None\n        curr = self.head\n        while curr:\n            next_temp = curr.next\n            curr.next = prev\n            prev = curr\n            curr = next_temp\n        self.head = prev', 2, 'active', 2, '2026-02-15 13:13:40', '2026-02-15 13:13:40'),
(20, 15, 13, 'Stacks & Queues Tutorial', 'Stacks & Queues Tutorial', 'video', 'https://www.youtube.com/watch?v=wjI1WNcIntg', 1, 'active', 2, '2026-02-15 13:13:40', '2026-02-15 13:13:40'),
(21, 15, 14, 'Trees & Graphs Visual Guide', 'Trees & Graphs Visual Guide', 'video', 'https://www.youtube.com/watch?v=oSWTXtMglKE', 1, 'active', 2, '2026-02-15 13:13:40', '2026-02-15 13:13:40'),
(22, 15, 14, 'Tree & Graph Concepts', 'Tree & Graph Concepts', 'text', 'BINARY SEARCH TREE (BST)\n========================\nLeft child < Parent < Right child\n\nInsertion: O(log n) average\nSearch: O(log n) average\nDeletion: O(log n) average\n\nTraversals:\n- Inorder (L, Root, R): Sorted order\n- Preorder (Root, L, R): Copy tree\n- Postorder (L, R, Root): Delete tree\n- Level order: BFS with queue\n\nGRAPH REPRESENTATION\n====================\nAdjacency List: Space O(V+E)\n  graph = {0: [1,2], 1: [0,3], ...}\n\nAdjacency Matrix: Space O(V²)\n  matrix[i][j] = 1 if edge exists\n\nBFS: Queue-based, level by level\nDFS: Stack/recursion, depth first', 2, 'active', 2, '2026-02-15 13:13:40', '2026-02-15 13:13:40'),
(23, 15, 15, 'Sorting Algorithms Comparison', 'Sorting Algorithms Comparison', 'video', 'https://www.youtube.com/watch?v=kPRA0W1kECg', 1, 'active', 2, '2026-02-15 13:13:40', '2026-02-15 13:13:40'),
(24, 16, 16, 'React in 100 Seconds', 'React in 100 Seconds', 'video', 'https://www.youtube.com/watch?v=Tn6-PIqc4UM', 1, 'active', 3, '2026-02-15 13:13:40', '2026-02-15 13:13:40'),
(25, 16, 16, 'React Basics', 'React Basics', 'text', 'REACT COMPONENT\n================\nfunction Greeting({ name }) {\n  return <h1>Hello, {name}!</h1>;\n}\n\nSTATE WITH HOOKS\n=================\nconst [count, setCount] = useState(0);\n\nreturn (\n  <div>\n    <p>Count: {count}</p>\n    <button onClick={() => setCount(count + 1)}>\n      Increment\n    </button>\n  </div>\n);', 2, 'active', 3, '2026-02-15 13:13:40', '2026-02-15 13:13:40'),
(26, 16, 17, 'React Hooks Explained', 'React Hooks Explained', 'video', 'https://www.youtube.com/watch?v=TNhaISOUy6Q', 1, 'active', 3, '2026-02-15 13:13:40', '2026-02-15 13:13:40'),
(27, 16, 17, 'Hooks Cheat Sheet', 'Hooks Cheat Sheet', 'text', 'useState — State management\nconst [value, setValue] = useState(initial);\n\nuseEffect — Side effects\nuseEffect(() => {\n  // runs after render\n  return () => { /* cleanup */ };\n}, [dependencies]);\n\nuseRef — Mutable ref / DOM access\nconst ref = useRef(null);\n<input ref={ref} />\n\nuseMemo — Memoize expensive computation\nconst result = useMemo(() => expensiveFn(a, b), [a, b]);\n\nuseCallback — Memoize function reference\nconst handler = useCallback(() => { ... }, [deps]);', 2, 'active', 3, '2026-02-15 13:13:40', '2026-02-15 13:13:40'),
(28, 16, 18, 'React Router v6 Tutorial', 'React Router v6 Tutorial', 'video', 'https://www.youtube.com/watch?v=Ul3y1LXxzdU', 1, 'active', 3, '2026-02-15 13:13:40', '2026-02-15 13:13:40'),
(29, 16, 19, 'API Calls in React', 'API Calls in React', 'text', 'FETCHING DATA\n==============\nconst [data, setData] = useState(null);\nconst [loading, setLoading] = useState(true);\n\nuseEffect(() => {\n  fetch(\"/api/items\")\n    .then(res => res.json())\n    .then(json => {\n      setData(json);\n      setLoading(false);\n    })\n    .catch(err => console.error(err));\n}, []);\n\nFORM HANDLING\n=============\nconst [form, setForm] = useState({ name: \"\", email: \"\" });\n\nconst handleChange = (e) => {\n  setForm({ ...form, [e.target.name]: e.target.value });\n};\n\nconst handleSubmit = async (e) => {\n  e.preventDefault();\n  await fetch(\"/api/submit\", {\n    method: \"POST\",\n    headers: { \"Content-Type\": \"application/json\" },\n    body: JSON.stringify(form)\n  });\n};', 1, 'active', 3, '2026-02-15 13:13:40', '2026-02-15 13:13:40'),
(30, 17, 20, 'Database Design Tutorial', 'Database Design Tutorial', 'video', 'https://www.youtube.com/watch?v=ztHopE5Wnpc', 1, 'active', 3, '2026-02-15 13:13:40', '2026-02-15 13:13:40'),
(31, 17, 20, 'Normalization Guide', 'Normalization Guide', 'text', 'DATABASE NORMALIZATION\n======================\n\n1NF: No repeating groups, atomic values\n  ✗ courses = \"Math, Science\"  \n  ✓ Separate rows for each course\n\n2NF: 1NF + No partial dependencies\n  Every non-key attribute depends on the WHOLE primary key\n\n3NF: 2NF + No transitive dependencies\n  Non-key attributes depend ONLY on the primary key\n\nBCNF: For every dependency X→Y, X is a superkey\n\nExample:\nStudents(id PK, name, email)\nCourses(id PK, title, dept)\nEnrollments(studentId FK, courseId FK, grade)', 2, 'active', 3, '2026-02-15 13:13:40', '2026-02-15 13:13:40'),
(32, 17, 21, 'SQL in 1 Hour', 'SQL in 1 Hour', 'video', 'https://www.youtube.com/watch?v=HXV3zeQKqGY', 1, 'active', 3, '2026-02-15 13:13:40', '2026-02-15 13:13:40'),
(33, 17, 21, 'SQL Cheat Sheet', 'SQL Cheat Sheet', 'text', '-- SELECT\nSELECT name, email FROM users WHERE age > 18 ORDER BY name;\n\n-- JOIN\nSELECT u.name, c.title\nFROM users u\nJOIN enrollments e ON u.id = e.student_id\nJOIN courses c ON e.course_id = c.id;\n\n-- GROUP BY\nSELECT dept, COUNT(*) as total, AVG(salary) as avg_sal\nFROM employees\nGROUP BY dept\nHAVING COUNT(*) > 5;\n\n-- Subquery\nSELECT * FROM employees\nWHERE salary > (SELECT AVG(salary) FROM employees);', 2, 'active', 3, '2026-02-15 13:13:40', '2026-02-15 13:13:40'),
(34, 17, 22, 'Transactions & ACID', 'Transactions & ACID', 'text', 'ACID PROPERTIES\n================\nAtomicity: All or nothing\nConsistency: Valid state to valid state\nIsolation: Concurrent transactions don\'t interfere\nDurability: Committed data persists\n\nTRANSACTION CONTROL\n===================\nSTART TRANSACTION;\n  UPDATE accounts SET balance = balance - 100 WHERE id = 1;\n  UPDATE accounts SET balance = balance + 100 WHERE id = 2;\nCOMMIT;\n-- or ROLLBACK; on error\n\nINDEXING\n========\nCREATE INDEX idx_email ON users(email);\n-- B-Tree index: O(log n) lookups\n-- Speeds up: WHERE, JOIN, ORDER BY\n-- Slows down: INSERT, UPDATE, DELETE', 1, 'active', 3, '2026-02-15 13:13:40', '2026-02-15 13:13:40'),
(35, 18, 23, 'ML Crash Course', 'ML Crash Course', 'video', 'https://www.youtube.com/watch?v=ukzFI9rgwfU', 1, 'active', 4, '2026-02-15 13:13:40', '2026-02-15 13:13:40'),
(36, 18, 23, 'ML Overview', 'ML Overview', 'text', 'TYPES OF MACHINE LEARNING\n=========================\n\n1. Supervised Learning\n   - Labeled data: input → output\n   - Classification: spam/not spam\n   - Regression: predict house price\n\n2. Unsupervised Learning\n   - Unlabeled data: find patterns\n   - Clustering: customer segments\n   - Dimensionality Reduction: PCA\n\n3. Reinforcement Learning\n   - Agent learns by reward/penalty\n   - Games, robotics, self-driving\n\nWORKFLOW\n========\n1. Collect Data\n2. Clean & Preprocess\n3. Feature Engineering\n4. Train Model\n5. Evaluate (accuracy, precision, recall)\n6. Tune Hyperparameters\n7. Deploy', 2, 'active', 4, '2026-02-15 13:13:40', '2026-02-15 13:13:40'),
(37, 18, 24, 'Linear Regression Explained', 'Linear Regression Explained', 'video', 'https://www.youtube.com/watch?v=nk2CQITm_eo', 1, 'active', 4, '2026-02-15 13:13:40', '2026-02-15 13:13:40'),
(38, 18, 25, 'Clustering Algorithms', 'Clustering Algorithms', 'text', 'K-MEANS CLUSTERING\n==================\n1. Choose K centroids randomly\n2. Assign each point to nearest centroid\n3. Recalculate centroids as mean of cluster\n4. Repeat until convergence\n\nfrom sklearn.cluster import KMeans\n\nkmeans = KMeans(n_clusters=3)\nkmeans.fit(X)\nlabels = kmeans.predict(X)\ncenters = kmeans.cluster_centers_\n\nChoosing K: Elbow Method\n- Plot inertia (within-cluster sum of squares)\n- Look for \"elbow\" bend point', 1, 'active', 4, '2026-02-15 13:13:40', '2026-02-15 13:13:40'),
(39, 18, 26, 'Neural Networks Intro', 'Neural Networks Intro', 'video', 'https://www.youtube.com/watch?v=aircAruvnKk', 1, 'active', 4, '2026-02-15 13:13:40', '2026-02-15 13:13:40'),
(40, 19, 27, 'Node.js Tutorial', 'Node.js Tutorial', 'video', 'https://www.youtube.com/watch?v=TlB_eWDSMt4', 1, 'active', 2, '2026-02-15 13:13:40', '2026-02-15 13:13:40'),
(41, 19, 28, 'Express REST API Guide', 'Express REST API Guide', 'text', 'import express from \"express\";\nconst app = express();\n\napp.use(express.json());\n\n// GET all items\napp.get(\"/api/items\", (req, res) => {\n  res.json({ items: [] });\n});\n\n// POST create item\napp.post(\"/api/items\", (req, res) => {\n  const { name, price } = req.body;\n  // validate, save to DB\n  res.status(201).json({ id: 1, name, price });\n});\n\n// Error middleware\napp.use((err, req, res, next) => {\n  console.error(err.stack);\n  res.status(500).json({ error: \"Server error\" });\n});\n\napp.listen(5000, () => console.log(\"Running on :5000\"));', 1, 'active', 2, '2026-02-15 13:13:40', '2026-02-15 13:13:40'),
(42, 19, 29, 'JWT Authentication', 'JWT Authentication', 'text', 'JSON WEB TOKENS (JWT)\n=====================\n\nimport jwt from \"jsonwebtoken\";\nimport bcrypt from \"bcryptjs\";\n\n// Register\nconst hash = await bcrypt.hash(password, 10);\n// Save hash to DB\n\n// Login\nconst valid = await bcrypt.compare(password, hash);\nif (valid) {\n  const token = jwt.sign(\n    { userId: user.id, role: user.role },\n    process.env.JWT_SECRET,\n    { expiresIn: \"24h\" }\n  );\n  res.json({ token });\n}\n\n// Middleware\nfunction authenticate(req, res, next) {\n  const token = req.headers.authorization?.split(\" \")[1];\n  const decoded = jwt.verify(token, process.env.JWT_SECRET);\n  req.user = decoded;\n  next();\n}', 1, 'active', 2, '2026-02-15 13:13:40', '2026-02-15 13:13:40'),
(43, 20, 30, 'Java Introduction', 'Java Introduction', 'video', 'https://www.youtube.com/watch?v=eIrMbAQSU34', 1, 'active', 4, '2026-02-15 13:13:40', '2026-02-15 13:13:40'),
(44, 20, 30, 'Java Syntax Guide', 'Java Syntax Guide', 'text', 'public class Main {\n    public static void main(String[] args) {\n        // Variables\n        int age = 25;\n        String name = \"Alice\";\n        double gpa = 3.85;\n        boolean isActive = true;\n        \n        // Array\n        int[] numbers = {1, 2, 3, 4, 5};\n        \n        // For loop\n        for (int i = 0; i < numbers.length; i++) {\n            System.out.println(numbers[i]);\n        }\n        \n        // Enhanced for\n        for (int num : numbers) {\n            System.out.println(num);\n        }\n        \n        // Method call\n        int result = add(10, 20);\n    }\n    \n    static int add(int a, int b) {\n        return a + b;\n    }\n}', 2, 'active', 4, '2026-02-15 13:13:40', '2026-02-15 13:13:40'),
(45, 20, 31, 'Java OOP', 'Java OOP', 'text', '// Class definition\npublic class Animal {\n    protected String name;\n    \n    public Animal(String name) {\n        this.name = name;\n    }\n    \n    public void speak() {\n        System.out.println(\"...\");\n    }\n}\n\n// Inheritance\npublic class Dog extends Animal {\n    private String breed;\n    \n    public Dog(String name, String breed) {\n        super(name);\n        this.breed = breed;\n    }\n    \n    @Override\n    public void speak() {\n        System.out.println(\"Woof!\");\n    }\n}\n\n// Interface\npublic interface Drawable {\n    void draw();\n}\n\npublic class Circle implements Drawable {\n    public void draw() { ... }\n}', 1, 'active', 4, '2026-02-15 13:13:40', '2026-02-15 13:13:40'),
(46, 20, 32, 'Java Collections', 'Java Collections', 'video', 'https://www.youtube.com/watch?v=viTainYq5B4', 1, 'active', 4, '2026-02-15 13:13:40', '2026-02-15 13:13:40'),
(47, 21, 33, 'Agile & Scrum Overview', 'Agile & Scrum Overview', 'text', 'AGILE PRINCIPLES\n=================\n- Individuals and interactions over processes\n- Working software over documentation\n- Customer collaboration over contracts\n- Responding to change over following a plan\n\nSCRUM FRAMEWORK\n===============\nRoles: Product Owner, Scrum Master, Dev Team\nArtifacts: Product Backlog, Sprint Backlog, Increment\nCeremonies:\n  1. Sprint Planning (what to build)\n  2. Daily Standup (15 min sync)\n  3. Sprint Review (demo)\n  4. Sprint Retrospective (improve)\n\nSprint: 1-4 week iteration\nVelocity: Story points completed per sprint', 1, 'active', 3, '2026-02-15 13:13:40', '2026-02-15 13:13:40'),
(48, 21, 34, 'Git & GitHub Guide', 'Git & GitHub Guide', 'text', 'GIT ESSENTIALS\n===============\ngit init              # Initialize repo\ngit add .             # Stage all files\ngit commit -m \"msg\"   # Commit\ngit branch feature    # Create branch\ngit checkout feature  # Switch branch\ngit merge feature     # Merge into current\ngit push origin main  # Push to remote\n\nBRANCHING STRATEGY\n==================\nmain ← develop ← feature/xxx\n              ← bugfix/xxx\n              ← hotfix/xxx\n\nCI/CD PIPELINE\n==============\n1. Developer pushes code\n2. CI server pulls & builds\n3. Run automated tests\n4. Static code analysis\n5. Deploy to staging\n6. Manual approval\n7. Deploy to production', 1, 'active', 3, '2026-02-15 13:13:40', '2026-02-15 13:13:40'),
(49, 21, 35, 'Design Patterns Tutorial', 'Design Patterns Tutorial', 'video', 'https://www.youtube.com/watch?v=v9ejT8FO-7I', 1, 'active', 3, '2026-02-15 13:13:40', '2026-02-15 13:13:40'),
(50, 22, 36, 'Networking Fundamentals', 'Networking Fundamentals', 'video', 'https://www.youtube.com/watch?v=3QhU9jd03a0', 1, 'active', 4, '2026-02-15 13:13:40', '2026-02-15 13:13:40'),
(51, 22, 36, 'OSI Model Reference', 'OSI Model Reference', 'text', 'OSI 7 LAYERS\n=============\n7. Application  - HTTP, FTP, SMTP, DNS\n6. Presentation - SSL/TLS, encryption, compression\n5. Session      - Session management, authentication\n4. Transport    - TCP (reliable), UDP (fast)\n3. Network      - IP, routing, ICMP\n2. Data Link    - MAC, Ethernet, switches\n1. Physical     - Cables, signals, hubs\n\nTCP vs UDP\n==========\nTCP: Connection-oriented, reliable, ordered\n     Used for: HTTP, email, file transfer\n\nUDP: Connectionless, fast, no guarantee\n     Used for: streaming, gaming, DNS\n\nIP ADDRESSING (IPv4)\n====================\nFormat: 192.168.1.100\nClasses: A (1-126), B (128-191), C (192-223)\nSubnet: 255.255.255.0 = /24 = 254 hosts', 2, 'active', 4, '2026-02-15 13:13:40', '2026-02-15 13:13:40'),
(52, 22, 37, 'HTTP Protocol Explained', 'HTTP Protocol Explained', 'text', 'HTTP METHODS\n=============\nGET    - Retrieve resource\nPOST   - Create resource\nPUT    - Update resource (full)\nPATCH  - Update resource (partial)\nDELETE - Remove resource\n\nSTATUS CODES\n============\n200 OK\n201 Created\n301 Moved Permanently\n400 Bad Request\n401 Unauthorized\n403 Forbidden\n404 Not Found\n500 Internal Server Error\n\nHTTPS = HTTP + TLS\n- Encrypts data in transit\n- Certificate-based authentication\n- Prevents man-in-the-middle attacks', 1, 'active', 4, '2026-02-15 13:13:40', '2026-02-15 13:13:40'),
(53, 23, 38, 'Processes & Threads', 'Processes & Threads', 'video', 'https://www.youtube.com/watch?v=exbKr6fnoUw', 1, 'active', 2, '2026-02-15 13:13:40', '2026-02-15 13:13:40'),
(54, 23, 38, 'Process Management Notes', 'Process Management Notes', 'text', 'PROCESS STATES\n===============\nNew → Ready → Running → Waiting → Ready → Terminated\n\nPROCESS vs THREAD\n==================\nProcess: Independent, separate memory, heavy\nThread: Shares memory with parent, lightweight\n\nCONTEXT SWITCH\n===============\n- Save state of current process (PCB)\n- Load state of next process\n- Overhead: ~1-10 microseconds\n\nIPC (Inter-Process Communication)\n==================================\n1. Pipes (unidirectional)\n2. Message Queues\n3. Shared Memory\n4. Sockets\n5. Signals', 2, 'active', 2, '2026-02-15 13:13:40', '2026-02-15 13:13:40'),
(55, 23, 39, 'CPU Scheduling Algorithms', 'CPU Scheduling Algorithms', 'text', 'SCHEDULING ALGORITHMS\n=====================\n\nFCFS (First Come First Serve)\n- Non-preemptive, simple\n- Convoy effect problem\n\nSJF (Shortest Job First)\n- Optimal average waiting time\n- Starvation possible\n\nRound Robin\n- Time quantum (e.g., 4ms)\n- Preemptive, fair\n- Higher context switch overhead\n\nPriority Scheduling\n- Each process has priority number\n- Can cause starvation\n- Solution: Aging\n\nMultilevel Queue\n- Separate queues for different types\n- System > Interactive > Batch', 1, 'active', 2, '2026-02-15 13:13:40', '2026-02-15 13:13:40'),
(56, 23, 40, 'Virtual Memory & Paging', 'Virtual Memory & Paging', 'video', 'https://www.youtube.com/watch?v=sJCtpPQDJYw', 1, 'active', 2, '2026-02-15 13:13:40', '2026-02-15 13:13:40'),
(57, 9, 41, 'Statistics for Data Science', 'Statistics for Data Science', 'video', 'https://www.youtube.com/watch?v=xxpc-HPKN28', 1, 'active', 2, '2026-02-15 13:13:40', '2026-02-15 13:13:40'),
(58, 9, 41, 'Statistics Fundamentals', 'Statistics Fundamentals', 'text', 'DESCRIPTIVE STATISTICS\n======================\nMean: Average of all values\nMedian: Middle value when sorted\nMode: Most frequent value\nStd Dev: Spread of data around mean\n\nPROBABILITY\n===========\nP(A) = favorable outcomes / total outcomes\nP(A ∪ B) = P(A) + P(B) - P(A ∩ B)\nP(A|B) = P(A ∩ B) / P(B)  [Bayes theorem]\n\nDISTRIBUTIONS\n==============\nNormal: Bell curve, 68-95-99.7 rule\nBinomial: n trials, p probability\nPoisson: Events in fixed interval', 2, 'active', 2, '2026-02-15 13:13:40', '2026-02-15 13:13:40'),
(59, 9, 42, 'Pandas Tutorial', 'Pandas Tutorial', 'video', 'https://www.youtube.com/watch?v=vmEHCJofslg', 1, 'active', 2, '2026-02-15 13:13:40', '2026-02-15 13:13:40'),
(60, 9, 42, 'Pandas Cheat Sheet', 'Pandas Cheat Sheet', 'text', 'import pandas as pd\nimport numpy as np\n\n# Read data\ndf = pd.read_csv(\"data.csv\")\n\n# Explore\ndf.head()          # First 5 rows\ndf.info()          # Column types\ndf.describe()      # Statistics\ndf.shape           # (rows, cols)\n\n# Select\ndf[\"column\"]       # Single column\ndf[[\"col1\",\"col2\"]]# Multiple columns\ndf[df[\"age\"] > 25] # Filter rows\n\n# Clean\ndf.dropna()        # Remove NaN rows\ndf.fillna(0)       # Fill NaN with 0\ndf.duplicated()    # Find duplicates\n\n# Group\ndf.groupby(\"dept\")[\"salary\"].mean()\n\n# Plot\ndf[\"salary\"].hist()\ndf.plot(kind=\"scatter\", x=\"age\", y=\"salary\")', 2, 'active', 2, '2026-02-15 13:13:40', '2026-02-15 13:13:40'),
(61, 9, 43, 'Data Visualization Guide', 'Data Visualization Guide', 'text', 'CHART TYPES\n============\nBar Chart: Compare categories\nLine Chart: Trends over time\nScatter Plot: Relationships\nHistogram: Distribution\nBox Plot: Spread & outliers\nHeatmap: Correlation matrix\nPie Chart: Proportions (use sparingly)\n\nimport matplotlib.pyplot as plt\n\nfig, ax = plt.subplots(figsize=(10, 6))\nax.bar(categories, values, color=\"steelblue\")\nax.set_title(\"Sales by Category\")\nax.set_xlabel(\"Category\")\nax.set_ylabel(\"Sales ($)\")\nplt.tight_layout()\nplt.show()', 1, 'active', 2, '2026-02-15 13:13:40', '2026-02-15 13:13:40'),
(62, 9, 44, 'ML with Scikit-learn', 'ML with Scikit-learn', 'video', 'https://www.youtube.com/watch?v=pqNCD_5r0IU', 1, 'active', 2, '2026-02-15 13:13:40', '2026-02-15 13:13:40'),
(63, 10, 45, 'SEO Fundamentals', 'SEO Fundamentals', 'video', 'https://www.youtube.com/watch?v=DvwS7cV9GmQ', 1, 'active', 3, '2026-02-15 13:13:40', '2026-02-15 13:13:40'),
(64, 10, 45, 'SEO Checklist', 'SEO Checklist', 'text', 'SEO CHECKLIST\n==============\n\nON-PAGE SEO\n- Title tag (50-60 chars, keyword first)\n- Meta description (150-160 chars)\n- H1, H2, H3 tags with keywords\n- Internal linking\n- Image alt tags\n- URL structure (/topic-keyword)\n- Mobile-friendly design\n- Page speed < 3 seconds\n\nCONTENT STRATEGY\n- Research keywords (Google Keyword Planner)\n- Create pillar content + clusters\n- E-A-T: Expertise, Authority, Trust\n- Update content regularly\n- 1500+ words for competitive topics\n\nTOOLS\n- Google Search Console\n- Google Analytics\n- Ahrefs / SEMrush\n- Yoast SEO (WordPress)', 2, 'active', 3, '2026-02-15 13:13:40', '2026-02-15 13:13:40'),
(65, 10, 46, 'Social Media Strategy', 'Social Media Strategy', 'text', 'PLATFORM OVERVIEW\n==================\nInstagram: Visual, 18-34 age, Reels perform well\nLinkedIn: B2B, professional content, articles\nTwitter/X: News, conversations, threads\nYouTube: Long-form video, tutorials, SEO\nTikTok: Short-form, Gen Z, trending audio\n\nCONTENT MIX\n============\n80% Value (educate, entertain, inspire)\n20% Promotional\n\nENGAGEMENT FORMULA\n===================\n1. Hook (first 3 seconds)\n2. Value (teach something)\n3. CTA (comment, share, follow)\n\nKEY METRICS\n===========\n- Reach & Impressions\n- Engagement Rate = (likes+comments+shares)/reach\n- Click-through Rate (CTR)\n- Conversion Rate\n- Follower Growth Rate', 1, 'active', 3, '2026-02-15 13:13:40', '2026-02-15 13:13:40'),
(66, 10, 47, 'Email Marketing Guide', 'Email Marketing Guide', 'text', 'EMAIL MARKETING BEST PRACTICES\n================================\n\nSUBJECT LINES\n- Keep under 50 characters\n- Personalize with {first_name}\n- Create urgency or curiosity\n- A/B test different versions\n\nEMAIL STRUCTURE\n- Clear header with logo\n- Single CTA per email\n- Mobile-responsive design\n- Unsubscribe link (legally required)\n\nAUTOMATION SEQUENCES\n- Welcome series (3-5 emails)\n- Abandoned cart recovery\n- Re-engagement campaigns\n- Drip campaigns for nurturing\n\nKEY METRICS\n- Open Rate: 15-25% is good\n- Click Rate: 2-5% is good\n- Unsubscribe Rate: < 0.5%\n- Conversion Rate: Track per campaign', 1, 'active', 3, '2026-02-15 13:13:40', '2026-02-15 13:13:40'),
(67, 11, 48, 'UI Design Fundamentals', 'UI Design Fundamentals', 'video', 'https://www.youtube.com/watch?v=_Hp_dI0DzY4', 1, 'active', 3, '2026-02-15 13:13:40', '2026-02-15 13:13:40'),
(68, 11, 48, 'Design Principles Reference', 'Design Principles Reference', 'text', 'COLOR THEORY\n=============\nPrimary: Red, Blue, Yellow\nComplementary: Opposite on color wheel\nAnalogous: Adjacent on color wheel\n60-30-10 Rule: Primary-Secondary-Accent\n\nTYPOGRAPHY\n===========\n- Heading: Bold, larger, sans-serif\n- Body: Regular, 16px minimum, readable\n- Line height: 1.5-1.8x font size\n- Max 2-3 font families per project\n\nVISUAL HIERARCHY\n=================\n1. Size: Larger = more important\n2. Color: Bright/contrast = attention\n3. Position: Top-left first (F-pattern)\n4. Whitespace: Isolation = emphasis\n5. Alignment: Consistency = order\n\nGESTALT PRINCIPLES\n===================\n- Proximity: Close items = related\n- Similarity: Same style = grouped\n- Closure: Mind completes shapes\n- Continuity: Eye follows paths', 2, 'active', 3, '2026-02-15 13:13:40', '2026-02-15 13:13:40'),
(69, 11, 49, 'UX Research Methods', 'UX Research Methods', 'text', 'USER RESEARCH METHODS\n=====================\n\nQUANTITATIVE\n- Surveys (Google Forms, Typeform)\n- Analytics (heatmaps, click tracking)\n- A/B Testing\n\nQUALITATIVE\n- User Interviews (5-8 users)\n- Usability Testing (think-aloud protocol)\n- Card Sorting (information architecture)\n\nUSER PERSONA TEMPLATE\n=====================\nName: Sarah, 28, Marketing Manager\nGoals: Save time, automate reports\nFrustrations: Complex interfaces, slow loading\nTech: MacBook, iPhone, Chrome\nQuote: \"I need data at a glance\"\n\nWIREFRAMING TOOLS\n=================\n- Figma (free, collaborative)\n- Sketch (Mac only)\n- Adobe XD\n- Balsamiq (low-fidelity)', 1, 'active', 3, '2026-02-15 13:13:40', '2026-02-15 13:13:40'),
(70, 11, 50, 'Figma Crash Course', 'Figma Crash Course', 'video', 'https://www.youtube.com/watch?v=FTFaQWZBqQ8', 1, 'active', 3, '2026-02-15 13:13:40', '2026-02-15 13:13:40'),
(71, 12, 51, 'React Native Tutorial', 'React Native Tutorial', 'video', 'https://www.youtube.com/watch?v=0-S5a0eXPoc', 1, 'active', 4, '2026-02-15 13:13:40', '2026-02-15 13:13:40'),
(72, 12, 51, 'React Native Basics', 'React Native Basics', 'text', 'CORE COMPONENTS\n=================\nimport { View, Text, Image, ScrollView, TextInput, TouchableOpacity } from \"react-native\";\n\nexport default function App() {\n  return (\n    <View style={styles.container}>\n      <Text style={styles.title}>Hello React Native!</Text>\n      <TouchableOpacity style={styles.button}>\n        <Text>Press Me</Text>\n      </TouchableOpacity>\n    </View>\n  );\n}\n\nconst styles = StyleSheet.create({\n  container: {\n    flex: 1,\n    justifyContent: \"center\",\n    alignItems: \"center\",\n    backgroundColor: \"#fff\",\n  },\n  title: {\n    fontSize: 24,\n    fontWeight: \"bold\",\n  },\n  button: {\n    backgroundColor: \"#007AFF\",\n    padding: 12,\n    borderRadius: 8,\n  },\n});', 2, 'active', 4, '2026-02-15 13:13:40', '2026-02-15 13:13:40'),
(73, 12, 52, 'React Native API & State', 'React Native API & State', 'text', 'FETCHING DATA\n==============\nconst [users, setUsers] = useState([]);\nconst [loading, setLoading] = useState(true);\n\nuseEffect(() => {\n  fetch(\"https://jsonplaceholder.typicode.com/users\")\n    .then(r => r.json())\n    .then(data => { setUsers(data); setLoading(false); });\n}, []);\n\nFLATLIST\n========\nimport { FlatList } from \"react-native\";\n\n<FlatList\n  data={users}\n  keyExtractor={item => item.id.toString()}\n  renderItem={({ item }) => (\n    <View><Text>{item.name}</Text></View>\n  )}\n/>\n\nASYNC STORAGE\n=============\nimport AsyncStorage from \"@react-native-async-storage/async-storage\";\nawait AsyncStorage.setItem(\"token\", \"abc123\");\nconst token = await AsyncStorage.getItem(\"token\");', 1, 'active', 4, '2026-02-15 13:13:40', '2026-02-15 13:13:40'),
(74, 12, 53, 'Publishing Your App', 'Publishing Your App', 'video', 'https://www.youtube.com/watch?v=LE4Mgkrf7Sk', 1, 'active', 4, '2026-02-15 13:13:40', '2026-02-15 13:13:40'),
(75, 13, 54, 'Cybersecurity Introduction', 'Cybersecurity Introduction', 'video', 'https://www.youtube.com/watch?v=inWWhr5tnEA', 1, 'active', 4, '2026-02-15 13:13:40', '2026-02-15 13:13:40'),
(76, 13, 54, 'Security Concepts', 'Security Concepts', 'text', 'CIA TRIAD\n=========\nConfidentiality: Only authorized access\nIntegrity: Data is accurate and unmodified\nAvailability: Systems accessible when needed\n\nCOMMON THREATS\n==============\n- Malware (viruses, ransomware, trojans)\n- Phishing (fake emails/websites)\n- SQL Injection (malicious SQL input)\n- XSS (Cross-Site Scripting)\n- DDoS (Distributed Denial of Service)\n- Man-in-the-Middle (intercepting comms)\n- Social Engineering (human manipulation)\n\nSECURITY LAYERS\n===============\n1. Physical: Locks, cameras, badges\n2. Network: Firewalls, IDS/IPS, VPN\n3. Application: Input validation, auth\n4. Data: Encryption, backups\n5. User: Training, strong passwords, MFA', 2, 'active', 4, '2026-02-15 13:13:40', '2026-02-15 13:13:40'),
(77, 13, 55, 'Network Security Guide', 'Network Security Guide', 'text', 'FIREWALLS\n=========\n- Packet Filter: IP/port rules\n- Stateful: Tracks connections\n- Application Layer: Deep inspection\n- Next-Gen (NGFW): ML-based detection\n\nVPN (Virtual Private Network)\n==============================\n- Encrypts traffic between endpoints\n- Types: Site-to-Site, Remote Access\n- Protocols: OpenVPN, WireGuard, IPSec\n\nSSL/TLS HANDSHAKE\n==================\n1. Client Hello (supported ciphers)\n2. Server Hello (chosen cipher + cert)\n3. Key Exchange (asymmetric)\n4. Session Keys (symmetric)\n5. Encrypted communication begins\n\nIDS vs IPS\n==========\nIDS: Detects & alerts (passive)\nIPS: Detects & blocks (active)', 1, 'active', 4, '2026-02-15 13:13:40', '2026-02-15 13:13:40'),
(78, 13, 56, 'OWASP Top 10 Explained', 'OWASP Top 10 Explained', 'video', 'https://www.youtube.com/watch?v=rWHniC8FOzc', 1, 'active', 4, '2026-02-15 13:13:40', '2026-02-15 13:13:40'),
(79, 13, 56, 'Web Security Practices', 'Web Security Practices', 'text', 'SQL INJECTION PREVENTION\n=========================\n// BAD - vulnerable\nquery = \"SELECT * FROM users WHERE id = \" + userId;\n\n// GOOD - parameterized\ndb.query(\"SELECT * FROM users WHERE id = ?\", [userId]);\n\nXSS PREVENTION\n===============\n1. Escape output: &lt; &gt; &amp;\n2. Use Content-Security-Policy header\n3. Set HttpOnly cookies\n4. Sanitize user input (DOMPurify)\n\nCSRF PROTECTION\n================\n1. CSRF tokens in forms\n2. SameSite cookie attribute\n3. Check Origin/Referer headers\n\nSECURITY HEADERS\n=================\nX-Content-Type-Options: nosniff\nX-Frame-Options: DENY\nStrict-Transport-Security: max-age=31536000\nContent-Security-Policy: default-src self', 2, 'active', 4, '2026-02-15 13:13:40', '2026-02-15 13:13:40'),
(80, 7, 1, 'Introduction to HTML', 'Watch this introductory video about HTML basics', 'video', 'https://www.youtube.com/watch?v=qz0aGYrrlhU', 1, 'active', 2, '2026-02-17 16:53:42', '2026-02-17 16:53:42'),
(81, 7, 1, 'HTML Elements Reference', 'Complete reference of all HTML5 elements and their attributes', 'text', 'HTML (HyperText Markup Language) is the standard markup language for creating web pages. Every HTML page has a structure that includes DOCTYPE, html, head, and body tags. Common elements include headings (h1-h6), paragraphs (p), links (a), images (img), and divs.', 2, 'active', 2, '2026-02-17 16:53:42', '2026-02-17 16:53:42'),
(82, 7, 57, 'CSS Crash Course', 'Complete CSS tutorial from basics to advanced', 'video', 'https://www.youtube.com/watch?v=yfoY53QXEnI', 1, 'active', 2, '2026-02-17 16:53:42', '2026-02-17 16:53:42');

-- --------------------------------------------------------

--
-- Table structure for table `courseenrollments`
--

CREATE TABLE `courseenrollments` (
  `id` int(11) NOT NULL,
  `courseId` int(11) NOT NULL,
  `studentId` int(11) NOT NULL,
  `enrolledAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `completionPercentage` decimal(5,2) DEFAULT 0.00,
  `status` enum('active','completed','dropped') DEFAULT 'active',
  `completedTopics` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT '[]' CHECK (json_valid(`completedTopics`)),
  `completedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `courseenrollments`
--

INSERT INTO `courseenrollments` (`id`, `courseId`, `studentId`, `enrolledAt`, `completionPercentage`, `status`, `completedTopics`, `completedAt`) VALUES
(40, 18, 20, '2026-02-15 13:13:40', 2.00, 'active', '[]', NULL),
(41, 14, 20, '2026-02-15 13:13:40', 40.00, 'active', '[]', NULL),
(42, 15, 20, '2026-02-15 13:13:40', 25.00, 'active', '[]', NULL),
(58, 14, 10, '2026-02-16 13:37:56', 36.00, 'active', '[]', NULL),
(59, 15, 10, '2026-02-16 13:37:56', 2.00, 'active', '[]', NULL),
(60, 17, 20, '2026-02-16 13:37:56', 36.00, 'active', '[]', NULL),
(75, 16, 10, '2026-02-17 05:56:02', 100.00, 'completed', '[63,64,65,66,67,72,71,70,68,69,82,78,79,80,81,73,74,75,76,77]', '2026-02-17 19:20:47'),
(77, 17, 10, '2026-02-17 05:56:02', 19.00, 'active', '[]', NULL),
(79, 16, 20, '2026-02-17 05:56:02', 13.00, 'active', '[]', NULL),
(89, 7, 10, '2026-02-17 16:53:42', 66.00, 'active', '[]', NULL),
(90, 7, 20, '2026-02-17 16:53:42', 47.00, 'active', '[]', NULL),
(91, 1, 20, '2026-02-17 16:53:42', 53.00, 'active', '[]', NULL),
(92, 7, 26, '2026-02-17 16:53:42', 77.00, 'active', '[]', NULL),
(93, 1, 26, '2026-02-17 16:53:42', 74.00, 'active', '[]', NULL),
(94, 2, 26, '2026-02-17 16:53:42', 14.00, 'active', '[]', NULL),
(95, 7, 27, '2026-02-17 16:53:42', 17.00, 'active', '[]', NULL),
(96, 7, 28, '2026-02-17 16:53:42', 56.00, 'active', '[]', NULL),
(97, 1, 28, '2026-02-17 16:53:42', 38.00, 'active', '[]', NULL),
(98, 7, 29, '2026-02-17 16:53:42', 78.00, 'active', '[]', NULL),
(99, 1, 29, '2026-02-17 16:53:42', 27.00, 'active', '[]', NULL),
(100, 2, 29, '2026-02-17 16:53:42', 46.00, 'active', '[]', NULL),
(101, 7, 30, '2026-02-17 16:53:42', 51.00, 'active', '[]', NULL),
(107, 17, 26, '2026-02-17 16:55:06', 8.00, 'active', '[]', NULL),
(108, 16, 26, '2026-02-17 16:55:06', 45.00, 'active', '[]', NULL),
(109, 15, 27, '2026-02-17 16:55:06', 57.00, 'active', '[]', NULL),
(110, 14, 27, '2026-02-17 16:55:06', 30.00, 'active', '[]', NULL),
(111, 15, 28, '2026-02-17 16:55:06', 24.00, 'active', '[]', NULL),
(112, 17, 28, '2026-02-17 16:55:06', 7.00, 'active', '[]', NULL),
(113, 18, 28, '2026-02-17 16:55:06', 17.00, 'active', '[]', NULL),
(114, 14, 29, '2026-02-17 16:55:06', 53.00, 'active', '[]', NULL),
(115, 15, 29, '2026-02-17 16:55:06', 59.00, 'active', '[]', NULL),
(116, 16, 29, '2026-02-17 16:55:06', 53.00, 'active', '[]', NULL),
(117, 18, 30, '2026-02-17 16:55:06', 9.00, 'active', '[]', NULL),
(118, 17, 30, '2026-02-17 16:55:06', 16.00, 'active', '[]', NULL),
(119, 15, 30, '2026-02-17 16:55:06', 34.00, 'active', '[]', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `coursematerials`
--

CREATE TABLE `coursematerials` (
  `id` int(11) NOT NULL,
  `courseId` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `fileUrl` varchar(500) DEFAULT NULL,
  `fileType` varchar(50) DEFAULT NULL,
  `orderIndex` int(11) DEFAULT 0,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `courses`
--

CREATE TABLE `courses` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `courseCode` varchar(50) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `image` varchar(500) DEFAULT NULL,
  `thumbnail` varchar(500) DEFAULT NULL,
  `syllabus` varchar(500) DEFAULT NULL,
  `duration` varchar(50) DEFAULT NULL,
  `mentorId` int(11) NOT NULL,
  `category` varchar(100) DEFAULT NULL,
  `courseType` enum('theory','practical','lab') DEFAULT 'theory',
  `difficulty` enum('beginner','intermediate','advanced') DEFAULT 'beginner',
  `semester` varchar(20) DEFAULT NULL,
  `regulation` varchar(50) DEFAULT NULL,
  `academicYear` varchar(20) DEFAULT NULL,
  `maxStudents` int(11) DEFAULT 100,
  `isPublished` tinyint(1) DEFAULT 0,
  `status` enum('draft','pending','active','rejected','inactive') DEFAULT 'draft',
  `approvedBy` int(11) DEFAULT NULL,
  `approvedAt` datetime DEFAULT NULL,
  `rejectionReason` text DEFAULT NULL,
  `rating` decimal(2,1) DEFAULT 0.0,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `courses`
--

INSERT INTO `courses` (`id`, `title`, `courseCode`, `description`, `image`, `thumbnail`, `syllabus`, `duration`, `mentorId`, `category`, `courseType`, `difficulty`, `semester`, `regulation`, `academicYear`, `maxStudents`, `isPublished`, `status`, `approvedBy`, `approvedAt`, `rejectionReason`, `rating`, `createdAt`, `updatedAt`) VALUES
(1, 'Web Development Bootcamp', NULL, 'Master HTML, CSS, JavaScript and modern frameworks to build responsive websites.', NULL, NULL, NULL, '8 weeks', 2, 'Web Development', 'theory', 'beginner', NULL, NULL, NULL, 100, 1, 'draft', NULL, NULL, NULL, 4.8, '2026-02-15 07:03:31', '2026-02-15 07:03:31'),
(2, 'Data Science Fundamentals', NULL, 'Learn statistics, Python, data analysis, machine learning and visualization tools.', NULL, NULL, NULL, '12 weeks', 2, 'Data Science', 'theory', 'intermediate', NULL, NULL, NULL, 100, 1, 'draft', NULL, NULL, NULL, 4.0, '2026-02-15 07:03:31', '2026-02-15 07:03:31'),
(3, 'Digital Marketing Masterclass', NULL, 'Comprehensive training in SEO, social media, email, content marketing and analytics.', NULL, NULL, NULL, '6 weeks', 3, 'Marketing', 'theory', 'beginner', NULL, NULL, NULL, 100, 1, 'draft', NULL, NULL, NULL, 4.9, '2026-02-15 07:03:31', '2026-02-15 07:03:31'),
(4, 'UI/UX Design Essentials', NULL, 'Master user interface design principles and create stunning, user-friendly digital experiences.', NULL, NULL, NULL, '10 weeks', 3, 'Design', 'theory', 'intermediate', NULL, NULL, NULL, 100, 1, 'draft', NULL, NULL, NULL, 4.6, '2026-02-15 07:03:31', '2026-02-15 07:03:31'),
(5, 'Mobile App Development', NULL, 'Build native iOS and Android applications using React Native and modern mobile frameworks.', NULL, NULL, NULL, '14 weeks', 4, 'Mobile Development', 'theory', 'advanced', NULL, NULL, NULL, 100, 1, 'draft', NULL, NULL, NULL, 4.3, '2026-02-15 07:03:31', '2026-02-15 07:03:31'),
(6, 'Cybersecurity Fundamentals', NULL, 'Learn to identify vulnerabilities, implement security measures, and protect digital assets.', NULL, NULL, NULL, '12 weeks', 4, 'Cybersecurity', 'theory', 'intermediate', NULL, NULL, NULL, 100, 1, 'draft', NULL, NULL, NULL, 5.0, '2026-02-15 07:03:31', '2026-02-15 07:03:31'),
(7, 'HTML', '', 'HTML Basics', NULL, NULL, NULL, '', 1, 'Read', 'theory', 'intermediate', '', NULL, NULL, 500, 0, 'draft', NULL, NULL, NULL, 0.0, '2026-02-15 10:06:48', '2026-02-17 13:39:35'),
(8, 'Web Development Bootcamp', 'CS101', 'Master HTML, CSS, JavaScript and modern frameworks to build responsive websites.', NULL, NULL, NULL, '8 weeks', 2, 'Web Development', 'theory', 'beginner', '1', NULL, NULL, 100, 1, 'active', NULL, NULL, NULL, 4.8, '2026-02-15 10:31:21', '2026-02-15 10:31:21'),
(9, 'Data Science Fundamentals', 'DS201', 'Learn statistics, Python, data analysis, machine learning and visualization tools.', NULL, NULL, NULL, '12 weeks', 2, 'Data Science', 'theory', 'intermediate', '3', NULL, NULL, 100, 1, 'active', NULL, NULL, NULL, 4.0, '2026-02-15 10:31:21', '2026-02-15 10:53:34'),
(10, 'Digital Marketing Masterclass', 'MK101', 'Comprehensive training in SEO, social media, email, content marketing and analytics.', NULL, NULL, NULL, '6 weeks', 3, 'Marketing', 'theory', 'beginner', '1', NULL, NULL, 100, 1, 'active', NULL, NULL, NULL, 4.9, '2026-02-15 10:31:21', '2026-02-15 10:31:21'),
(11, 'UI/UX Design Essentials', 'DG301', 'Master user interface design principles and create stunning, user-friendly digital experiences.', NULL, NULL, NULL, '10 weeks', 3, 'Design', 'practical', 'intermediate', '4', NULL, NULL, 100, 1, 'active', NULL, NULL, NULL, 4.6, '2026-02-15 10:31:21', '2026-02-15 10:31:21'),
(12, 'Mobile App Development', 'CS401', 'Build native iOS and Android applications using React Native and modern mobile frameworks.', NULL, NULL, NULL, '14 weeks', 4, 'Mobile Development', 'lab', 'advanced', '6', NULL, NULL, 100, 1, 'active', NULL, NULL, NULL, 4.3, '2026-02-15 10:31:21', '2026-02-15 10:31:21'),
(13, 'Cybersecurity Fundamentals', 'CY201', 'Learn to identify vulnerabilities, implement security measures, and protect digital assets.', NULL, NULL, NULL, '12 weeks', 4, 'Cybersecurity', 'theory', 'intermediate', '3', NULL, NULL, 100, 1, 'active', NULL, NULL, NULL, 5.0, '2026-02-15 10:31:21', '2026-02-15 10:31:21'),
(14, 'Python Programming Mastery', 'PY101', 'Complete Python course from basics to advanced — variables, loops, OOP, file handling, modules, and real-world projects.', NULL, NULL, NULL, '10 weeks', 2, 'Programming', 'theory', 'beginner', '1', NULL, NULL, 100, 1, 'active', NULL, NULL, NULL, 4.4, '2026-02-15 13:13:39', '2026-02-15 13:13:39'),
(15, 'Data Structures & Algorithms', 'DSA301', 'Master arrays, linked lists, stacks, queues, trees, graphs, sorting, searching, and dynamic programming.', NULL, NULL, NULL, '14 weeks', 2, 'Data Structures', 'theory', 'intermediate', '3', NULL, NULL, 100, 1, 'active', NULL, NULL, NULL, 4.0, '2026-02-15 13:13:39', '2026-02-17 13:39:56'),
(16, 'React & Modern Frontend', 'FE201', 'Build modern web applications with React, hooks, state management, routing, and API integration.', NULL, NULL, NULL, '8 weeks', 3, 'Web Development', 'practical', 'intermediate', '4', NULL, NULL, 100, 1, 'active', NULL, NULL, NULL, 3.8, '2026-02-15 13:13:39', '2026-02-15 13:13:39'),
(17, 'Database Management Systems', 'DB201', 'Learn relational database design, SQL, normalization, transactions, indexing, and NoSQL basics.', NULL, NULL, NULL, '12 weeks', 3, 'Database', 'theory', 'intermediate', '3', NULL, NULL, 100, 1, 'active', NULL, NULL, NULL, 4.1, '2026-02-15 13:13:39', '2026-02-15 13:13:39'),
(18, 'Machine Learning Fundamentals', 'ML301', 'Supervised and unsupervised learning, regression, classification, clustering, neural networks, and model evaluation.', NULL, NULL, NULL, '16 weeks', 4, 'Machine Learning', 'theory', 'advanced', '5', NULL, NULL, 100, 1, 'active', NULL, NULL, NULL, 3.9, '2026-02-15 13:13:39', '2026-02-15 13:13:39'),
(19, 'Node.js & Express Backend', 'BE301', 'Build RESTful APIs with Node.js, Express, middleware, authentication, database integration, and deployment.', NULL, NULL, NULL, '10 weeks', 2, 'Web Development', 'lab', 'intermediate', '4', NULL, NULL, 100, 1, 'active', NULL, NULL, NULL, 4.4, '2026-02-15 13:13:39', '2026-02-15 13:13:39'),
(20, 'Java Object-Oriented Programming', 'JV201', 'Java fundamentals, OOP concepts — classes, inheritance, polymorphism, interfaces, generics, and collections.', NULL, NULL, NULL, '12 weeks', 4, 'Programming', 'theory', 'beginner', '2', NULL, NULL, 100, 1, 'active', NULL, NULL, NULL, 4.9, '2026-02-15 13:13:39', '2026-02-15 13:13:39'),
(21, 'Software Engineering Practices', 'SE401', 'SDLC, Agile, Git workflows, testing, CI/CD, code review, design patterns, and project management.', NULL, NULL, NULL, '10 weeks', 3, 'Software Engineering', 'theory', 'intermediate', '5', NULL, NULL, 100, 1, 'active', NULL, NULL, NULL, 3.5, '2026-02-15 13:13:39', '2026-02-15 13:13:39'),
(22, 'Computer Networks', 'CN301', 'OSI model, TCP/IP, routing, switching, DNS, HTTP, network security, and socket programming.', NULL, NULL, NULL, '12 weeks', 4, 'Networking', 'theory', 'intermediate', '4', NULL, NULL, 100, 1, 'active', NULL, NULL, NULL, 4.0, '2026-02-15 13:13:39', '2026-02-15 13:13:39'),
(23, 'Operating Systems Concepts', 'OS301', 'Process management, scheduling, memory management, file systems, deadlocks, and virtual memory.', NULL, NULL, NULL, '12 weeks', 2, 'Systems', 'theory', 'intermediate', '4', NULL, NULL, 100, 1, 'active', NULL, NULL, NULL, 4.1, '2026-02-15 13:13:39', '2026-02-15 13:13:39'),
(24, 'Web Development Bootcamp', 'CS101', 'Master HTML, CSS, JavaScript and modern frameworks to build responsive websites.', NULL, NULL, NULL, '8 weeks', 2, 'Web Development', 'theory', 'beginner', '1', NULL, NULL, 100, 1, 'active', NULL, NULL, NULL, 4.8, '2026-02-17 16:53:42', '2026-02-17 16:53:42'),
(25, 'Data Science Fundamentals', 'DS201', 'Learn statistics, Python, data analysis, machine learning and visualization tools.', NULL, NULL, NULL, '12 weeks', 2, 'Data Science', 'theory', 'intermediate', '3', NULL, NULL, 100, 1, 'active', NULL, NULL, NULL, 4.0, '2026-02-17 16:53:42', '2026-02-17 16:53:42'),
(26, 'Digital Marketing Masterclass', 'MK101', 'Comprehensive training in SEO, social media, email, content marketing and analytics.', NULL, NULL, NULL, '6 weeks', 3, 'Marketing', 'theory', 'beginner', '1', NULL, NULL, 100, 1, 'active', NULL, NULL, NULL, 4.9, '2026-02-17 16:53:42', '2026-02-17 16:53:42'),
(27, 'UI/UX Design Essentials', 'DG301', 'Master user interface design principles and create stunning, user-friendly digital experiences.', NULL, NULL, NULL, '10 weeks', 3, 'Design', 'practical', 'intermediate', '4', NULL, NULL, 100, 1, 'active', NULL, NULL, NULL, 4.6, '2026-02-17 16:53:42', '2026-02-17 16:53:42'),
(28, 'Mobile App Development', 'CS401', 'Build native iOS and Android applications using React Native and modern mobile frameworks.', NULL, NULL, NULL, '14 weeks', 4, 'Mobile Development', 'lab', 'advanced', '6', NULL, NULL, 100, 1, 'active', NULL, NULL, NULL, 4.3, '2026-02-17 16:53:42', '2026-02-17 16:53:42'),
(29, 'Cybersecurity Fundamentals', 'CY201', 'Learn to identify vulnerabilities, implement security measures, and protect digital assets.', NULL, NULL, NULL, '12 weeks', 4, 'Cybersecurity', 'theory', 'intermediate', '3', NULL, NULL, 100, 1, 'active', NULL, NULL, NULL, 5.0, '2026-02-17 16:53:42', '2026-02-17 16:53:42');

-- --------------------------------------------------------

--
-- Table structure for table `coursesubjects`
--

CREATE TABLE `coursesubjects` (
  `id` int(11) NOT NULL,
  `courseId` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `code` varchar(50) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `sortOrder` int(11) DEFAULT 0,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `coursesubjects`
--

INSERT INTO `coursesubjects` (`id`, `courseId`, `title`, `code`, `description`, `sortOrder`, `createdAt`) VALUES
(1, 7, 'HTML Fundamentals', 'U1', 'Learn the building blocks of web pages', 1, '2026-02-15 10:31:21'),
(2, 7, 'CSS Styling', 'U2', 'Master CSS for beautiful layouts and designs', 2, '2026-02-15 10:31:21'),
(3, 7, 'JavaScript Basics', 'U3', 'Introduction to programming with JavaScript', 3, '2026-02-15 10:31:21'),
(4, 8, 'JavaScript Essentials', 'U4', 'DOM manipulation, events, and async JS', 4, '2026-02-15 13:13:39'),
(5, 8, 'React Framework', 'U5', 'Building modern UIs with React', 5, '2026-02-15 13:13:39'),
(6, 14, 'Python Basics', 'U1', 'Unit 1: Python Basics', 1, '2026-02-15 13:13:39'),
(7, 14, 'Control Flow', 'U2', 'Unit 2: Control Flow', 2, '2026-02-15 13:13:39'),
(8, 14, 'Functions & Modules', 'U3', 'Unit 3: Functions & Modules', 3, '2026-02-15 13:13:40'),
(9, 14, 'OOP in Python', 'U4', 'Unit 4: OOP in Python', 4, '2026-02-15 13:13:40'),
(10, 14, 'File Handling & Error Handling', 'U5', 'Unit 5: File Handling & Error Handling', 5, '2026-02-15 13:13:40'),
(11, 15, 'Arrays & Strings', 'U1', 'Unit 1: Arrays & Strings', 1, '2026-02-15 13:13:40'),
(12, 15, 'Linked Lists', 'U2', 'Unit 2: Linked Lists', 2, '2026-02-15 13:13:40'),
(13, 15, 'Stacks & Queues', 'U3', 'Unit 3: Stacks & Queues', 3, '2026-02-15 13:13:40'),
(14, 15, 'Trees & Graphs', 'U4', 'Unit 4: Trees & Graphs', 4, '2026-02-15 13:13:40'),
(15, 15, 'Sorting & Searching', 'U5', 'Unit 5: Sorting & Searching', 5, '2026-02-15 13:13:40'),
(16, 16, 'React Fundamentals', 'U1', 'Unit 1: React Fundamentals', 1, '2026-02-15 13:13:40'),
(17, 16, 'React Hooks Deep Dive', 'U2', 'Unit 2: React Hooks Deep Dive', 2, '2026-02-15 13:13:40'),
(18, 16, 'Routing & State Management', 'U3', 'Unit 3: Routing & State Management', 3, '2026-02-15 13:13:40'),
(19, 16, 'API Integration & Forms', 'U4', 'Unit 4: API Integration & Forms', 4, '2026-02-15 13:13:40'),
(20, 17, 'Relational Database Design', 'U1', 'Unit 1: Relational Database Design', 1, '2026-02-15 13:13:40'),
(21, 17, 'SQL Fundamentals', 'U2', 'Unit 2: SQL Fundamentals', 2, '2026-02-15 13:13:40'),
(22, 17, 'Transactions & Indexing', 'U3', 'Unit 3: Transactions & Indexing', 3, '2026-02-15 13:13:40'),
(23, 18, 'Introduction to ML', 'U1', 'Unit 1: Introduction to ML', 1, '2026-02-15 13:13:40'),
(24, 18, 'Supervised Learning', 'U2', 'Unit 2: Supervised Learning', 2, '2026-02-15 13:13:40'),
(25, 18, 'Unsupervised Learning', 'U3', 'Unit 3: Unsupervised Learning', 3, '2026-02-15 13:13:40'),
(26, 18, 'Neural Networks', 'U4', 'Unit 4: Neural Networks', 4, '2026-02-15 13:13:40'),
(27, 19, 'Node.js Fundamentals', 'U1', 'Unit 1: Node.js Fundamentals', 1, '2026-02-15 13:13:40'),
(28, 19, 'Express.js & REST APIs', 'U2', 'Unit 2: Express.js & REST APIs', 2, '2026-02-15 13:13:40'),
(29, 19, 'Authentication & Security', 'U3', 'Unit 3: Authentication & Security', 3, '2026-02-15 13:13:40'),
(30, 20, 'Java Basics', 'U1', 'Unit 1: Java Basics', 1, '2026-02-15 13:13:40'),
(31, 20, 'OOP Concepts', 'U2', 'Unit 2: OOP Concepts', 2, '2026-02-15 13:13:40'),
(32, 20, 'Collections & Generics', 'U3', 'Unit 3: Collections & Generics', 3, '2026-02-15 13:13:40'),
(33, 21, 'SDLC & Agile', 'U1', 'Unit 1: SDLC & Agile', 1, '2026-02-15 13:13:40'),
(34, 21, 'Version Control & CI/CD', 'U2', 'Unit 2: Version Control & CI/CD', 2, '2026-02-15 13:13:40'),
(35, 21, 'Design Patterns', 'U3', 'Unit 3: Design Patterns', 3, '2026-02-15 13:13:40'),
(36, 22, 'Network Models', 'U1', 'Unit 1: Network Models', 1, '2026-02-15 13:13:40'),
(37, 22, 'Application Layer Protocols', 'U2', 'Unit 2: Application Layer Protocols', 2, '2026-02-15 13:13:40'),
(38, 23, 'Process Management', 'U1', 'Unit 1: Process Management', 1, '2026-02-15 13:13:40'),
(39, 23, 'CPU Scheduling', 'U2', 'Unit 2: CPU Scheduling', 2, '2026-02-15 13:13:40'),
(40, 23, 'Memory Management', 'U3', 'Unit 3: Memory Management', 3, '2026-02-15 13:13:40'),
(41, 9, 'Statistics & Probability', 'U1', 'Unit 1: Statistics & Probability', 1, '2026-02-15 13:13:40'),
(42, 9, 'Python for Data Science', 'U2', 'Unit 2: Python for Data Science', 2, '2026-02-15 13:13:40'),
(43, 9, 'Data Visualization', 'U3', 'Unit 3: Data Visualization', 3, '2026-02-15 13:13:40'),
(44, 9, 'Machine Learning Basics', 'U4', 'Unit 4: Machine Learning Basics', 4, '2026-02-15 13:13:40'),
(45, 10, 'SEO & Content Marketing', 'U1', 'Unit 1: SEO & Content Marketing', 1, '2026-02-15 13:13:40'),
(46, 10, 'Social Media Marketing', 'U2', 'Unit 2: Social Media Marketing', 2, '2026-02-15 13:13:40'),
(47, 10, 'Email Marketing & Analytics', 'U3', 'Unit 3: Email Marketing & Analytics', 3, '2026-02-15 13:13:40'),
(48, 11, 'Design Principles', 'U1', 'Unit 1: Design Principles', 1, '2026-02-15 13:13:40'),
(49, 11, 'UX Research & Wireframing', 'U2', 'Unit 2: UX Research & Wireframing', 2, '2026-02-15 13:13:40'),
(50, 11, 'UI Design Tools & Systems', 'U3', 'Unit 3: UI Design Tools & Systems', 3, '2026-02-15 13:13:40'),
(51, 12, 'React Native Fundamentals', 'U1', 'Unit 1: React Native Fundamentals', 1, '2026-02-15 13:13:40'),
(52, 12, 'State & API Integration', 'U2', 'Unit 2: State & API Integration', 2, '2026-02-15 13:13:40'),
(53, 12, 'Publishing & Deployment', 'U3', 'Unit 3: Publishing & Deployment', 3, '2026-02-15 13:13:40'),
(54, 13, 'Security Fundamentals', 'U1', 'Unit 1: Security Fundamentals', 1, '2026-02-15 13:13:40'),
(55, 13, 'Network Security', 'U2', 'Unit 2: Network Security', 2, '2026-02-15 13:13:40'),
(56, 13, 'Web Application Security', 'U3', 'Unit 3: Web Application Security', 3, '2026-02-15 13:13:40'),
(57, 7, 'HTML Fundamentals', 'U1', 'Learn the building blocks of web pages', 1, '2026-02-17 16:53:42'),
(58, 7, 'CSS Styling', 'U2', 'Master CSS for beautiful layouts and designs', 2, '2026-02-17 16:53:42'),
(59, 7, 'JavaScript Basics', 'U3', 'Introduction to programming with JavaScript', 3, '2026-02-17 16:53:42');

-- --------------------------------------------------------

--
-- Table structure for table `coursetopics`
--

CREATE TABLE `coursetopics` (
  `id` int(11) NOT NULL,
  `subjectId` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `sortOrder` int(11) DEFAULT 0,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `coursetopics`
--

INSERT INTO `coursetopics` (`id`, `subjectId`, `title`, `description`, `sortOrder`, `createdAt`) VALUES
(1, 1, 'Introduction to HTML', 'What is HTML and how the web works', 1, '2026-02-15 10:31:21'),
(2, 1, 'HTML Tags & Elements', 'Common HTML tags and their usage', 2, '2026-02-15 10:31:21'),
(3, 1, 'Forms & Tables', 'Creating forms and tables in HTML', 3, '2026-02-15 10:31:21'),
(4, 2, 'CSS Selectors & Properties', 'How to target and style HTML elements', 1, '2026-02-15 10:31:21'),
(5, 2, 'Flexbox & Grid', 'Modern CSS layout techniques', 2, '2026-02-15 10:31:21'),
(6, 4, 'DOM Manipulation', NULL, 1, '2026-02-15 13:13:39'),
(7, 4, 'Event Listeners', NULL, 2, '2026-02-15 13:13:39'),
(8, 4, 'Fetch API & Promises', NULL, 3, '2026-02-15 13:13:39'),
(9, 4, 'Async/Await', NULL, 4, '2026-02-15 13:13:39'),
(10, 5, 'React Components', NULL, 1, '2026-02-15 13:13:39'),
(11, 5, 'State & Props', NULL, 2, '2026-02-15 13:13:39'),
(12, 5, 'useEffect Hook', NULL, 3, '2026-02-15 13:13:39'),
(13, 6, 'Introduction to Python', NULL, 1, '2026-02-15 13:13:39'),
(14, 6, 'Variables & Data Types', NULL, 2, '2026-02-15 13:13:39'),
(15, 6, 'Operators & Expressions', NULL, 3, '2026-02-15 13:13:39'),
(16, 6, 'Input & Output', NULL, 4, '2026-02-15 13:13:39'),
(17, 6, 'Type Casting', NULL, 5, '2026-02-15 13:13:39'),
(18, 7, 'If-Else Statements', NULL, 1, '2026-02-15 13:13:39'),
(19, 7, 'For Loops', NULL, 2, '2026-02-15 13:13:39'),
(20, 7, 'While Loops', NULL, 3, '2026-02-15 13:13:39'),
(21, 7, 'Break & Continue', NULL, 4, '2026-02-15 13:13:39'),
(22, 7, 'Nested Loops', NULL, 5, '2026-02-15 13:13:39'),
(23, 8, 'Defining Functions', NULL, 1, '2026-02-15 13:13:40'),
(24, 8, 'Parameters & Return', NULL, 2, '2026-02-15 13:13:40'),
(25, 8, 'Lambda Functions', NULL, 3, '2026-02-15 13:13:40'),
(26, 8, 'Built-in Functions', NULL, 4, '2026-02-15 13:13:40'),
(27, 8, 'Importing Modules', NULL, 5, '2026-02-15 13:13:40'),
(28, 9, 'Classes & Objects', NULL, 1, '2026-02-15 13:13:40'),
(29, 9, 'Constructors', NULL, 2, '2026-02-15 13:13:40'),
(30, 9, 'Inheritance', NULL, 3, '2026-02-15 13:13:40'),
(31, 9, 'Polymorphism', NULL, 4, '2026-02-15 13:13:40'),
(32, 9, 'Encapsulation', NULL, 5, '2026-02-15 13:13:40'),
(33, 10, 'Reading Files', NULL, 1, '2026-02-15 13:13:40'),
(34, 10, 'Writing Files', NULL, 2, '2026-02-15 13:13:40'),
(35, 10, 'Try-Except', NULL, 3, '2026-02-15 13:13:40'),
(36, 10, 'Custom Exceptions', NULL, 4, '2026-02-15 13:13:40'),
(37, 10, 'Context Managers', NULL, 5, '2026-02-15 13:13:40'),
(38, 11, 'Array Operations', NULL, 1, '2026-02-15 13:13:40'),
(39, 11, 'Two Pointer Technique', NULL, 2, '2026-02-15 13:13:40'),
(40, 11, 'Sliding Window', NULL, 3, '2026-02-15 13:13:40'),
(41, 11, 'String Manipulation', NULL, 4, '2026-02-15 13:13:40'),
(42, 11, 'Hashing', NULL, 5, '2026-02-15 13:13:40'),
(43, 12, 'Singly Linked List', NULL, 1, '2026-02-15 13:13:40'),
(44, 12, 'Doubly Linked List', NULL, 2, '2026-02-15 13:13:40'),
(45, 12, 'Circular Linked List', NULL, 3, '2026-02-15 13:13:40'),
(46, 12, 'Reversal', NULL, 4, '2026-02-15 13:13:40'),
(47, 12, 'Cycle Detection', NULL, 5, '2026-02-15 13:13:40'),
(48, 13, 'Stack Operations', NULL, 1, '2026-02-15 13:13:40'),
(49, 13, 'Queue Operations', NULL, 2, '2026-02-15 13:13:40'),
(50, 13, 'Expression Evaluation', NULL, 3, '2026-02-15 13:13:40'),
(51, 13, 'BFS using Queue', NULL, 4, '2026-02-15 13:13:40'),
(52, 13, 'Monotonic Stack', NULL, 5, '2026-02-15 13:13:40'),
(53, 14, 'Binary Trees', NULL, 1, '2026-02-15 13:13:40'),
(54, 14, 'BST Operations', NULL, 2, '2026-02-15 13:13:40'),
(55, 14, 'Tree Traversals', NULL, 3, '2026-02-15 13:13:40'),
(56, 14, 'Graph Representation', NULL, 4, '2026-02-15 13:13:40'),
(57, 14, 'BFS & DFS', NULL, 5, '2026-02-15 13:13:40'),
(58, 15, 'Bubble Sort', NULL, 1, '2026-02-15 13:13:40'),
(59, 15, 'Merge Sort', NULL, 2, '2026-02-15 13:13:40'),
(60, 15, 'Quick Sort', NULL, 3, '2026-02-15 13:13:40'),
(61, 15, 'Binary Search', NULL, 4, '2026-02-15 13:13:40'),
(62, 15, 'Counting Sort', NULL, 5, '2026-02-15 13:13:40'),
(63, 16, 'JSX & Components', NULL, 1, '2026-02-15 13:13:40'),
(64, 16, 'Props & State', NULL, 2, '2026-02-15 13:13:40'),
(65, 16, 'Event Handling', NULL, 3, '2026-02-15 13:13:40'),
(66, 16, 'Conditional Rendering', NULL, 4, '2026-02-15 13:13:40'),
(67, 16, 'Lists & Keys', NULL, 5, '2026-02-15 13:13:40'),
(68, 17, 'useState', NULL, 1, '2026-02-15 13:13:40'),
(69, 17, 'useEffect', NULL, 2, '2026-02-15 13:13:40'),
(70, 17, 'useRef', NULL, 3, '2026-02-15 13:13:40'),
(71, 17, 'useMemo & useCallback', NULL, 4, '2026-02-15 13:13:40'),
(72, 17, 'Custom Hooks', NULL, 5, '2026-02-15 13:13:40'),
(73, 18, 'React Router', NULL, 1, '2026-02-15 13:13:40'),
(74, 18, 'Context API', NULL, 2, '2026-02-15 13:13:40'),
(75, 18, 'useReducer', NULL, 3, '2026-02-15 13:13:40'),
(76, 18, 'Global State Patterns', NULL, 4, '2026-02-15 13:13:40'),
(77, 18, 'Route Guards', NULL, 5, '2026-02-15 13:13:40'),
(78, 19, 'Fetch & Axios', NULL, 1, '2026-02-15 13:13:40'),
(79, 19, 'Loading States', NULL, 2, '2026-02-15 13:13:40'),
(80, 19, 'Error Handling', NULL, 3, '2026-02-15 13:13:40'),
(81, 19, 'Form Validation', NULL, 4, '2026-02-15 13:13:40'),
(82, 19, 'File Uploads', NULL, 5, '2026-02-15 13:13:40'),
(83, 20, 'ER Diagrams', NULL, 1, '2026-02-15 13:13:40'),
(84, 20, 'Normalization (1NF-3NF)', NULL, 2, '2026-02-15 13:13:40'),
(85, 20, 'Primary & Foreign Keys', NULL, 3, '2026-02-15 13:13:40'),
(86, 20, 'Relationships', NULL, 4, '2026-02-15 13:13:40'),
(87, 20, 'Schema Design', NULL, 5, '2026-02-15 13:13:40'),
(88, 21, 'SELECT Queries', NULL, 1, '2026-02-15 13:13:40'),
(89, 21, 'JOIN Operations', NULL, 2, '2026-02-15 13:13:40'),
(90, 21, 'GROUP BY & HAVING', NULL, 3, '2026-02-15 13:13:40'),
(91, 21, 'Subqueries', NULL, 4, '2026-02-15 13:13:40'),
(92, 21, 'INSERT/UPDATE/DELETE', NULL, 5, '2026-02-15 13:13:40'),
(93, 22, 'ACID Properties', NULL, 1, '2026-02-15 13:13:40'),
(94, 22, 'Transaction Control', NULL, 2, '2026-02-15 13:13:40'),
(95, 22, 'Locking', NULL, 3, '2026-02-15 13:13:40'),
(96, 22, 'B-Tree Indexes', NULL, 4, '2026-02-15 13:13:40'),
(97, 22, 'Query Optimization', NULL, 5, '2026-02-15 13:13:40'),
(98, 23, 'What is Machine Learning?', NULL, 1, '2026-02-15 13:13:40'),
(99, 23, 'Types of ML', NULL, 2, '2026-02-15 13:13:40'),
(100, 23, 'Data Preprocessing', NULL, 3, '2026-02-15 13:13:40'),
(101, 23, 'Feature Engineering', NULL, 4, '2026-02-15 13:13:40'),
(102, 23, 'Train/Test Split', NULL, 5, '2026-02-15 13:13:40'),
(103, 24, 'Linear Regression', NULL, 1, '2026-02-15 13:13:40'),
(104, 24, 'Logistic Regression', NULL, 2, '2026-02-15 13:13:40'),
(105, 24, 'Decision Trees', NULL, 3, '2026-02-15 13:13:40'),
(106, 24, 'Random Forest', NULL, 4, '2026-02-15 13:13:40'),
(107, 24, 'SVM', NULL, 5, '2026-02-15 13:13:40'),
(108, 25, 'K-Means Clustering', NULL, 1, '2026-02-15 13:13:40'),
(109, 25, 'Hierarchical Clustering', NULL, 2, '2026-02-15 13:13:40'),
(110, 25, 'PCA', NULL, 3, '2026-02-15 13:13:40'),
(111, 25, 'DBSCAN', NULL, 4, '2026-02-15 13:13:40'),
(112, 25, 'Association Rules', NULL, 5, '2026-02-15 13:13:40'),
(113, 26, 'Perceptron', NULL, 1, '2026-02-15 13:13:40'),
(114, 26, 'Activation Functions', NULL, 2, '2026-02-15 13:13:40'),
(115, 26, 'Backpropagation', NULL, 3, '2026-02-15 13:13:40'),
(116, 26, 'CNN Basics', NULL, 4, '2026-02-15 13:13:40'),
(117, 26, 'Overfitting & Regularization', NULL, 5, '2026-02-15 13:13:40'),
(118, 27, 'Node.js Architecture', NULL, 1, '2026-02-15 13:13:40'),
(119, 27, 'Modules & NPM', NULL, 2, '2026-02-15 13:13:40'),
(120, 27, 'File System', NULL, 3, '2026-02-15 13:13:40'),
(121, 27, 'Event Loop', NULL, 4, '2026-02-15 13:13:40'),
(122, 27, 'Streams', NULL, 5, '2026-02-15 13:13:40'),
(123, 28, 'Express Setup', NULL, 1, '2026-02-15 13:13:40'),
(124, 28, 'Routes & Middleware', NULL, 2, '2026-02-15 13:13:40'),
(125, 28, 'Request/Response', NULL, 3, '2026-02-15 13:13:40'),
(126, 28, 'Error Handling', NULL, 4, '2026-02-15 13:13:40'),
(127, 28, 'CORS', NULL, 5, '2026-02-15 13:13:40'),
(128, 29, 'JWT Tokens', NULL, 1, '2026-02-15 13:13:40'),
(129, 29, 'Password Hashing', NULL, 2, '2026-02-15 13:13:40'),
(130, 29, 'Session Management', NULL, 3, '2026-02-15 13:13:40'),
(131, 29, 'Rate Limiting', NULL, 4, '2026-02-15 13:13:40'),
(132, 29, 'Input Validation', NULL, 5, '2026-02-15 13:13:40'),
(133, 30, 'JDK Setup', NULL, 1, '2026-02-15 13:13:40'),
(134, 30, 'Variables & Types', NULL, 2, '2026-02-15 13:13:40'),
(135, 30, 'Control Structures', NULL, 3, '2026-02-15 13:13:40'),
(136, 30, 'Arrays', NULL, 4, '2026-02-15 13:13:40'),
(137, 30, 'Methods', NULL, 5, '2026-02-15 13:13:40'),
(138, 31, 'Classes & Objects', NULL, 1, '2026-02-15 13:13:40'),
(139, 31, 'Constructors', NULL, 2, '2026-02-15 13:13:40'),
(140, 31, 'Inheritance', NULL, 3, '2026-02-15 13:13:40'),
(141, 31, 'Polymorphism', NULL, 4, '2026-02-15 13:13:40'),
(142, 31, 'Abstract Classes & Interfaces', NULL, 5, '2026-02-15 13:13:40'),
(143, 32, 'ArrayList', NULL, 1, '2026-02-15 13:13:40'),
(144, 32, 'HashMap', NULL, 2, '2026-02-15 13:13:40'),
(145, 32, 'LinkedList', NULL, 3, '2026-02-15 13:13:40'),
(146, 32, 'Generics', NULL, 4, '2026-02-15 13:13:40'),
(147, 32, 'Iterators', NULL, 5, '2026-02-15 13:13:40'),
(148, 33, 'Waterfall Model', NULL, 1, '2026-02-15 13:13:40'),
(149, 33, 'Agile Methodology', NULL, 2, '2026-02-15 13:13:40'),
(150, 33, 'Scrum Framework', NULL, 3, '2026-02-15 13:13:40'),
(151, 33, 'Sprint Planning', NULL, 4, '2026-02-15 13:13:40'),
(152, 33, 'User Stories', NULL, 5, '2026-02-15 13:13:40'),
(153, 34, 'Git Basics', NULL, 1, '2026-02-15 13:13:40'),
(154, 34, 'Branching Strategies', NULL, 2, '2026-02-15 13:13:40'),
(155, 34, 'Pull Requests', NULL, 3, '2026-02-15 13:13:40'),
(156, 34, 'CI/CD Pipelines', NULL, 4, '2026-02-15 13:13:40'),
(157, 34, 'Automated Testing', NULL, 5, '2026-02-15 13:13:40'),
(158, 35, 'Singleton', NULL, 1, '2026-02-15 13:13:40'),
(159, 35, 'Factory', NULL, 2, '2026-02-15 13:13:40'),
(160, 35, 'Observer', NULL, 3, '2026-02-15 13:13:40'),
(161, 35, 'Strategy', NULL, 4, '2026-02-15 13:13:40'),
(162, 35, 'MVC Pattern', NULL, 5, '2026-02-15 13:13:40'),
(163, 36, 'OSI 7 Layers', NULL, 1, '2026-02-15 13:13:40'),
(164, 36, 'TCP/IP Model', NULL, 2, '2026-02-15 13:13:40'),
(165, 36, 'Protocols Overview', NULL, 3, '2026-02-15 13:13:40'),
(166, 36, 'Network Devices', NULL, 4, '2026-02-15 13:13:40'),
(167, 36, 'IP Addressing', NULL, 5, '2026-02-15 13:13:40'),
(168, 37, 'HTTP/HTTPS', NULL, 1, '2026-02-15 13:13:40'),
(169, 37, 'DNS', NULL, 2, '2026-02-15 13:13:40'),
(170, 37, 'SMTP & POP3', NULL, 3, '2026-02-15 13:13:40'),
(171, 37, 'FTP', NULL, 4, '2026-02-15 13:13:40'),
(172, 37, 'WebSocket', NULL, 5, '2026-02-15 13:13:40'),
(173, 38, 'Process vs Thread', NULL, 1, '2026-02-15 13:13:40'),
(174, 38, 'Process States', NULL, 2, '2026-02-15 13:13:40'),
(175, 38, 'Context Switching', NULL, 3, '2026-02-15 13:13:40'),
(176, 38, 'IPC Mechanisms', NULL, 4, '2026-02-15 13:13:40'),
(177, 38, 'Multithreading', NULL, 5, '2026-02-15 13:13:40'),
(178, 39, 'FCFS', NULL, 1, '2026-02-15 13:13:40'),
(179, 39, 'SJF', NULL, 2, '2026-02-15 13:13:40'),
(180, 39, 'Round Robin', NULL, 3, '2026-02-15 13:13:40'),
(181, 39, 'Priority Scheduling', NULL, 4, '2026-02-15 13:13:40'),
(182, 39, 'Multilevel Queue', NULL, 5, '2026-02-15 13:13:40'),
(183, 40, 'Paging', NULL, 1, '2026-02-15 13:13:40'),
(184, 40, 'Segmentation', NULL, 2, '2026-02-15 13:13:40'),
(185, 40, 'Virtual Memory', NULL, 3, '2026-02-15 13:13:40'),
(186, 40, 'Page Replacement', NULL, 4, '2026-02-15 13:13:40'),
(187, 40, 'Thrashing', NULL, 5, '2026-02-15 13:13:40'),
(188, 41, 'Descriptive Statistics', NULL, 1, '2026-02-15 13:13:40'),
(189, 41, 'Probability Basics', NULL, 2, '2026-02-15 13:13:40'),
(190, 41, 'Distributions', NULL, 3, '2026-02-15 13:13:40'),
(191, 41, 'Hypothesis Testing', NULL, 4, '2026-02-15 13:13:40'),
(192, 41, 'Correlation', NULL, 5, '2026-02-15 13:13:40'),
(193, 42, 'NumPy Arrays', NULL, 1, '2026-02-15 13:13:40'),
(194, 42, 'Pandas DataFrames', NULL, 2, '2026-02-15 13:13:40'),
(195, 42, 'Data Cleaning', NULL, 3, '2026-02-15 13:13:40'),
(196, 42, 'Matplotlib', NULL, 4, '2026-02-15 13:13:40'),
(197, 42, 'Seaborn', NULL, 5, '2026-02-15 13:13:40'),
(198, 43, 'Chart Types', NULL, 1, '2026-02-15 13:13:40'),
(199, 43, 'Matplotlib Advanced', NULL, 2, '2026-02-15 13:13:40'),
(200, 43, 'Interactive Plots', NULL, 3, '2026-02-15 13:13:40'),
(201, 43, 'Dashboard Design', NULL, 4, '2026-02-15 13:13:40'),
(202, 43, 'Storytelling with Data', NULL, 5, '2026-02-15 13:13:40'),
(203, 44, 'Supervised Learning', NULL, 1, '2026-02-15 13:13:40'),
(204, 44, 'Linear Regression', NULL, 2, '2026-02-15 13:13:40'),
(205, 44, 'Classification', NULL, 3, '2026-02-15 13:13:40'),
(206, 44, 'Model Evaluation', NULL, 4, '2026-02-15 13:13:40'),
(207, 44, 'Scikit-learn', NULL, 5, '2026-02-15 13:13:40'),
(208, 45, 'Keyword Research', NULL, 1, '2026-02-15 13:13:40'),
(209, 45, 'On-Page SEO', NULL, 2, '2026-02-15 13:13:40'),
(210, 45, 'Content Strategy', NULL, 3, '2026-02-15 13:13:40'),
(211, 45, 'Blog Marketing', NULL, 4, '2026-02-15 13:13:40'),
(212, 45, 'SEO Tools', NULL, 5, '2026-02-15 13:13:40'),
(213, 46, 'Platform Strategy', NULL, 1, '2026-02-15 13:13:40'),
(214, 46, 'Content Calendar', NULL, 2, '2026-02-15 13:13:40'),
(215, 46, 'Engagement Tactics', NULL, 3, '2026-02-15 13:13:40'),
(216, 46, 'Influencer Marketing', NULL, 4, '2026-02-15 13:13:40'),
(217, 46, 'Analytics', NULL, 5, '2026-02-15 13:13:40'),
(218, 47, 'Email Campaigns', NULL, 1, '2026-02-15 13:13:40'),
(219, 47, 'Automation', NULL, 2, '2026-02-15 13:13:40'),
(220, 47, 'A/B Testing', NULL, 3, '2026-02-15 13:13:40'),
(221, 47, 'Google Analytics', NULL, 4, '2026-02-15 13:13:40'),
(222, 47, 'ROI Measurement', NULL, 5, '2026-02-15 13:13:40'),
(223, 48, 'Color Theory', NULL, 1, '2026-02-15 13:13:40'),
(224, 48, 'Typography', NULL, 2, '2026-02-15 13:13:40'),
(225, 48, 'Layout & Grid', NULL, 3, '2026-02-15 13:13:40'),
(226, 48, 'Visual Hierarchy', NULL, 4, '2026-02-15 13:13:40'),
(227, 48, 'Gestalt Principles', NULL, 5, '2026-02-15 13:13:40'),
(228, 49, 'User Personas', NULL, 1, '2026-02-15 13:13:40'),
(229, 49, 'User Journey Maps', NULL, 2, '2026-02-15 13:13:40'),
(230, 49, 'Wireframing', NULL, 3, '2026-02-15 13:13:40'),
(231, 49, 'Prototyping', NULL, 4, '2026-02-15 13:13:40'),
(232, 49, 'Usability Testing', NULL, 5, '2026-02-15 13:13:40'),
(233, 50, 'Figma Basics', NULL, 1, '2026-02-15 13:13:40'),
(234, 50, 'Components & Variants', NULL, 2, '2026-02-15 13:13:40'),
(235, 50, 'Design Systems', NULL, 3, '2026-02-15 13:13:40'),
(236, 50, 'Responsive Design', NULL, 4, '2026-02-15 13:13:40'),
(237, 50, 'Handoff to Developers', NULL, 5, '2026-02-15 13:13:40'),
(238, 51, 'Environment Setup', NULL, 1, '2026-02-15 13:13:40'),
(239, 51, 'Core Components', NULL, 2, '2026-02-15 13:13:40'),
(240, 51, 'Styling & Flexbox', NULL, 3, '2026-02-15 13:13:40'),
(241, 51, 'Navigation', NULL, 4, '2026-02-15 13:13:40'),
(242, 51, 'Platform-Specific Code', NULL, 5, '2026-02-15 13:13:40'),
(243, 52, 'useState & useEffect', NULL, 1, '2026-02-15 13:13:40'),
(244, 52, 'Fetching Data', NULL, 2, '2026-02-15 13:13:40'),
(245, 52, 'AsyncStorage', NULL, 3, '2026-02-15 13:13:40'),
(246, 52, 'Context API', NULL, 4, '2026-02-15 13:13:40'),
(247, 52, 'Redux Toolkit', NULL, 5, '2026-02-15 13:13:40'),
(248, 53, 'App Icons & Splash Screen', NULL, 1, '2026-02-15 13:13:40'),
(249, 53, 'Build for iOS', NULL, 2, '2026-02-15 13:13:40'),
(250, 53, 'Build for Android', NULL, 3, '2026-02-15 13:13:40'),
(251, 53, 'App Store Submission', NULL, 4, '2026-02-15 13:13:40'),
(252, 53, 'OTA Updates', NULL, 5, '2026-02-15 13:13:40'),
(253, 54, 'CIA Triad', NULL, 1, '2026-02-15 13:13:40'),
(254, 54, 'Types of Threats', NULL, 2, '2026-02-15 13:13:40'),
(255, 54, 'Attack Vectors', NULL, 3, '2026-02-15 13:13:40'),
(256, 54, 'Security Policies', NULL, 4, '2026-02-15 13:13:40'),
(257, 54, 'Risk Assessment', NULL, 5, '2026-02-15 13:13:40'),
(258, 55, 'Firewalls', NULL, 1, '2026-02-15 13:13:40'),
(259, 55, 'VPN', NULL, 2, '2026-02-15 13:13:40'),
(260, 55, 'IDS/IPS', NULL, 3, '2026-02-15 13:13:40'),
(261, 55, 'SSL/TLS', NULL, 4, '2026-02-15 13:13:40'),
(262, 55, 'Network Monitoring', NULL, 5, '2026-02-15 13:13:40'),
(263, 56, 'OWASP Top 10', NULL, 1, '2026-02-15 13:13:40'),
(264, 56, 'SQL Injection Prevention', NULL, 2, '2026-02-15 13:13:40'),
(265, 56, 'XSS Prevention', NULL, 3, '2026-02-15 13:13:40'),
(266, 56, 'CSRF Protection', NULL, 4, '2026-02-15 13:13:40'),
(267, 56, 'Security Headers', NULL, 5, '2026-02-15 13:13:40'),
(268, 1, 'Introduction to HTML', 'What is HTML and how the web works', 1, '2026-02-17 16:53:42'),
(269, 1, 'HTML Tags & Elements', 'Common HTML tags and their usage', 2, '2026-02-17 16:53:42'),
(270, 1, 'Forms & Tables', 'Creating forms and tables in HTML', 3, '2026-02-17 16:53:42'),
(271, 57, 'CSS Selectors & Properties', 'How to target and style HTML elements', 1, '2026-02-17 16:53:42'),
(272, 57, 'Flexbox & Grid', 'Modern CSS layout techniques', 2, '2026-02-17 16:53:42');

-- --------------------------------------------------------

--
-- Table structure for table `discussionreplies`
--

CREATE TABLE `discussionreplies` (
  `id` int(11) NOT NULL,
  `discussionId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `content` text NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `discussions`
--

CREATE TABLE `discussions` (
  `id` int(11) NOT NULL,
  `courseId` int(11) DEFAULT NULL,
  `userId` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `discussions`
--

INSERT INTO `discussions` (`id`, `courseId`, `userId`, `title`, `content`, `createdAt`, `updatedAt`) VALUES
(1, 1, 2, 'Welcome to Web Development!', 'Feel free to ask any questions about the course content here.', '2026-02-15 07:03:31', '2026-02-15 07:03:31'),
(2, 7, 2, 'Welcome to Web Development!', 'Feel free to ask any questions about the course content here.', '2026-02-15 10:31:21', '2026-02-15 10:31:21'),
(3, 7, 2, 'Welcome to Web Development!', 'Feel free to ask any questions about the course content here.', '2026-02-17 16:53:42', '2026-02-17 16:53:42');

-- --------------------------------------------------------

--
-- Table structure for table `doubtreplies`
--

CREATE TABLE `doubtreplies` (
  `id` int(11) NOT NULL,
  `doubtId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `content` text NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `doubtreplies`
--

INSERT INTO `doubtreplies` (`id`, `doubtId`, `userId`, `content`, `createdAt`) VALUES
(1, 1, 1, 'Its a Scripting language', '2026-02-15 10:57:30'),
(2, 1, 10, 'Thank you mam', '2026-02-17 05:53:59'),
(3, 1, 1, 'Its ok pa', '2026-02-17 05:54:18'),
(4, 1, 10, 'Mam let me know what are all the skills that i need develop myself to shine', '2026-02-17 06:00:00'),
(5, 1, 1, 'Yeah sure', '2026-02-17 06:00:14'),
(6, 1, 1, 'I will convey u', '2026-02-17 06:00:35'),
(7, 1, 10, 'Ok mam', '2026-02-17 06:00:44'),
(8, 2, 1, 'Hii Jayanthan!!!\nThis is Sowmiya from Sowberry', '2026-02-17 06:02:48'),
(9, 2, 10, 'Hello mam', '2026-02-17 06:02:54'),
(10, 3, 1, 'Hello', '2026-02-17 06:12:20'),
(11, 3, 10, 'Hii Mam', '2026-02-17 06:12:32');

-- --------------------------------------------------------

--
-- Table structure for table `doubts`
--

CREATE TABLE `doubts` (
  `id` int(11) NOT NULL,
  `studentId` int(11) NOT NULL,
  `courseId` int(11) DEFAULT NULL,
  `title` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `status` enum('open','in-progress','resolved','closed') DEFAULT 'open',
  `assignedMentorId` int(11) DEFAULT NULL,
  `priority` enum('low','medium','high') DEFAULT 'medium',
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `doubts`
--

INSERT INTO `doubts` (`id`, `studentId`, `courseId`, `title`, `description`, `status`, `assignedMentorId`, `priority`, `createdAt`, `updatedAt`) VALUES
(1, 10, 7, 'What is HTML', NULL, 'resolved', 1, 'high', '2026-02-15 10:56:23', '2026-02-17 06:00:59'),
(2, 10, 17, 'I have a doubt on Normal Forms', NULL, 'in-progress', 1, 'medium', '2026-02-17 06:01:46', '2026-02-17 06:02:48'),
(3, 10, 17, 'Dowbts on ACID Properly', NULL, 'in-progress', 1, 'medium', '2026-02-17 06:12:07', '2026-02-17 06:12:20');

-- --------------------------------------------------------

--
-- Table structure for table `eventregistrations`
--

CREATE TABLE `eventregistrations` (
  `id` int(11) NOT NULL,
  `eventId` int(11) NOT NULL,
  `studentId` int(11) NOT NULL,
  `registeredAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `status` enum('registered','attended','cancelled') DEFAULT 'registered'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `events`
--

CREATE TABLE `events` (
  `id` int(11) NOT NULL,
  `mentorId` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `eventType` enum('webinar','workshop','liveSession','hackathon','other') DEFAULT 'liveSession',
  `startDate` datetime NOT NULL,
  `endDate` datetime NOT NULL,
  `location` varchar(500) DEFAULT NULL COMMENT 'URL or physical location',
  `maxParticipants` int(11) DEFAULT 100,
  `isPublished` tinyint(1) DEFAULT 0,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `events`
--

INSERT INTO `events` (`id`, `mentorId`, `title`, `description`, `eventType`, `startDate`, `endDate`, `location`, `maxParticipants`, `isPublished`, `createdAt`, `updatedAt`) VALUES
(1, 2, 'React Masterclass', 'Deep dive into React hooks, context, and advanced patterns', 'webinar', '2026-03-01 10:00:00', '2026-03-01 12:00:00', 'https://meet.sowberry.com/react-masterclass', 200, 1, '2026-02-15 07:03:31', '2026-02-15 07:03:31'),
(2, 3, 'Design Thinking Workshop', 'Learn design thinking methodology for solving complex UX problems', 'workshop', '2026-03-05 14:00:00', '2026-03-05 17:00:00', 'https://meet.sowberry.com/design-workshop', 50, 1, '2026-02-15 07:03:31', '2026-02-15 07:03:31'),
(3, 2, 'React Masterclass', 'Deep dive into React hooks, context, and advanced patterns', 'webinar', '2026-03-01 10:00:00', '2026-03-01 12:00:00', 'https://meet.sowberry.com/react-masterclass', 200, 1, '2026-02-15 10:31:21', '2026-02-15 10:31:21'),
(4, 3, 'Design Thinking Workshop', 'Learn design thinking methodology for solving complex UX problems', 'workshop', '2026-03-05 14:00:00', '2026-03-05 17:00:00', 'https://meet.sowberry.com/design-workshop', 50, 1, '2026-02-15 10:31:21', '2026-02-15 10:31:21'),
(5, 2, 'React Masterclass', 'Deep dive into React hooks, context, and advanced patterns', 'webinar', '2026-03-01 10:00:00', '2026-03-01 12:00:00', 'https://meet.sowberry.com/react-masterclass', 200, 1, '2026-02-17 16:53:42', '2026-02-17 16:53:42'),
(6, 3, 'Design Thinking Workshop', 'Learn design thinking methodology for solving complex UX problems', 'workshop', '2026-03-05 14:00:00', '2026-03-05 17:00:00', 'https://meet.sowberry.com/design-workshop', 50, 1, '2026-02-17 16:53:42', '2026-02-17 16:53:42');

-- --------------------------------------------------------

--
-- Table structure for table `gamechallenges`
--

CREATE TABLE `gamechallenges` (
  `id` int(11) NOT NULL,
  `slug` varchar(100) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `boilerplate` text DEFAULT NULL,
  `hint` text DEFAULT NULL,
  `testCases` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`testCases`)),
  `gameType` varchar(50) NOT NULL,
  `gameTitle` varchar(255) NOT NULL,
  `gameDescription` varchar(500) DEFAULT NULL,
  `gameIcon` varchar(100) DEFAULT NULL,
  `gameColor` varchar(100) DEFAULT NULL,
  `gameAlgorithm` varchar(100) DEFAULT NULL,
  `difficulty` enum('Easy','Medium','Hard') DEFAULT 'Medium',
  `sortOrder` int(11) DEFAULT 0,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `gamechallenges`
--

INSERT INTO `gamechallenges` (`id`, `slug`, `title`, `description`, `boilerplate`, `hint`, `testCases`, `gameType`, `gameTitle`, `gameDescription`, `gameIcon`, `gameColor`, `gameAlgorithm`, `difficulty`, `sortOrder`, `createdAt`) VALUES
(1, 'dijkstra', 'Implement Dijkstra\'s Algorithm', 'Given a weighted graph as an adjacency dict, find the shortest distance from the start node to all other nodes.\nReturn a list of shortest distances.', 'import heapq\n\ndef dijkstra(graph, start):\n    # graph = {0: [(1,2),(2,4)], 1: [(2,1),(3,7)], 2: [(3,3)], 3: []}\n    # Return list of distances from start to each node\n    pass', 'Use heapq as priority queue. Initialize distances to float(\'inf\'), set dist[start]=0, relax edges.', '[{\"input\":\"{0:[(1,2),(2,4)],1:[(2,1),(3,7)],2:[(3,3)],3:[]}, 0\",\"expected\":\"[0,2,3,6]\"},{\"input\":\"{0:[(1,1)],1:[(0,1)]}, 0\",\"expected\":\"[0,1]\"}]', 'dijkstra', 'Shortest Path Explorer', 'Find the shortest path using Dijkstra\'s algorithm.', 'ri-route-line', 'from-blue-500 to-cyan-500', 'Dijkstra\'s Algorithm', 'Medium', 1, '2026-02-17 16:55:07'),
(2, 'sorting', 'Implement Bubble Sort', 'Sort a list of numbers in ascending order using Bubble Sort.\nReturn the sorted list.', 'def bubble_sort(arr):\n    # Sort arr in ascending order using bubble sort\n    pass', 'Nested loops: outer for passes, inner for comparing adjacent elements and swapping if out of order.', '[{\"input\":\"[5,3,8,4,2]\",\"expected\":\"[2,3,4,5,8]\"},{\"input\":\"[1]\",\"expected\":\"[1]\"},{\"input\":\"[9,1,5,3]\",\"expected\":\"[1,3,5,9]\"}]', 'sorting', 'Sort Visualizer', 'Race against time! Manually sort the array.', 'ri-bar-chart-line', 'from-violet-500 to-purple-500', 'Bubble Sort', 'Easy', 2, '2026-02-17 16:55:07'),
(3, 'bfs', 'Implement BFS (Breadth-First Search)', 'Given an adjacency dict, return the BFS traversal order starting from start node.\nReturn a list of visited node IDs.', 'from collections import deque\n\ndef bfs(graph, start):\n    # graph = {0:[1,2], 1:[3], 2:[3], 3:[]}\n    # Return list of nodes visited in BFS order\n    pass', 'Use a deque as queue. Start by enqueueing the start node. Dequeue, visit neighbors, enqueue unvisited ones.', '[{\"input\":\"{0:[1,2],1:[3],2:[3],3:[]}, 0\",\"expected\":\"[0,1,2,3]\"}]', 'bfs', 'Maze Runner (BFS)', 'Navigate a maze using BFS strategy.', 'ri-layout-grid-line', 'from-green-500 to-emerald-500', 'BFS Traversal', 'Medium', 3, '2026-02-17 16:55:07'),
(4, 'binary_search', 'Implement Binary Search', 'Given a sorted list and a target, return the index of the target.\nReturn -1 if not found.', 'def binary_search(arr, target):\n    # arr is sorted ascending\n    # Return index of target, or -1\n    pass', 'Maintain low and high pointers. Calculate mid, compare with target, adjust low or high.', '[{\"input\":\"[1,3,5,7,9], 5\",\"expected\":\"2\"},{\"input\":\"[2,4,6,8], 3\",\"expected\":\"-1\"},{\"input\":\"[1,2,3,4,5], 1\",\"expected\":\"0\"}]', 'binary_search', 'Number Hunter', 'Guess the hidden number with Binary Search.', 'ri-search-line', 'from-amber-500 to-orange-500', 'Binary Search', 'Easy', 4, '2026-02-17 16:55:07'),
(5, 'stack', 'Validate Balanced Brackets', 'Given a string of brackets ()[]{}. Return True if brackets are balanced, False otherwise.', 'def is_balanced(s):\n    # Use a stack to check if brackets are balanced\n    pass', 'Push opening brackets onto a stack. For closing brackets, pop and check if they match.', '[{\"input\":\"\\\"()[]{}\\\"\",\"expected\":\"True\"},{\"input\":\"\\\"([)]\\\"\",\"expected\":\"False\"},{\"input\":\"\\\"{[]}\\\"\",\"expected\":\"True\"}]', 'stack', 'Stack Overflow', 'Push/pop brackets to match the valid sequence!', 'ri-stack-line', 'from-red-500 to-rose-500', 'Stack (LIFO)', 'Easy', 5, '2026-02-17 16:55:07'),
(6, 'recursion', 'Tower of Hanoi - Count Moves', 'Return the minimum number of moves needed to solve Tower of Hanoi for n discs.', 'def hanoi(n):\n    # Return minimum moves for n discs\n    pass', 'The recurrence is: hanoi(n) = 2 * hanoi(n-1) + 1, base case hanoi(1) = 1.', '[{\"input\":\"3\",\"expected\":\"7\"},{\"input\":\"4\",\"expected\":\"15\"},{\"input\":\"1\",\"expected\":\"1\"}]', 'recursion', 'Tower of Hanoi', 'Move all discs from source to target peg.', 'ri-building-4-line', 'from-teal-500 to-cyan-500', 'Recursion', 'Hard', 6, '2026-02-17 16:55:07'),
(7, 'greedy', 'Greedy Coin Change', 'Given coin denominations [1,5,10,25] and a target amount, return the minimum number of coins needed using the greedy approach.', 'def min_coins(coins, amount):\n    # Return minimum number of coins using greedy\n    pass', 'Sort coins descending. For each coin, use as many as possible, then move to the next smaller coin.', '[{\"input\":\"[1,5,10,25], 41\",\"expected\":\"4\"},{\"input\":\"[1,5,10,25], 30\",\"expected\":\"2\"}]', 'greedy', 'Coin Change Challenge', 'Make exact change using fewest coins.', 'ri-coin-line', 'from-yellow-500 to-amber-500', 'Greedy Algorithm', 'Easy', 7, '2026-02-17 16:55:07'),
(8, 'linkedlist', 'Reverse a Linked List', 'Given a linked list as a list, reverse it and return the reversed list.\n(Simulated linked list using list)', 'def reverse_list(arr):\n    # Reverse the list (simulating linked list reversal)\n    # Do it iteratively using prev/current pointers logic\n    pass', 'Iterate through, using a \'prev\' accumulator. At each step, prepend current to result.', '[{\"input\":\"[1,2,3,4,5]\",\"expected\":\"[5,4,3,2,1]\"},{\"input\":\"[10]\",\"expected\":\"[10]\"}]', 'linkedlist', 'Chain Builder', 'Build and manipulate a linked list.', 'ri-links-line', 'from-indigo-500 to-blue-500', 'Linked List', 'Medium', 8, '2026-02-17 16:55:07'),
(9, 'hash', 'Implement a Hash Function', 'Given a list of keys and table size, return a dict mapping each bucket index to its keys.\nHash function: key % size.', 'def hash_map(keys, size):\n    # Return dict: {bucket_index: [keys...], ...}\n    # Hash function: key % size\n    pass', 'Loop through keys, compute key % size, group keys by their bucket index.', '[{\"input\":\"[3,10,17,24], 7\",\"expected\":\"{3:[3,10,17,24]}\"},{\"input\":\"[1,8,15], 7\",\"expected\":\"{1:[1,8,15]}\"}]', 'hash', 'Hash Table Quest', 'Map keys to buckets - learn hashing!', 'ri-hashtag', 'from-pink-500 to-rose-500', 'Hash Tables', 'Medium', 9, '2026-02-17 16:55:07'),
(10, 'dp', '0/1 Knapsack Problem', 'Given items as list of [weight, value] pairs and a capacity, return the maximum value achievable using DP.', 'def knapsack(items, capacity):\n    # items = [[2,3], [3,4], [4,5]]\n    # Return max value within capacity\n    pass', 'Build a 2D DP table: dp[i][w] = max value using first i items with capacity w.', '[{\"input\":\"[[2,3],[3,4],[4,5]], 5\",\"expected\":\"7\"},{\"input\":\"[[1,1],[2,6],[3,10]], 5\",\"expected\":\"16\"}]', 'dp', 'Knapsack Packer', 'Maximize value without exceeding weight.', 'ri-briefcase-4-line', 'from-emerald-500 to-green-500', 'Dynamic Programming', 'Hard', 10, '2026-02-17 16:55:07'),
(11, 'tree', 'BST Insertion & In-Order', 'Given a sequence of values, build a BST and return the in-order traversal as a list.', 'def bst_inorder(values):\n    # Insert values into BST, then return in-order traversal\n    pass', 'Create a Node class with val/left/right. Insert by comparing with current node. In-order: left, root, right.', '[{\"input\":\"[5,3,7,1,4]\",\"expected\":\"[1,3,4,5,7]\"},{\"input\":\"[10,5,15]\",\"expected\":\"[5,10,15]\"}]', 'tree', 'BST Explorer', 'Build a Binary Search Tree by inserting values.', 'ri-node-tree', 'from-orange-500 to-red-500', 'Binary Search Tree', 'Medium', 11, '2026-02-17 16:55:07'),
(12, 'graph_coloring', 'Graph Coloring Check', 'Given adjacency edges and a color assignment dict, return True if no two adjacent nodes share a color.', 'def is_valid_coloring(edges, colors):\n    # edges = [[0,1],[1,2],[0,2]]\n    # colors = {0:\'red\', 1:\'blue\', 2:\'green\'}\n    # Return True if valid coloring\n    pass', 'Loop through edges. For each edge [a,b], check if colors[a] != colors[b].', '[{\"input\":\"[[0,1],[1,2],[0,2]], {0:\'red\',1:\'blue\',2:\'green\'}\",\"expected\":\"True\"},{\"input\":\"[[0,1],[1,2],[0,2]], {0:\'red\',1:\'red\',2:\'green\'}\",\"expected\":\"False\"}]', 'graph_coloring', 'Map Coloring', 'Color a map so no adjacent regions share a color.', 'ri-palette-line', 'from-fuchsia-500 to-pink-500', 'Graph Coloring', 'Hard', 12, '2026-02-17 16:55:07'),
(13, 'selection_sort', 'Selection Sort', 'Implement selection sort that sorts a list in ascending order.\n\nFunction: selection_sort(arr) -> sorted list', 'def selection_sort(arr):\n    # Find minimum element, swap with first unsorted position\n    pass', 'Loop i from 0 to n-1. Find the minimum in arr[i..n-1] and swap it with arr[i].', '[{\"input\":\"[64,25,12,22,11]\",\"expected\":\"[11,12,22,25,64]\"},{\"input\":\"[5,1,4,2,8]\",\"expected\":\"[1,2,4,5,8]\"}]', 'sorting', 'Selection Sort', 'Find the minimum and place it at the front', 'ri-sort-asc', 'from-blue-500 to-blue-700', 'Selection Sort', 'Easy', 13, '2026-02-17 16:55:07'),
(14, 'insertion_sort', 'Insertion Sort', 'Implement insertion sort that sorts a list in ascending order.\n\nFunction: insertion_sort(arr) -> sorted list', 'def insertion_sort(arr):\n    # Insert each element into its correct position\n    pass', 'For each element starting from index 1, shift larger elements right and insert in the correct spot.', '[{\"input\":\"[12,11,13,5,6]\",\"expected\":\"[5,6,11,12,13]\"},{\"input\":\"[4,3,2,10,12,1,5,6]\",\"expected\":\"[1,2,3,4,5,6,10,12]\"}]', 'sorting', 'Insertion Sort', 'Insert each card into its sorted position', 'ri-insert-column-right', 'from-blue-300 to-blue-500', 'Insertion Sort', 'Easy', 14, '2026-02-17 16:55:07'),
(15, 'merge_sort', 'Merge Sort', 'Implement merge sort using divide and conquer.\n\nFunction: merge_sort(arr) -> sorted list', 'def merge_sort(arr):\n    if len(arr) <= 1:\n        return arr\n    # Split, sort halves, merge\n    pass', 'Split list in half, recursively sort each half, then merge the two sorted halves using two pointers.', '[{\"input\":\"[38,27,43,3,9,82,10]\",\"expected\":\"[3,9,10,27,38,43,82]\"},{\"input\":\"[5,2,8,1,9]\",\"expected\":\"[1,2,5,8,9]\"}]', 'sorting', 'Merge Sort', 'Divide, conquer, and merge the array', 'ri-git-merge-line', 'from-indigo-400 to-indigo-600', 'Merge Sort', 'Medium', 15, '2026-02-17 16:55:07'),
(16, 'quick_sort', 'Quick Sort', 'Implement quick sort.\n\nFunction: quick_sort(arr) -> sorted list', 'def quick_sort(arr):\n    if len(arr) <= 1:\n        return arr\n    # Pick pivot, partition, recurse\n    pass', 'Choose a pivot (e.g. last element). Partition into elements < pivot, equal, > pivot. Recursively sort the partitions.', '[{\"input\":\"[10,7,8,9,1,5]\",\"expected\":\"[1,5,7,8,9,10]\"},{\"input\":\"[3,6,8,10,1,2,1]\",\"expected\":\"[1,1,2,3,6,8,10]\"}]', 'sorting', 'Quick Sort', 'Partition around a pivot element', 'ri-flashlight-line', 'from-indigo-500 to-indigo-700', 'Quick Sort', 'Medium', 16, '2026-02-17 16:55:07'),
(17, 'counting_sort', 'Counting Sort', 'Implement counting sort for non-negative integers.\n\nFunction: counting_sort(arr) -> sorted list', 'def counting_sort(arr):\n    # Count occurrences, rebuild sorted list\n    pass', 'Find the max value, create a count list of that size, count each element, then rebuild from counts.', '[{\"input\":\"[4,2,2,8,3,3,1]\",\"expected\":\"[1,2,2,3,3,4,8]\"},{\"input\":\"[1,0,3,1,3,1]\",\"expected\":\"[0,1,1,1,3,3]\"}]', 'sorting', 'Counting Sort', 'Count occurrences for linear-time sorting', 'ri-calculator-line', 'from-cyan-400 to-cyan-600', 'Counting Sort', 'Easy', 17, '2026-02-17 16:55:07'),
(18, 'linear_search', 'Linear Search', 'Implement linear search returning the index of the target, or -1 if not found.\n\nFunction: linear_search(arr, target) -> index', 'def linear_search(arr, target):\n    # Check each element one by one\n    pass', 'Iterate through the list. Return the index when element == target.', '[{\"input\":\"[10,20,30,40,50], 30\",\"expected\":\"2\"},{\"input\":\"[5,8,1,3], 7\",\"expected\":\"-1\"},{\"input\":\"[1,2,3], 1\",\"expected\":\"0\"}]', 'binary_search', 'Linear Search', 'Find the target by scanning one by one', 'ri-search-line', 'from-teal-500 to-teal-700', 'Linear Search', 'Easy', 18, '2026-02-17 16:55:07'),
(19, 'jump_search', 'Jump Search', 'Implement jump search on a sorted list. Jump by sqrt(n) steps, then do linear search in the block.\n\nFunction: jump_search(arr, target) -> index or -1', 'import math\n\ndef jump_search(arr, target):\n    n = len(arr)\n    step = int(math.sqrt(n))\n    # Jump then linear search\n    pass', 'Jump ahead by sqrt(n) until arr[min(step, n)-1] >= target. Then linear search backwards in that block.', '[{\"input\":\"[0,1,2,3,5,8,13,21,34], 13\",\"expected\":\"6\"},{\"input\":\"[1,3,5,7,9], 4\",\"expected\":\"-1\"},{\"input\":\"[1,3,5,7,9], 7\",\"expected\":\"3\"}]', 'binary_search', 'Jump Search', 'Jump by sqrt(n) blocks then linear scan', 'ri-speed-line', 'from-teal-300 to-teal-500', 'Jump Search', 'Medium', 19, '2026-02-17 16:55:07'),
(20, 'range_sum', 'Prefix Sum - Range Query', 'Build a prefix sum and answer range sum queries in O(1).\n\nFunction: range_sum(arr, l, r) -> sum of arr[l..r] inclusive', 'def range_sum(arr, l, r):\n    # Build prefix sums for O(1) range queries\n    pass', 'Compute prefix[i] = arr[0]+...+arr[i]. Then range_sum(l,r) = prefix[r] - (prefix[l-1] if l > 0 else 0).', '[{\"input\":\"[1,2,3,4,5], 1, 3\",\"expected\":\"9\"},{\"input\":\"[10,20,30], 0, 2\",\"expected\":\"60\"},{\"input\":\"[5,5,5,5], 0, 0\",\"expected\":\"5\"}]', 'binary_search', 'Prefix Sum Query', 'Answer range sum queries in O(1)', 'ri-bar-chart-line', 'from-emerald-400 to-emerald-600', 'Prefix Sums', 'Easy', 20, '2026-02-17 16:55:07'),
(21, 'dfs_traversal', 'DFS Graph Traversal', 'Implement Depth-First Search on an adjacency dict.\n\nFunction: dfs(graph, start) -> list of visited nodes in DFS order\ngraph: dict {0:[1,2], 1:[3], ...}', 'def dfs(graph, start):\n    visited = []\n    # Use stack or recursion\n    return visited', 'Use a stack (append start). Pop a node, if not visited mark it and push its neighbors.', '[{\"input\":\"{0:[1,2], 1:[3], 2:[], 3:[]}, 0\",\"expected\":\"[0,1,3,2]\"},{\"input\":\"{0:[1], 1:[2], 2:[]}, 0\",\"expected\":\"[0,1,2]\"}]', 'bfs', 'DFS Explorer', 'Traverse the graph depth-first', 'ri-compass-3-line', 'from-sky-500 to-sky-700', 'Depth-First Search', 'Medium', 21, '2026-02-17 16:55:07'),
(22, 'flood_fill', 'Flood Fill', 'Fill connected same-color cells with a new color (like paint bucket).\n\nFunction: flood_fill(grid, sr, sc, new_color) -> modified grid', 'def flood_fill(grid, sr, sc, new_color):\n    # BFS/DFS from (sr,sc)\n    pass', 'Get original color at (sr,sc). BFS/DFS to all connected cells with that color, change them to new_color.', '[{\"input\":\"[[1,1,1],[1,1,0],[1,0,1]], 1, 1, 2\",\"expected\":\"[[2,2,2],[2,2,0],[2,0,1]]\"},{\"input\":\"[[0,0],[0,0]], 0, 0, 3\",\"expected\":\"[[3,3],[3,3]]\"}]', 'bfs', 'Paint Bucket', 'Flood-fill connected regions with colour', 'ri-paint-fill', 'from-sky-300 to-sky-500', 'Flood Fill (BFS)', 'Medium', 22, '2026-02-17 16:55:07'),
(23, 'island_count', 'Count Islands', 'Count the number of islands in a 2-D grid (1 = land, 0 = water). Connected horizontally/vertically.\n\nFunction: count_islands(grid) -> number', 'def count_islands(grid):\n    count = 0\n    # For each unvisited 1, BFS/DFS and increment count\n    return count', 'Iterate every cell. When you find a 1, increment count and BFS/DFS to mark all connected 1s as visited (set to 0).', '[{\"input\":\"[[1,1,0,0],[0,0,1,0],[0,0,0,1]]\",\"expected\":\"3\"},{\"input\":\"[[1,1,1],[0,1,0],[1,0,1]]\",\"expected\":\"3\"}]', 'bfs', 'Island Counter', 'Count islands in a grid of land & water', 'ri-landscape-line', 'from-lime-400 to-lime-600', 'Connected Components', 'Hard', 23, '2026-02-17 16:55:07'),
(24, 'prims_mst', 'Prim\'s MST Weight', 'Find the total weight of the Minimum Spanning Tree.\n\nFunction: prims_mst(n, edges) -> total weight\nedges: [[from, to, weight], ...]', 'import heapq\n\ndef prims_mst(n, edges):\n    # Greedy: always add cheapest edge to the growing tree\n    pass', 'Start from node 0, maintain a visited set. Always pick the minimum weight edge connecting visited to unvisited.', '[{\"input\":\"4, [[0,1,10],[0,2,6],[0,3,5],[1,3,15],[2,3,4]]\",\"expected\":\"19\"},{\"input\":\"3, [[0,1,1],[1,2,2],[0,2,3]]\",\"expected\":\"3\"}]', 'dijkstra', 'Prim\'s MST', 'Build the minimum spanning tree', 'ri-share-line', 'from-purple-500 to-purple-700', 'Prim\'s Algorithm', 'Hard', 24, '2026-02-17 16:55:07'),
(25, 'bellman_ford', 'Bellman-Ford Shortest Path', 'Find shortest distances from a source to all nodes (handles negative weights).\n\nFunction: bellman_ford(n, edges, src) -> distances list\nedges: [[from, to, weight], ...]', 'def bellman_ford(n, edges, src):\n    dist = [float(\'inf\')] * n\n    dist[src] = 0\n    # Relax all edges (n-1) times\n    return dist', 'Repeat n-1 times: for each edge (u,v,w), if dist[u]+w < dist[v] then dist[v] = dist[u]+w.', '[{\"input\":\"5, [[0,1,6],[0,2,7],[1,2,8],[1,3,5],[1,4,-4],[2,3,-3],[2,4,9],[3,1,-2],[4,0,2],[4,3,7]], 0\",\"expected\":\"[0,2,7,4,-2]\"}]', 'dijkstra', 'Bellman-Ford', 'Shortest path with negative weights', 'ri-road-map-line', 'from-fuchsia-400 to-fuchsia-600', 'Bellman-Ford', 'Hard', 25, '2026-02-17 16:55:07'),
(26, 'topo_sort', 'Topological Sort', 'Topological order of a DAG using Kahn\'s algorithm.\n\nFunction: topo_sort(n, edges) -> list of node ids in topological order\nedges: [[from, to], ...]', 'from collections import deque\n\ndef topo_sort(n, edges):\n    # Compute in-degree, BFS from 0-degree nodes\n    pass', 'Build in-degree list. Enqueue all nodes with in-degree 0. Dequeue, add to result, reduce neighbours\' in-degree.', '[{\"input\":\"6, [[5,2],[5,0],[4,0],[4,1],[2,3],[3,1]]\",\"expected\":\"valid topological order\"}]', 'dijkstra', 'Topological Sort', 'Order tasks respecting dependencies', 'ri-flow-chart', 'from-fuchsia-500 to-fuchsia-700', 'Topological Sort', 'Hard', 26, '2026-02-17 16:55:07'),
(27, 'queue_impl', 'Queue Implementation', 'Implement a Queue class with enqueue, dequeue, front and size methods.', 'class Queue:\n    def __init__(self):\n        self.items = []\n\n    def enqueue(self, val):\n        # Add to back\n        pass\n\n    def dequeue(self):\n        # Remove & return front\n        pass\n\n    def front(self):\n        # Peek front\n        pass\n\n    def size(self):\n        # Return length\n        pass', 'Use append() to add to the back and pop(0) to remove from the front.', '[{\"input\":\"enqueue(1), enqueue(2), front(), dequeue(), size()\",\"expected\":\"front=1, dequeue=1, size=1\"}]', 'stack', 'Queue Builder', 'Build a FIFO queue from scratch', 'ri-align-justify', 'from-green-500 to-green-700', 'Queue Operations', 'Easy', 27, '2026-02-17 16:55:07'),
(28, 'prefix_eval', 'Evaluate Prefix Expression', 'Evaluate a prefix (Polish notation) expression.\n\nFunction: eval_prefix(tokens) -> number\ntokens: list of strings, e.g. [\'+\',\'3\',\'4\'] -> 7', 'def eval_prefix(tokens):\n    # Process right-to-left with a stack\n    pass', 'Traverse tokens right to left. Push numbers onto stack. On operator, pop two operands, compute, push result.', '[{\"input\":\"[\'+\',\'3\',\'4\']\",\"expected\":\"7\"},{\"input\":\"[\'*\',\'+\',\'2\',\'3\',\'4\']\",\"expected\":\"20\"},{\"input\":\"[\'-\',\'10\',\'5\']\",\"expected\":\"5\"}]', 'stack', 'Prefix Evaluator', 'Evaluate Polish notation expressions', 'ri-terminal-box-line', 'from-green-300 to-green-500', 'Stack + Prefix', 'Medium', 28, '2026-02-17 16:55:07'),
(29, 'infix_postfix', 'Infix to Postfix', 'Convert infix expression to postfix (Reverse Polish Notation).\n\nFunction: to_postfix(tokens) -> list in postfix order\nSupport +, -, *, / and parentheses', 'def to_postfix(tokens):\n    # Shunting-yard algorithm\n    pass', 'Use an operator stack and output list. Pop higher/equal precedence ops before pushing new op. Parentheses reset precedence.', '[{\"input\":\"[\'3\',\'+\',\'4\']\",\"expected\":\"[\'3\',\'4\',\'+\']\"},{\"input\":\"[\'(\',\'3\',\'+\',\'4\',\')\',\'*\',\'2\']\",\"expected\":\"[\'3\',\'4\',\'+\',\'2\',\'*\']\"}]', 'stack', 'Shunting Yard', 'Convert infix to postfix notation', 'ri-code-box-line', 'from-lime-500 to-lime-700', 'Shunting-Yard', 'Medium', 29, '2026-02-17 16:55:07'),
(30, 'fibonacci_climb', 'Stair Climbing (Fibonacci)', 'You can climb 1 or 2 steps at a time. How many distinct ways to reach step n?\n\nFunction: climb_stairs(n) -> number of ways', 'def climb_stairs(n):\n    # DP or recursion with memo\n    pass', 'climb_stairs(n) = climb_stairs(n-1) + climb_stairs(n-2). Base cases: climb_stairs(1)=1, climb_stairs(2)=2.', '[{\"input\":\"3\",\"expected\":\"3\"},{\"input\":\"5\",\"expected\":\"8\"},{\"input\":\"1\",\"expected\":\"1\"},{\"input\":\"10\",\"expected\":\"89\"}]', 'recursion', 'Stair Climber', 'Count ways to climb n stairs', 'ri-footprint-line', 'from-yellow-500 to-yellow-700', 'Fibonacci / DP', 'Easy', 30, '2026-02-17 16:55:07'),
(31, 'subset_sum', 'Subset Sum', 'Given positive integers and a target sum, return True if any subset sums to target.\n\nFunction: has_subset_sum(arr, target) -> bool', 'def has_subset_sum(arr, target):\n    # Recursion or DP\n    pass', 'For each element: include it (reduce target) or exclude it (keep target). Base: target==0 -> True, empty list -> False.', '[{\"input\":\"[3,34,4,12,5,2], 9\",\"expected\":\"True\"},{\"input\":\"[3,34,4,12,5,2], 30\",\"expected\":\"False\"},{\"input\":\"[1,2,3], 6\",\"expected\":\"True\"}]', 'recursion', 'Subset Sum', 'Find if a subset sums to a target', 'ri-checkbox-multiple-line', 'from-yellow-300 to-yellow-500', 'Subset Sum', 'Medium', 31, '2026-02-17 16:55:07'),
(32, 'activity_select', 'Activity Selection', 'Find the maximum number of non-overlapping activities.\n\nFunction: max_activities(acts) -> count\nacts: [[start, end], ...]', 'def max_activities(acts):\n    # Greedy: pick by earliest finish time\n    pass', 'Sort by end time. Pick the first activity, then always pick the next whose start >= last picked end.', '[{\"input\":\"[[1,4],[3,5],[0,6],[5,7],[3,9],[5,9],[6,10],[8,11],[8,12],[2,14],[12,16]]\",\"expected\":\"4\"},{\"input\":\"[[1,2],[2,3],[3,4]]\",\"expected\":\"3\"}]', 'greedy', 'Activity Selector', 'Pick maximum non-overlapping activities', 'ri-calendar-check-line', 'from-amber-500 to-amber-700', 'Activity Selection', 'Medium', 32, '2026-02-17 16:55:07'),
(33, 'char_frequency', 'Frequency Sort', 'Sort characters of a string by frequency (descending). Same-frequency chars in original order.\n\nFunction: freq_sort(s) -> rearranged string', 'def freq_sort(s):\n    # Count chars, sort by frequency desc\n    pass', 'Build a frequency dict, then sort characters by their frequency descending.', '[{\"input\":\"\'tree\'\",\"expected\":\"\'eert\' or \'eetr\'\"},{\"input\":\"\'aab\'\",\"expected\":\"\'aab\'\"}]', 'greedy', 'Frequency Sort', 'Sort characters by their frequency', 'ri-bar-chart-2-line', 'from-amber-300 to-amber-500', 'Frequency Counting', 'Medium', 33, '2026-02-17 16:55:07'),
(34, 'job_schedule', 'Job Scheduling', 'Schedule jobs with deadlines to maximise profit (at most one job per time slot).\n\nFunction: job_schedule(jobs) -> max profit\njobs: [[deadline, profit], ...]', 'def job_schedule(jobs):\n    # Sort by profit desc, assign to latest free slot\n    pass', 'Sort by profit descending. For each job try to schedule it at the latest free slot <= its deadline.', '[{\"input\":\"[[2,100],[1,19],[2,27],[1,25],[3,15]]\",\"expected\":\"142\"}]', 'greedy', 'Job Scheduler', 'Schedule jobs for maximum profit', 'ri-time-line', 'from-orange-500 to-orange-700', 'Job Scheduling', 'Hard', 34, '2026-02-17 16:55:07'),
(35, 'doubly_linked', 'Reverse Doubly Linked List', 'Simulate reversing a doubly linked list by reversing a list in-place.\n\nFunction: reverse_list(arr) -> reversed list', 'def reverse_list(arr):\n    # Swap from both ends toward the center\n    pass', 'Use two pointers (start and end), swap elements, move inward until they meet.', '[{\"input\":\"[1,2,3,4,5]\",\"expected\":\"[5,4,3,2,1]\"},{\"input\":\"[10,20]\",\"expected\":\"[20,10]\"}]', 'linkedlist', 'Reverse List', 'Reverse a doubly linked list', 'ri-arrow-left-right-line', 'from-orange-300 to-orange-500', 'Doubly Linked List', 'Medium', 35, '2026-02-17 16:55:07'),
(36, 'cycle_detect', 'Detect Cycle in Graph', 'Given an undirected graph, detect if it contains a cycle.\n\nFunction: has_cycle(n, edges) -> bool\nedges: [[u, v], ...]', 'def has_cycle(n, edges):\n    # Union-Find or DFS\n    pass', 'Union-Find: for each edge, if both endpoints already share the same root, a cycle exists.', '[{\"input\":\"4, [[0,1],[1,2],[2,3],[3,0]]\",\"expected\":\"True\"},{\"input\":\"3, [[0,1],[1,2]]\",\"expected\":\"False\"}]', 'linkedlist', 'Cycle Detector', 'Detect a cycle in a graph', 'ri-refresh-line', 'from-red-500 to-red-700', 'Union-Find', 'Medium', 36, '2026-02-17 16:55:07'),
(37, 'merge_sorted', 'Merge Two Sorted Lists', 'Merge two sorted lists into one sorted list.\n\nFunction: merge_sorted(a, b) -> merged sorted list', 'def merge_sorted(a, b):\n    result = []\n    # Two-pointer merge\n    return result', 'Maintain two indices i, j. Compare a[i] and b[j], append the smaller one, advance that pointer.', '[{\"input\":\"[1,3,5], [2,4,6]\",\"expected\":\"[1,2,3,4,5,6]\"},{\"input\":\"[1,1], [2,2]\",\"expected\":\"[1,1,2,2]\"}]', 'linkedlist', 'Merge Sorted', 'Merge two sorted arrays into one', 'ri-merge-cells-horizontal', 'from-red-300 to-red-500', 'Two-Pointer Merge', 'Easy', 37, '2026-02-17 16:55:07'),
(38, 'two_sum_hash', 'Two Sum (Hash Map)', 'Find two indices whose values sum to target using a hash map.\n\nFunction: two_sum(arr, target) -> [i, j]', 'def two_sum(arr, target):\n    seen = {}\n    # Store complement -> index\n    pass', 'For each number, check if (target - number) exists in the dict. If yes return both indices; otherwise store number->index.', '[{\"input\":\"[2,7,11,15], 9\",\"expected\":\"[0,1]\"},{\"input\":\"[3,2,4], 6\",\"expected\":\"[1,2]\"}]', 'hash', 'Two Sum Hash', 'Solve Two Sum with a hash map', 'ri-add-circle-line', 'from-rose-500 to-rose-700', 'Hash Map Lookup', 'Easy', 38, '2026-02-17 16:55:07'),
(39, 'anagram_group', 'Group Anagrams', 'Group words that are anagrams of each other.\n\nFunction: group_anagrams(words) -> list of groups', 'def group_anagrams(words):\n    groups = {}\n    # Sort each word as key\n    pass', 'For each word, sort its letters to create a key. Map key -> [words]. Return all values of the dict.', '[{\"input\":\"[\'eat\',\'tea\',\'tan\',\'ate\',\'nat\',\'bat\']\",\"expected\":\"[[\'eat\',\'tea\',\'ate\'],[\'tan\',\'nat\'],[\'bat\']]\"}]', 'hash', 'Anagram Groups', 'Group words that are anagrams', 'ri-text', 'from-rose-300 to-rose-500', 'Hash Grouping', 'Medium', 39, '2026-02-17 16:55:07'),
(40, 'lcs_dp', 'Longest Common Subsequence', 'Find the length of the longest common subsequence of two strings.\n\nFunction: lcs(a, b) -> number', 'def lcs(a, b):\n    # Build a 2-D DP table\n    pass', 'dp[i][j] = LCS length of a[0..i-1] and b[0..j-1]. If a[i-1]==b[j-1] -> dp[i-1][j-1]+1, else max(dp[i-1][j], dp[i][j-1]).', '[{\"input\":\"\'abcde\', \'ace\'\",\"expected\":\"3\"},{\"input\":\"\'abc\', \'def\'\",\"expected\":\"0\"},{\"input\":\"\'abc\', \'abc\'\",\"expected\":\"3\"}]', 'dp', 'LCS Challenge', 'Find the longest common subsequence', 'ri-text-wrap', 'from-pink-500 to-pink-700', 'LCS (DP)', 'Hard', 40, '2026-02-17 16:55:07'),
(41, 'lis_dp', 'Longest Increasing Subsequence', 'Find length of the longest strictly increasing subsequence.\n\nFunction: lis(arr) -> number', 'def lis(arr):\n    # dp[i] = LIS length ending at index i\n    pass', 'dp[i] = 1 + max(dp[j]) for all j < i where arr[j] < arr[i]. Answer is max(dp).', '[{\"input\":\"[10,9,2,5,3,7,101,18]\",\"expected\":\"4\"},{\"input\":\"[0,1,0,3,2,3]\",\"expected\":\"4\"}]', 'dp', 'LIS Challenge', 'Find the longest increasing subsequence', 'ri-line-chart-line', 'from-pink-300 to-pink-500', 'LIS (DP)', 'Hard', 41, '2026-02-17 16:55:07'),
(42, 'rod_cutting', 'Rod Cutting', 'Given a rod of length n and prices for each length, find maximum revenue.\n\nFunction: rod_cut(prices, n) -> max revenue\nprices[i] = price for length (i+1)', 'def rod_cut(prices, n):\n    # dp[i] = max revenue for rod of length i\n    pass', 'dp[i] = max(prices[j-1] + dp[i-j]) for j = 1..i. Base: dp[0] = 0.', '[{\"input\":\"[1,5,8,9,10,17,17,20], 8\",\"expected\":\"22\"},{\"input\":\"[3,5,8,9,10,17,17,20], 4\",\"expected\":\"12\"}]', 'dp', 'Rod Cutter', 'Cut a rod for maximum revenue', 'ri-scissors-cut-line', 'from-violet-500 to-violet-700', 'Rod Cutting (DP)', 'Hard', 42, '2026-02-17 16:55:07'),
(43, 'heap_build', 'Build Min-Heap', 'Rearrange a list into a valid min-heap (parent <= children).\n\nFunction: build_min_heap(arr) -> min-heap list', 'def build_min_heap(arr):\n    # Heapify from last non-leaf up to root\n    pass', 'Start from i = len(arr)//2 - 1 down to 0. Swap with smallest child if needed, then sift down.', '[{\"input\":\"[5,3,8,1,2]\",\"expected\":\"valid min-heap\"}]', 'tree', 'Heap Builder', 'Build a min-heap from an array', 'ri-stack-line', 'from-violet-300 to-violet-500', 'Min-Heap', 'Medium', 43, '2026-02-17 16:55:07'),
(44, 'avl_check', 'Balanced BST Check', 'Check if a binary tree (given as level-order list, None for missing) is a balanced BST.\n\nFunction: is_balanced_bst(arr) -> bool\nBalanced = height diff of subtrees <= 1 AND BST property holds', 'def is_balanced_bst(arr):\n    # Rebuild tree, verify BST + balance\n    pass', 'Reconstruct the tree from the list. Check in-order traversal is sorted (BST) and height difference <= 1 at every node.', '[{\"input\":\"[2,1,3]\",\"expected\":\"True\"},{\"input\":\"[5,3,7,2,4,6,8]\",\"expected\":\"True\"}]', 'tree', 'Balance Checker', 'Check if a tree is a balanced BST', 'ri-scales-3-line', 'from-purple-300 to-purple-500', 'Balanced BST', 'Hard', 44, '2026-02-17 16:55:07'),
(45, 'bipartite_check', 'Bipartite Graph Check', 'Determine if an undirected graph is bipartite (2-colourable).\n\nFunction: is_bipartite(n, edges) -> bool\nedges: [[u, v], ...]', 'from collections import deque\n\ndef is_bipartite(n, edges):\n    # BFS/DFS 2-colouring\n    pass', 'Colour start node 0. BFS: colour every uncoloured neighbour with the opposite colour. If a neighbour already has the same colour -> not bipartite.', '[{\"input\":\"4, [[0,1],[1,2],[2,3],[3,0]]\",\"expected\":\"True\"},{\"input\":\"3, [[0,1],[1,2],[2,0]]\",\"expected\":\"False\"}]', 'graph_coloring', 'Bipartite Tester', 'Check if a graph is 2-colourable', 'ri-split-cells-horizontal', 'from-fuchsia-300 to-fuchsia-500', 'Bipartite Check', 'Hard', 45, '2026-02-17 16:55:07');

-- --------------------------------------------------------

--
-- Table structure for table `gameunlocks`
--

CREATE TABLE `gameunlocks` (
  `id` int(11) NOT NULL,
  `studentId` int(11) NOT NULL,
  `challengeSlug` varchar(100) NOT NULL,
  `unlockedAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `gameunlocks`
--

INSERT INTO `gameunlocks` (`id`, `studentId`, `challengeSlug`, `unlockedAt`) VALUES
(1, 26, 'sorting', '2026-02-17 17:03:09');

-- --------------------------------------------------------

--
-- Table structure for table `grades`
--

CREATE TABLE `grades` (
  `id` int(11) NOT NULL,
  `studentId` int(11) NOT NULL,
  `courseId` int(11) DEFAULT NULL,
  `assignmentId` int(11) DEFAULT NULL,
  `testId` int(11) DEFAULT NULL,
  `gradeType` enum('assignment','aptitude','course','overall') DEFAULT 'assignment',
  `score` decimal(8,2) DEFAULT 0.00,
  `maxScore` decimal(8,2) DEFAULT 100.00,
  `percentage` decimal(5,2) DEFAULT 0.00,
  `gradedAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `grades`
--

INSERT INTO `grades` (`id`, `studentId`, `courseId`, `assignmentId`, `testId`, `gradeType`, `score`, `maxScore`, `percentage`, `gradedAt`) VALUES
(2, 10, NULL, NULL, NULL, 'aptitude', 0.00, 15.00, 0.00, '2026-02-15 12:32:43'),
(3, 10, NULL, NULL, 12, 'aptitude', 3.00, 10.00, 30.00, '2026-02-16 04:58:53'),
(4, 10, NULL, NULL, 7, 'aptitude', 2.00, 10.00, 20.00, '2026-02-16 05:11:55'),
(5, 10, NULL, NULL, NULL, 'aptitude', 0.00, 26.00, 0.00, '2026-02-16 10:28:33');

-- --------------------------------------------------------

--
-- Table structure for table `notifications`
--

CREATE TABLE `notifications` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `message` text DEFAULT NULL,
  `type` enum('info','success','warning','error') DEFAULT 'info',
  `isRead` tinyint(1) DEFAULT 0,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `otpcodes`
--

CREATE TABLE `otpcodes` (
  `id` int(11) NOT NULL,
  `userId` int(11) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `code` varchar(10) NOT NULL,
  `expiresAt` datetime NOT NULL,
  `isUsed` tinyint(1) DEFAULT 0,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `otpcodes`
--

INSERT INTO `otpcodes` (`id`, `userId`, `email`, `code`, `expiresAt`, `isUsed`, `createdAt`) VALUES
(1, 10, 'itsmejayanthan@gmail.com', '161448', '2026-02-15 14:02:17', 0, '2026-02-15 08:22:17'),
(2, 20, 'jayanthan@gmail.com', '395460', '2026-02-15 17:31:02', 0, '2026-02-15 11:51:02');

-- --------------------------------------------------------

--
-- Table structure for table `profilerequests`
--

CREATE TABLE `profilerequests` (
  `id` int(11) NOT NULL,
  `studentId` int(11) NOT NULL,
  `type` enum('edit','delete') NOT NULL,
  `requestData` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`requestData`)),
  `reason` text DEFAULT NULL,
  `status` enum('pending','approved','rejected') DEFAULT 'pending',
  `adminNote` text DEFAULT NULL,
  `reviewedBy` int(11) DEFAULT NULL,
  `reviewedAt` datetime DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `studymaterials`
--

CREATE TABLE `studymaterials` (
  `id` int(11) NOT NULL,
  `courseId` int(11) DEFAULT NULL,
  `mentorId` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `fileUrl` varchar(500) DEFAULT NULL,
  `fileType` varchar(50) DEFAULT NULL,
  `category` varchar(100) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `studymaterials`
--

INSERT INTO `studymaterials` (`id`, `courseId`, `mentorId`, `title`, `description`, `fileUrl`, `fileType`, `category`, `createdAt`) VALUES
(1, 1, 2, 'HTML & CSS Basics Guide', 'Comprehensive reference guide for HTML tags and CSS properties', NULL, 'pdf', 'Reference', '2026-02-15 07:03:31'),
(2, 7, 2, 'HTML & CSS Basics Guide', 'Comprehensive reference guide for HTML tags and CSS properties', NULL, 'pdf', 'Reference', '2026-02-15 10:31:21'),
(3, 7, 2, 'HTML & CSS Basics Guide', 'Comprehensive reference guide for HTML tags and CSS properties', NULL, 'pdf', 'Reference', '2026-02-17 16:53:42');

-- --------------------------------------------------------

--
-- Table structure for table `systemsettings`
--

CREATE TABLE `systemsettings` (
  `id` int(11) NOT NULL,
  `settingKey` varchar(100) NOT NULL,
  `settingValue` text DEFAULT NULL,
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `systemsettings`
--

INSERT INTO `systemsettings` (`id`, `settingKey`, `settingValue`, `updatedAt`) VALUES
(1, 'siteName', 'Sowberry Academy', '2026-02-15 07:03:31'),
(2, 'siteEmail', 'berries@sowberry.com', '2026-02-15 07:03:31'),
(3, 'sitePhone', '+91 8825756388', '2026-02-15 07:03:31'),
(4, 'maxFileUploadSize', '10', '2026-02-15 07:03:31'),
(5, 'maintenanceMode', 'false', '2026-02-15 07:03:31'),
(6, 'studentRegistration', 'true', '2026-02-15 07:03:31'),
(7, 'mentorRegistration', 'true', '2026-02-15 07:03:31');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `username` varchar(100) NOT NULL,
  `fullName` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `countryCode` varchar(10) DEFAULT '+91',
  `role` enum('admin','mentor','student') NOT NULL DEFAULT 'student',
  `profileImage` varchar(500) DEFAULT NULL,
  `college` varchar(255) DEFAULT NULL,
  `department` varchar(255) DEFAULT NULL,
  `year` varchar(20) DEFAULT NULL,
  `rollNumber` varchar(100) DEFAULT NULL,
  `gender` varchar(20) DEFAULT NULL,
  `dateOfBirth` date DEFAULT NULL,
  `address` text DEFAULT NULL,
  `bio` text DEFAULT NULL,
  `github` varchar(500) DEFAULT NULL,
  `linkedin` varchar(500) DEFAULT NULL,
  `hackerrank` varchar(500) DEFAULT NULL,
  `leetcode` varchar(500) DEFAULT NULL,
  `isVerified` tinyint(1) DEFAULT 0,
  `isActive` tinyint(1) DEFAULT 1,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `username`, `fullName`, `password`, `phone`, `countryCode`, `role`, `profileImage`, `college`, `department`, `year`, `rollNumber`, `gender`, `dateOfBirth`, `address`, `bio`, `github`, `linkedin`, `hackerrank`, `leetcode`, `isVerified`, `isActive`, `createdAt`, `updatedAt`) VALUES
(1, 'admin@sowberry.com', 'sowadmin', 'Sowmiya', '$2a$10$4kVQUYhv.KkoYoPO5eH81O0cYHA6U.b5u9ede7z07H/dhoHO7h0JG', '', '+91', 'admin', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, 1, '2026-02-15 07:03:31', '2026-02-15 08:07:50'),
(2, 'mentor1@sowberry.com', 'jayanthan_m', 'Jayanthan S', '$2a$10$9I1glhmgxbbdqYwnEfVQj.15hokfKE28lg75tzOUVQI2zUMOipTfm', '8825756381', '+91', 'mentor', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, 1, '2026-02-15 07:03:31', '2026-02-15 07:03:31'),
(3, 'mentor2@sowberry.com', 'prithika_m', 'Prithika K', '$2a$10$9I1glhmgxbbdqYwnEfVQj.15hokfKE28lg75tzOUVQI2zUMOipTfm', '8825756382', '+91', 'mentor', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, 1, '2026-02-15 07:03:31', '2026-02-15 07:03:31'),
(4, 'mentor3@sowberry.com', 'sreelekha_m', 'Sreelekha S', '$2a$10$9I1glhmgxbbdqYwnEfVQj.15hokfKE28lg75tzOUVQI2zUMOipTfm', '8825756383', '+91', 'mentor', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, 1, '2026-02-15 07:03:31', '2026-02-15 07:03:31'),
(10, 'itsmejayanthan@gmail.com', 'jayanthan', 'Jayanthan S', '$2a$10$c86hi1osMG2Fuq7KPP3eZOWx1adxqR0cw9NiS/hg1sfRmvgUgoydy', '+918825756388', '+91', 'student', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, 1, '2026-02-15 08:22:17', '2026-02-15 08:22:17'),
(20, 'jayanthan@gmail.com', 'jayanthan18', 'Jayanthan S', '$2a$10$a/ANSIFNEpMxtAGQCzFZDeqhBWIFbMGaIMmbKsgnEClouk./z0Zbu', '+918825756388', '+91', 'student', '/uploads/profiles/profile_1771156262106.jpg', 'IIT Madras', 'AIML', 'IV year', '927622BAL016', 'Male', '2004-11-18', 'Karur', 'Hello', NULL, NULL, NULL, NULL, 0, 1, '2026-02-15 11:51:02', '2026-02-15 11:51:02'),
(26, 'student1@sowberry.com', 'aarav_s', 'Aarav Kumar', '$2a$10$p3Fdz13Bfzr21nNWQAPbr.ZJnVC8rfp.CEUDplKIKV8Ai3Bh1.TbC', '9442556781', '+91', 'student', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, 1, '2026-02-17 16:53:42', '2026-02-17 16:53:42'),
(27, 'student2@sowberry.com', 'diya_s', 'Diya Sharma', '$2a$10$p3Fdz13Bfzr21nNWQAPbr.ZJnVC8rfp.CEUDplKIKV8Ai3Bh1.TbC', '9442556782', '+91', 'student', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, 1, '2026-02-17 16:53:42', '2026-02-17 16:53:42'),
(28, 'student3@sowberry.com', 'arjun_s', 'Arjun Patel', '$2a$10$p3Fdz13Bfzr21nNWQAPbr.ZJnVC8rfp.CEUDplKIKV8Ai3Bh1.TbC', '9442556783', '+91', 'student', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, 1, '2026-02-17 16:53:42', '2026-02-17 16:53:42'),
(29, 'student4@sowberry.com', 'ananya_s', 'Ananya Roy', '$2a$10$p3Fdz13Bfzr21nNWQAPbr.ZJnVC8rfp.CEUDplKIKV8Ai3Bh1.TbC', '9442556784', '+91', 'student', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, 1, '2026-02-17 16:53:42', '2026-02-17 16:53:42'),
(30, 'student5@sowberry.com', 'rohan_s', 'Rohan Singh', '$2a$10$p3Fdz13Bfzr21nNWQAPbr.ZJnVC8rfp.CEUDplKIKV8Ai3Bh1.TbC', '9442556785', '+91', 'student', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, 1, '2026-02-17 16:53:42', '2026-02-17 16:53:42');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `activitylogs`
--
ALTER TABLE `activitylogs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_user` (`userId`),
  ADD KEY `idx_created` (`createdAt`);

--
-- Indexes for table `aptitudeanswers`
--
ALTER TABLE `aptitudeanswers`
  ADD PRIMARY KEY (`id`),
  ADD KEY `attemptId` (`attemptId`),
  ADD KEY `questionId` (`questionId`);

--
-- Indexes for table `aptitudequestions`
--
ALTER TABLE `aptitudequestions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_test` (`testId`);

--
-- Indexes for table `aptitudetestattempts`
--
ALTER TABLE `aptitudetestattempts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `testId` (`testId`),
  ADD KEY `idx_student` (`studentId`);

--
-- Indexes for table `aptitudetests`
--
ALTER TABLE `aptitudetests`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_mentor` (`mentorId`);

--
-- Indexes for table `assignments`
--
ALTER TABLE `assignments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_course` (`courseId`),
  ADD KEY `idx_mentor` (`mentorId`);

--
-- Indexes for table `assignmentsubmissions`
--
ALTER TABLE `assignmentsubmissions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_submission` (`assignmentId`,`studentId`),
  ADD KEY `gradedBy` (`gradedBy`),
  ADD KEY `idx_student` (`studentId`);

--
-- Indexes for table `codingproblems`
--
ALTER TABLE `codingproblems`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_mentor` (`mentorId`),
  ADD KEY `idx_difficulty` (`difficulty`);

--
-- Indexes for table `codingsubmissions`
--
ALTER TABLE `codingsubmissions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_student` (`studentId`),
  ADD KEY `idx_problem` (`problemId`);

--
-- Indexes for table `contactmessages`
--
ALTER TABLE `contactmessages`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_unread` (`isRead`);

--
-- Indexes for table `coursecontent`
--
ALTER TABLE `coursecontent`
  ADD PRIMARY KEY (`id`),
  ADD KEY `uploadedBy` (`uploadedBy`),
  ADD KEY `idx_course` (`courseId`),
  ADD KEY `idx_subject` (`subjectId`);

--
-- Indexes for table `courseenrollments`
--
ALTER TABLE `courseenrollments`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_enrollment` (`courseId`,`studentId`),
  ADD KEY `idx_student` (`studentId`);

--
-- Indexes for table `coursematerials`
--
ALTER TABLE `coursematerials`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_course` (`courseId`);

--
-- Indexes for table `courses`
--
ALTER TABLE `courses`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_mentor` (`mentorId`),
  ADD KEY `idx_published` (`isPublished`);

--
-- Indexes for table `coursesubjects`
--
ALTER TABLE `coursesubjects`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_course` (`courseId`);

--
-- Indexes for table `coursetopics`
--
ALTER TABLE `coursetopics`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_subject` (`subjectId`);

--
-- Indexes for table `discussionreplies`
--
ALTER TABLE `discussionreplies`
  ADD PRIMARY KEY (`id`),
  ADD KEY `discussionId` (`discussionId`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `discussions`
--
ALTER TABLE `discussions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`),
  ADD KEY `idx_course` (`courseId`);

--
-- Indexes for table `doubtreplies`
--
ALTER TABLE `doubtreplies`
  ADD PRIMARY KEY (`id`),
  ADD KEY `doubtId` (`doubtId`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `doubts`
--
ALTER TABLE `doubts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `courseId` (`courseId`),
  ADD KEY `idx_student` (`studentId`),
  ADD KEY `idx_mentor` (`assignedMentorId`),
  ADD KEY `idx_status` (`status`);

--
-- Indexes for table `eventregistrations`
--
ALTER TABLE `eventregistrations`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_registration` (`eventId`,`studentId`),
  ADD KEY `studentId` (`studentId`);

--
-- Indexes for table `events`
--
ALTER TABLE `events`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_mentor` (`mentorId`);

--
-- Indexes for table `gamechallenges`
--
ALTER TABLE `gamechallenges`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `slug` (`slug`);

--
-- Indexes for table `gameunlocks`
--
ALTER TABLE `gameunlocks`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uq_student_challenge` (`studentId`,`challengeSlug`);

--
-- Indexes for table `grades`
--
ALTER TABLE `grades`
  ADD PRIMARY KEY (`id`),
  ADD KEY `courseId` (`courseId`),
  ADD KEY `assignmentId` (`assignmentId`),
  ADD KEY `testId` (`testId`),
  ADD KEY `idx_student` (`studentId`);

--
-- Indexes for table `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_user` (`userId`),
  ADD KEY `idx_unread` (`userId`,`isRead`);

--
-- Indexes for table `otpcodes`
--
ALTER TABLE `otpcodes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`),
  ADD KEY `idx_email_code` (`email`,`code`);

--
-- Indexes for table `profilerequests`
--
ALTER TABLE `profilerequests`
  ADD PRIMARY KEY (`id`),
  ADD KEY `reviewedBy` (`reviewedBy`),
  ADD KEY `idx_student` (`studentId`),
  ADD KEY `idx_status` (`status`),
  ADD KEY `idx_type` (`type`);

--
-- Indexes for table `studymaterials`
--
ALTER TABLE `studymaterials`
  ADD PRIMARY KEY (`id`),
  ADD KEY `mentorId` (`mentorId`),
  ADD KEY `idx_course` (`courseId`);

--
-- Indexes for table `systemsettings`
--
ALTER TABLE `systemsettings`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `settingKey` (`settingKey`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `username` (`username`),
  ADD KEY `idx_role` (`role`),
  ADD KEY `idx_email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `activitylogs`
--
ALTER TABLE `activitylogs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;

--
-- AUTO_INCREMENT for table `aptitudeanswers`
--
ALTER TABLE `aptitudeanswers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `aptitudequestions`
--
ALTER TABLE `aptitudequestions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3990;

--
-- AUTO_INCREMENT for table `aptitudetestattempts`
--
ALTER TABLE `aptitudetestattempts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `aptitudetests`
--
ALTER TABLE `aptitudetests`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=167;

--
-- AUTO_INCREMENT for table `assignments`
--
ALTER TABLE `assignments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `assignmentsubmissions`
--
ALTER TABLE `assignmentsubmissions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `codingproblems`
--
ALTER TABLE `codingproblems`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=97;

--
-- AUTO_INCREMENT for table `codingsubmissions`
--
ALTER TABLE `codingsubmissions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `contactmessages`
--
ALTER TABLE `contactmessages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `coursecontent`
--
ALTER TABLE `coursecontent`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=83;

--
-- AUTO_INCREMENT for table `courseenrollments`
--
ALTER TABLE `courseenrollments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=120;

--
-- AUTO_INCREMENT for table `coursematerials`
--
ALTER TABLE `coursematerials`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `courses`
--
ALTER TABLE `courses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT for table `coursesubjects`
--
ALTER TABLE `coursesubjects`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=60;

--
-- AUTO_INCREMENT for table `coursetopics`
--
ALTER TABLE `coursetopics`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=273;

--
-- AUTO_INCREMENT for table `discussionreplies`
--
ALTER TABLE `discussionreplies`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `discussions`
--
ALTER TABLE `discussions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `doubtreplies`
--
ALTER TABLE `doubtreplies`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `doubts`
--
ALTER TABLE `doubts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `eventregistrations`
--
ALTER TABLE `eventregistrations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `events`
--
ALTER TABLE `events`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `gamechallenges`
--
ALTER TABLE `gamechallenges`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;

--
-- AUTO_INCREMENT for table `gameunlocks`
--
ALTER TABLE `gameunlocks`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `grades`
--
ALTER TABLE `grades`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `notifications`
--
ALTER TABLE `notifications`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `otpcodes`
--
ALTER TABLE `otpcodes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `profilerequests`
--
ALTER TABLE `profilerequests`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `studymaterials`
--
ALTER TABLE `studymaterials`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `systemsettings`
--
ALTER TABLE `systemsettings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `activitylogs`
--
ALTER TABLE `activitylogs`
  ADD CONSTRAINT `activitylogs_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `aptitudeanswers`
--
ALTER TABLE `aptitudeanswers`
  ADD CONSTRAINT `aptitudeanswers_ibfk_1` FOREIGN KEY (`attemptId`) REFERENCES `aptitudetestattempts` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `aptitudeanswers_ibfk_2` FOREIGN KEY (`questionId`) REFERENCES `aptitudequestions` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `aptitudequestions`
--
ALTER TABLE `aptitudequestions`
  ADD CONSTRAINT `aptitudequestions_ibfk_1` FOREIGN KEY (`testId`) REFERENCES `aptitudetests` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `aptitudetestattempts`
--
ALTER TABLE `aptitudetestattempts`
  ADD CONSTRAINT `aptitudetestattempts_ibfk_1` FOREIGN KEY (`testId`) REFERENCES `aptitudetests` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `aptitudetestattempts_ibfk_2` FOREIGN KEY (`studentId`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `aptitudetests`
--
ALTER TABLE `aptitudetests`
  ADD CONSTRAINT `aptitudetests_ibfk_1` FOREIGN KEY (`mentorId`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `assignments`
--
ALTER TABLE `assignments`
  ADD CONSTRAINT `assignments_ibfk_1` FOREIGN KEY (`courseId`) REFERENCES `courses` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `assignments_ibfk_2` FOREIGN KEY (`mentorId`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `assignmentsubmissions`
--
ALTER TABLE `assignmentsubmissions`
  ADD CONSTRAINT `assignmentsubmissions_ibfk_1` FOREIGN KEY (`assignmentId`) REFERENCES `assignments` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `assignmentsubmissions_ibfk_2` FOREIGN KEY (`studentId`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `assignmentsubmissions_ibfk_3` FOREIGN KEY (`gradedBy`) REFERENCES `users` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `codingproblems`
--
ALTER TABLE `codingproblems`
  ADD CONSTRAINT `codingproblems_ibfk_1` FOREIGN KEY (`mentorId`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `codingsubmissions`
--
ALTER TABLE `codingsubmissions`
  ADD CONSTRAINT `codingsubmissions_ibfk_1` FOREIGN KEY (`problemId`) REFERENCES `codingproblems` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `codingsubmissions_ibfk_2` FOREIGN KEY (`studentId`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `coursecontent`
--
ALTER TABLE `coursecontent`
  ADD CONSTRAINT `coursecontent_ibfk_1` FOREIGN KEY (`courseId`) REFERENCES `courses` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `coursecontent_ibfk_2` FOREIGN KEY (`subjectId`) REFERENCES `coursesubjects` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `coursecontent_ibfk_3` FOREIGN KEY (`uploadedBy`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `courseenrollments`
--
ALTER TABLE `courseenrollments`
  ADD CONSTRAINT `courseenrollments_ibfk_1` FOREIGN KEY (`courseId`) REFERENCES `courses` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `courseenrollments_ibfk_2` FOREIGN KEY (`studentId`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `coursematerials`
--
ALTER TABLE `coursematerials`
  ADD CONSTRAINT `coursematerials_ibfk_1` FOREIGN KEY (`courseId`) REFERENCES `courses` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `courses`
--
ALTER TABLE `courses`
  ADD CONSTRAINT `courses_ibfk_1` FOREIGN KEY (`mentorId`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `coursesubjects`
--
ALTER TABLE `coursesubjects`
  ADD CONSTRAINT `coursesubjects_ibfk_1` FOREIGN KEY (`courseId`) REFERENCES `courses` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `coursetopics`
--
ALTER TABLE `coursetopics`
  ADD CONSTRAINT `coursetopics_ibfk_1` FOREIGN KEY (`subjectId`) REFERENCES `coursesubjects` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `discussionreplies`
--
ALTER TABLE `discussionreplies`
  ADD CONSTRAINT `discussionreplies_ibfk_1` FOREIGN KEY (`discussionId`) REFERENCES `discussions` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `discussionreplies_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `discussions`
--
ALTER TABLE `discussions`
  ADD CONSTRAINT `discussions_ibfk_1` FOREIGN KEY (`courseId`) REFERENCES `courses` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `discussions_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `doubtreplies`
--
ALTER TABLE `doubtreplies`
  ADD CONSTRAINT `doubtreplies_ibfk_1` FOREIGN KEY (`doubtId`) REFERENCES `doubts` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `doubtreplies_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `doubts`
--
ALTER TABLE `doubts`
  ADD CONSTRAINT `doubts_ibfk_1` FOREIGN KEY (`studentId`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `doubts_ibfk_2` FOREIGN KEY (`courseId`) REFERENCES `courses` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `doubts_ibfk_3` FOREIGN KEY (`assignedMentorId`) REFERENCES `users` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `eventregistrations`
--
ALTER TABLE `eventregistrations`
  ADD CONSTRAINT `eventregistrations_ibfk_1` FOREIGN KEY (`eventId`) REFERENCES `events` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `eventregistrations_ibfk_2` FOREIGN KEY (`studentId`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `events`
--
ALTER TABLE `events`
  ADD CONSTRAINT `events_ibfk_1` FOREIGN KEY (`mentorId`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `gameunlocks`
--
ALTER TABLE `gameunlocks`
  ADD CONSTRAINT `gameunlocks_ibfk_1` FOREIGN KEY (`studentId`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `grades`
--
ALTER TABLE `grades`
  ADD CONSTRAINT `grades_ibfk_1` FOREIGN KEY (`studentId`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `grades_ibfk_2` FOREIGN KEY (`courseId`) REFERENCES `courses` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `grades_ibfk_3` FOREIGN KEY (`assignmentId`) REFERENCES `assignments` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `grades_ibfk_4` FOREIGN KEY (`testId`) REFERENCES `aptitudetests` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `notifications`
--
ALTER TABLE `notifications`
  ADD CONSTRAINT `notifications_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `otpcodes`
--
ALTER TABLE `otpcodes`
  ADD CONSTRAINT `otpcodes_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `profilerequests`
--
ALTER TABLE `profilerequests`
  ADD CONSTRAINT `profilerequests_ibfk_1` FOREIGN KEY (`studentId`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `profilerequests_ibfk_2` FOREIGN KEY (`reviewedBy`) REFERENCES `users` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `studymaterials`
--
ALTER TABLE `studymaterials`
  ADD CONSTRAINT `studymaterials_ibfk_1` FOREIGN KEY (`courseId`) REFERENCES `courses` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `studymaterials_ibfk_2` FOREIGN KEY (`mentorId`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
