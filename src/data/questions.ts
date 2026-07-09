// ============================================
// COMPLETE INTERVIEW QUESTIONS & ANSWERS DATA
// Single source of truth — preserved exactly
// ============================================

export interface Question {
  id: number;
  section: number;
  sectionTitle: string;
  category: string;
  question: string;
  answer: string;
  sqlCode?: string;
  pythonCode?: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  tags: string[];
  tips?: string;
  mistakes?: string;
  takeaways?: string;
  example?: string;
  relatedIds?: number[];
}

export const questions: Question[] = [
  {
    id: 1,
    section: 1,
    sectionTitle: 'SQL Basics',
    category: 'SQL',
    question: 'What is SQL?',
    answer: 'SQL (Structured Query Language) is a standard language used to store, retrieve, manipulate, and manage data in relational database management systems (RDBMS) like MySQL, SQL Server, Oracle, PostgreSQL.',
    difficulty: 'Beginner',
    tags: ['sql', 'basics', 'definition'],
    tips: 'Emphasize that SQL is declarative — you describe WHAT you want, not HOW to get it.',
    mistakes: 'Confusing SQL with NoSQL or saying SQL is a programming language (it\'s a query language).',
    takeaways: 'SQL is the universal language for relational databases and a must-know for data roles.',
    relatedIds: [2, 3],
  },
  {
    id: 2,
    section: 1,
    sectionTitle: 'SQL Basics',
    category: 'SQL',
    question: 'What are the different types of SQL commands?',
    answer: `DDL (Data Definition Language) → CREATE, ALTER, DROP, TRUNCATE
DML (Data Manipulation Language) → INSERT, UPDATE, DELETE
DCL (Data Control Language) → GRANT, REVOKE
TCL (Transaction Control Language) → COMMIT, ROLLBACK, SAVEPOINT
DQL (Data Query Language) → SELECT`,
    difficulty: 'Beginner',
    tags: ['sql', 'commands', 'ddl', 'dml', 'dcl', 'tcl', 'dql'],
    tips: 'Remember: DDL changes structure, DML changes data, DCL changes permissions.',
    mistakes: 'Forgetting TCL commands or mixing up DDL vs DML.',
    takeaways: 'Know the 5 categories and at least 2 commands from each.',
    relatedIds: [1, 3],
  },
  {
    id: 3,
    section: 1,
    sectionTitle: 'SQL Basics',
    category: 'SQL',
    question: 'What is the difference between DELETE, TRUNCATE, and DROP?',
    answer: `DELETE: DML, removes rows (can use WHERE), can be rolled back, slower (logs each row), triggers fire.
TRUNCATE: DDL, removes all rows, cannot use WHERE, faster, resets identity, minimal logging, mostly cannot rollback.
DROP: DDL, removes entire table structure + data permanently.`,
    sqlCode: `DELETE FROM Employees WHERE Department = 'HR';
TRUNCATE TABLE Employees;
DROP TABLE Employees;`,
    difficulty: 'Beginner',
    tags: ['sql', 'delete', 'truncate', 'drop', 'ddl', 'dml'],
    tips: 'Use a comparison table in your answer to show speed, rollback, WHERE, and logging differences.',
    mistakes: 'Saying TRUNCATE can be rolled back (it can in some RDBMS but generally not).',
    takeaways: 'DELETE = selective removal, TRUNCATE = fast wipe, DROP = destroy table.',
    relatedIds: [1, 2],
  },
  {
    id: 4,
    section: 1,
    sectionTitle: 'SQL Basics',
    category: 'SQL',
    question: 'What is the difference between WHERE and HAVING?',
    answer: 'WHERE filters rows BEFORE grouping/aggregation and cannot use aggregate functions. HAVING filters groups AFTER GROUP BY and can use aggregate functions.',
    sqlCode: `SELECT Department, COUNT(*) AS EmpCount
FROM Employees
WHERE Status = 'Active'
GROUP BY Department
HAVING COUNT(*) > 5;`,
    difficulty: 'Beginner',
    tags: ['sql', 'where', 'having', 'filter', 'group by'],
    tips: 'Think of WHERE as a row filter and HAVING as a group filter.',
    mistakes: 'Using HAVING without GROUP BY or trying aggregate functions in WHERE.',
    takeaways: 'WHERE = before aggregation, HAVING = after aggregation.',
    relatedIds: [5, 27, 28],
  },
  {
    id: 5,
    section: 1,
    sectionTitle: 'SQL Basics',
    category: 'SQL',
    question: 'What is GROUP BY?',
    answer: 'GROUP BY groups rows that have the same values in specified columns into summary rows, typically used with aggregate functions like SUM, COUNT, AVG.',
    sqlCode: `SELECT Department, SUM(Salary) AS TotalSalary
FROM Employees
GROUP BY Department;`,
    difficulty: 'Beginner',
    tags: ['sql', 'group by', 'aggregation'],
    tips: 'Every column in SELECT must be in GROUP BY or inside an aggregate function.',
    mistakes: 'Including non-aggregated columns in SELECT that aren\'t in GROUP BY.',
    takeaways: 'GROUP BY turns rows into grouped summaries.',
    relatedIds: [4, 6, 27],
  },
  {
    id: 6,
    section: 1,
    sectionTitle: 'SQL Basics',
    category: 'SQL',
    question: 'What is ORDER BY?',
    answer: 'ORDER BY sorts the result set by one or more columns, ascending (ASC, default) or descending (DESC).',
    sqlCode: 'SELECT Name, Salary FROM Employees ORDER BY Salary DESC;',
    difficulty: 'Beginner',
    tags: ['sql', 'order by', 'sorting'],
    tips: 'ORDER BY is always the last clause executed in a query.',
    mistakes: 'Forgetting that NULL values sort differently across databases.',
    takeaways: 'ASC is default. You can ORDER BY multiple columns.',
    relatedIds: [5, 7],
  },
  {
    id: 7,
    section: 1,
    sectionTitle: 'SQL Basics',
    category: 'SQL',
    question: 'What is DISTINCT?',
    answer: 'DISTINCT removes duplicate rows from the result set, returning only unique values.',
    sqlCode: 'SELECT DISTINCT Department FROM Employees;',
    difficulty: 'Beginner',
    tags: ['sql', 'distinct', 'duplicates'],
    tips: 'DISTINCT applies to the entire row, not just one column.',
    mistakes: 'Using DISTINCT when GROUP BY would be more appropriate for aggregation.',
    takeaways: 'DISTINCT is a quick way to see unique values in a column.',
    relatedIds: [6, 31],
  },
  {
    id: 8,
    section: 1,
    sectionTitle: 'SQL Basics',
    category: 'SQL',
    question: 'What is the difference between CHAR and VARCHAR?',
    answer: 'CHAR is fixed-length (pads with spaces to defined length, faster for fixed-size data). VARCHAR is variable-length (stores only actual data + small overhead, saves space, better for variable text).',
    difficulty: 'Beginner',
    tags: ['sql', 'data types', 'char', 'varchar'],
    tips: 'Use CHAR for fixed-length codes (state codes, ZIP), VARCHAR for names/descriptions.',
    mistakes: 'Using CHAR for variable-length text wastes storage space.',
    takeaways: 'CHAR = fixed, padded. VARCHAR = variable, efficient.',
    relatedIds: [9, 10],
  },
  {
    id: 9,
    section: 1,
    sectionTitle: 'SQL Basics',
    category: 'SQL',
    question: 'What is a Primary Key?',
    answer: 'A column (or set of columns) that uniquely identifies each row in a table. It cannot contain NULL values and must be unique.',
    sqlCode: `CREATE TABLE Employees (
    EmpID INT PRIMARY KEY,
    Name VARCHAR(100)
);`,
    difficulty: 'Beginner',
    tags: ['sql', 'primary key', 'constraints'],
    tips: 'Every table should have a primary key. Composite keys use multiple columns.',
    mistakes: 'Allowing NULLs or duplicates in a primary key column.',
    takeaways: 'Primary Key = unique + not null identifier for each row.',
    relatedIds: [10, 65],
  },
  {
    id: 10,
    section: 1,
    sectionTitle: 'SQL Basics',
    category: 'SQL',
    question: 'What is a Foreign Key?',
    answer: 'A column that creates a link between two tables by referencing the Primary Key of another table, enforcing referential integrity.',
    sqlCode: `CREATE TABLE Orders (
    OrderID INT PRIMARY KEY,
    EmpID INT,
    FOREIGN KEY (EmpID) REFERENCES Employees(EmpID)
);`,
    difficulty: 'Beginner',
    tags: ['sql', 'foreign key', 'constraints', 'relationships'],
    tips: 'Foreign keys enforce that values in one table must exist in the referenced table.',
    mistakes: 'Inserting a foreign key value that doesn\'t exist in the parent table.',
    takeaways: 'Foreign Key links tables and enforces referential integrity.',
    relatedIds: [9, 11],
  },
  {
    id: 11,
    section: 2,
    sectionTitle: 'SQL Joins',
    category: 'SQL',
    question: 'Explain INNER JOIN.',
    answer: 'Returns only rows that have matching values in BOTH tables.',
    sqlCode: `SELECT e.Name, d.DeptName
FROM Employees e
INNER JOIN Departments d ON e.DeptID = d.DeptID;`,
    difficulty: 'Beginner',
    tags: ['sql', 'joins', 'inner join'],
    tips: 'INNER JOIN is the most common join — use it when you only want matched records.',
    mistakes: 'Confusing INNER JOIN with LEFT JOIN — INNER drops unmatched rows.',
    takeaways: 'INNER JOIN = intersection of both tables.',
    relatedIds: [12, 13, 14, 16],
  },
  {
    id: 12,
    section: 2,
    sectionTitle: 'SQL Joins',
    category: 'SQL',
    question: 'Explain LEFT JOIN.',
    answer: 'Returns ALL rows from the left table, plus matched rows from the right table. Unmatched right-side columns show NULL.',
    sqlCode: `SELECT e.Name, d.DeptName
FROM Employees e
LEFT JOIN Departments d ON e.DeptID = d.DeptID;`,
    difficulty: 'Beginner',
    tags: ['sql', 'joins', 'left join'],
    tips: 'Use LEFT JOIN when you want all records from the primary table regardless of matches.',
    mistakes: 'Filtering on the right table in WHERE instead of the ON clause (turns it into INNER JOIN).',
    takeaways: 'LEFT JOIN = all left rows + matching right rows (NULLs for no match).',
    relatedIds: [11, 13, 16, 44],
  },
  {
    id: 13,
    section: 2,
    sectionTitle: 'SQL Joins',
    category: 'SQL',
    question: 'Explain RIGHT JOIN.',
    answer: 'Returns ALL rows from the right table, plus matched rows from the left table. Unmatched left-side columns show NULL.',
    sqlCode: `SELECT e.Name, d.DeptName
FROM Employees e
RIGHT JOIN Departments d ON e.DeptID = d.DeptID;`,
    difficulty: 'Beginner',
    tags: ['sql', 'joins', 'right join'],
    tips: 'RIGHT JOIN is rarely used — you can always rewrite it as a LEFT JOIN by swapping table order.',
    mistakes: 'Using RIGHT JOIN when LEFT JOIN with swapped tables is clearer.',
    takeaways: 'RIGHT JOIN = mirror of LEFT JOIN.',
    relatedIds: [11, 12, 14],
  },
  {
    id: 14,
    section: 2,
    sectionTitle: 'SQL Joins',
    category: 'SQL',
    question: 'Explain FULL OUTER JOIN.',
    answer: 'Returns all rows from both tables; matches where possible, NULLs where no match exists on either side.',
    sqlCode: `SELECT e.Name, d.DeptName
FROM Employees e
FULL OUTER JOIN Departments d ON e.DeptID = d.DeptID;`,
    difficulty: 'Intermediate',
    tags: ['sql', 'joins', 'full outer join'],
    tips: 'Use FULL OUTER JOIN for data reconciliation — finding records in either table without a match.',
    mistakes: 'Not handling NULLs properly in FULL OUTER JOIN results.',
    takeaways: 'FULL OUTER JOIN = union of LEFT and RIGHT joins.',
    relatedIds: [11, 12, 13, 15],
  },
  {
    id: 15,
    section: 2,
    sectionTitle: 'SQL Joins',
    category: 'SQL',
    question: 'Explain CROSS JOIN.',
    answer: 'Returns the Cartesian product of two tables — every row of Table A combined with every row of Table B. No join condition needed.',
    sqlCode: `SELECT e.Name, s.ShiftName
FROM Employees e
CROSS JOIN Shifts s;`,
    difficulty: 'Intermediate',
    tags: ['sql', 'joins', 'cross join', 'cartesian product'],
    tips: 'CROSS JOIN is useful for generating all combinations (e.g., products × regions).',
    mistakes: 'Accidentally creating a CROSS JOIN by forgetting the ON clause — causes massive result sets.',
    takeaways: 'CROSS JOIN = every combination of rows from both tables.',
    relatedIds: [11, 14],
  },
  {
    id: 16,
    section: 2,
    sectionTitle: 'SQL Joins',
    category: 'SQL',
    question: 'Difference between INNER JOIN and LEFT JOIN.',
    answer: 'INNER JOIN returns only matching rows from both tables. LEFT JOIN returns all rows from the left table regardless of a match, filling unmatched right-side columns with NULL.',
    difficulty: 'Beginner',
    tags: ['sql', 'joins', 'comparison'],
    tips: 'Draw a Venn diagram — INNER = overlap only, LEFT = full left circle + overlap.',
    mistakes: 'Not realizing LEFT JOIN can inflate row count if there are multiple matches on the right.',
    takeaways: 'INNER = matched only. LEFT = all left + matched right.',
    relatedIds: [11, 12],
  },
  {
    id: 17,
    section: 2,
    sectionTitle: 'SQL Joins',
    category: 'SQL',
    question: 'Difference between JOIN and UNION.',
    answer: 'JOIN combines columns from two tables side-by-side based on a related column. UNION stacks rows from two queries vertically (same number/type of columns) and removes duplicates (UNION ALL keeps them).',
    sqlCode: `SELECT City FROM Customers
UNION
SELECT City FROM Suppliers;`,
    difficulty: 'Beginner',
    tags: ['sql', 'joins', 'union', 'comparison'],
    tips: 'JOIN = horizontal combination. UNION = vertical combination.',
    mistakes: 'Using UNION with different column counts or incompatible data types.',
    takeaways: 'JOIN adds columns. UNION adds rows.',
    relatedIds: [11, 18],
  },
  {
    id: 18,
    section: 2,
    sectionTitle: 'SQL Joins',
    category: 'SQL',
    question: 'What is SELF JOIN?',
    answer: 'A table joined with itself, typically used for hierarchical data like employee-manager relationships. Requires table aliases.',
    sqlCode: `SELECT e1.Name AS Employee, e2.Name AS Manager
FROM Employees e1
JOIN Employees e2 ON e1.ManagerID = e2.EmpID;`,
    difficulty: 'Intermediate',
    tags: ['sql', 'joins', 'self join', 'hierarchy'],
    tips: 'Always use meaningful aliases (e1 for employee, e2 for manager).',
    mistakes: 'Not using aliases — the query won\'t work without them.',
    takeaways: 'SELF JOIN = same table joined to itself with different aliases.',
    relatedIds: [11, 19],
  },
  {
    id: 19,
    section: 2,
    sectionTitle: 'SQL Joins',
    category: 'SQL',
    question: 'Explain NATURAL JOIN.',
    answer: 'Automatically joins two tables based on all columns with the same name and compatible data type, without specifying an ON condition. (Not supported in SQL Server; supported in MySQL/Oracle/PostgreSQL.)',
    sqlCode: 'SELECT * FROM Employees NATURAL JOIN Departments;',
    difficulty: 'Intermediate',
    tags: ['sql', 'joins', 'natural join'],
    tips: 'Avoid NATURAL JOIN in production — it\'s fragile if column names change.',
    mistakes: 'Using NATURAL JOIN when tables share column names that shouldn\'t be joined on.',
    takeaways: 'NATURAL JOIN = auto-match on same-named columns.',
    relatedIds: [11, 18],
  },
  {
    id: 20,
    section: 2,
    sectionTitle: 'SQL Joins',
    category: 'SQL',
    question: 'Give a real-time example of JOIN.',
    answer: 'Example: An e-commerce database has an Orders table and a Customers table linked by CustomerID. To generate an invoice showing customer name with their order details, you INNER JOIN Orders with Customers on CustomerID.',
    sqlCode: `SELECT c.CustomerName, o.OrderID, o.OrderDate, o.Amount
FROM Orders o
INNER JOIN Customers c ON o.CustomerID = c.CustomerID;`,
    difficulty: 'Beginner',
    tags: ['sql', 'joins', 'real-world', 'example'],
    tips: 'Always have a real-world example ready for JOIN questions.',
    takeaways: 'JOINs connect related business entities across tables.',
    example: 'E-commerce invoice generation — linking orders to customer information.',
    relatedIds: [11, 12],
  },
  {
    id: 21,
    section: 3,
    sectionTitle: 'Aggregate Functions',
    category: 'SQL',
    question: 'Explain COUNT().',
    answer: 'Returns the number of rows matching a condition.',
    sqlCode: 'SELECT COUNT(*) FROM Employees;',
    difficulty: 'Beginner',
    tags: ['sql', 'aggregate', 'count'],
    tips: 'COUNT(*) counts all rows including NULLs. COUNT(column) counts non-NULL values.',
    mistakes: 'Using COUNT(*) when you need to exclude NULLs.',
    takeaways: 'COUNT is the most basic aggregate — always clarify * vs column.',
    relatedIds: [22, 23, 26],
  },
  {
    id: 22,
    section: 3,
    sectionTitle: 'Aggregate Functions',
    category: 'SQL',
    question: 'Explain SUM().',
    answer: 'Returns the total sum of a numeric column.',
    sqlCode: 'SELECT SUM(Salary) FROM Employees;',
    difficulty: 'Beginner',
    tags: ['sql', 'aggregate', 'sum'],
    tips: 'SUM ignores NULL values. Use COALESCE to treat NULLs as 0 if needed.',
    mistakes: 'Using SUM on non-numeric columns.',
    takeaways: 'SUM = total of all values in a numeric column.',
    relatedIds: [21, 23, 24, 25],
  },
  {
    id: 23,
    section: 3,
    sectionTitle: 'Aggregate Functions',
    category: 'SQL',
    question: 'Explain AVG().',
    answer: 'Returns the average value of a numeric column.',
    sqlCode: 'SELECT AVG(Salary) FROM Employees;',
    difficulty: 'Beginner',
    tags: ['sql', 'aggregate', 'avg', 'average'],
    tips: 'AVG ignores NULLs — the denominator is count of non-NULL values.',
    mistakes: 'Expecting AVG to include NULL rows in the denominator.',
    takeaways: 'AVG = SUM / COUNT(non-NULL values).',
    relatedIds: [21, 22, 35],
  },
  {
    id: 24,
    section: 3,
    sectionTitle: 'Aggregate Functions',
    category: 'SQL',
    question: 'Explain MIN().',
    answer: 'Returns the smallest value in a column.',
    sqlCode: 'SELECT MIN(Salary) FROM Employees;',
    difficulty: 'Beginner',
    tags: ['sql', 'aggregate', 'min'],
    tips: 'MIN works on dates, strings (alphabetical), and numbers.',
    takeaways: 'MIN = lowest value. Works across data types.',
    relatedIds: [25, 21],
  },
  {
    id: 25,
    section: 3,
    sectionTitle: 'Aggregate Functions',
    category: 'SQL',
    question: 'Explain MAX().',
    answer: 'Returns the largest value in a column.',
    sqlCode: 'SELECT MAX(Salary) FROM Employees;',
    difficulty: 'Beginner',
    tags: ['sql', 'aggregate', 'max'],
    tips: 'MAX works on dates (latest date), strings, and numbers.',
    takeaways: 'MAX = highest value. Commonly used with dates to find the latest.',
    relatedIds: [24, 21, 33],
  },
  {
    id: 26,
    section: 3,
    sectionTitle: 'Aggregate Functions',
    category: 'SQL',
    question: 'Difference between COUNT(*) and COUNT(column_name).',
    answer: 'COUNT(*) counts all rows, including those with NULLs. COUNT(column_name) counts only non-NULL values in that column.',
    difficulty: 'Beginner',
    tags: ['sql', 'aggregate', 'count', 'null'],
    tips: 'This is a very common interview trick question — always mention NULL handling.',
    mistakes: 'Assuming COUNT(*) and COUNT(column) always return the same result.',
    takeaways: 'COUNT(*) = total rows. COUNT(col) = non-NULL values in that column.',
    relatedIds: [21, 28],
  },
  {
    id: 27,
    section: 3,
    sectionTitle: 'Aggregate Functions',
    category: 'SQL',
    question: 'How does GROUP BY work with aggregate functions?',
    answer: 'GROUP BY splits data into groups based on column values, and the aggregate function (SUM, COUNT, AVG etc.) is then calculated separately for each group.',
    sqlCode: `SELECT Department, COUNT(*), AVG(Salary)
FROM Employees
GROUP BY Department;`,
    difficulty: 'Beginner',
    tags: ['sql', 'group by', 'aggregate'],
    tips: 'Think of GROUP BY as creating buckets — each aggregate runs per bucket.',
    takeaways: 'GROUP BY + aggregate = per-group calculations.',
    relatedIds: [5, 4, 28],
  },
  {
    id: 28,
    section: 3,
    sectionTitle: 'Aggregate Functions',
    category: 'SQL',
    question: 'What is HAVING COUNT(*) > 1 used for?',
    answer: 'It filters grouped results to show only groups that have more than one row — commonly used to find duplicate records.',
    sqlCode: `SELECT Email, COUNT(*)
FROM Customers
GROUP BY Email
HAVING COUNT(*) > 1;`,
    difficulty: 'Beginner',
    tags: ['sql', 'having', 'duplicates', 'group by'],
    tips: 'HAVING COUNT(*) > 1 is the classic way to find duplicates in interviews.',
    takeaways: 'HAVING filters groups. COUNT(*) > 1 = duplicates.',
    relatedIds: [4, 31, 27],
  },
  {
    id: 29,
    section: 3,
    sectionTitle: 'Aggregate Functions',
    category: 'SQL',
    question: 'Difference between aggregate and scalar functions.',
    answer: 'Aggregate functions (SUM, AVG, COUNT, MIN, MAX) operate on a set of rows and return a single summarized value. Scalar functions (UPPER, LEN, ROUND, GETDATE) operate on a single value per row and return one result per row.',
    difficulty: 'Intermediate',
    tags: ['sql', 'aggregate', 'scalar', 'functions'],
    tips: 'Aggregate = many rows → one value. Scalar = one row → one value.',
    takeaways: 'Know the distinction and examples of each.',
    relatedIds: [21, 30],
  },
  {
    id: 30,
    section: 3,
    sectionTitle: 'Aggregate Functions',
    category: 'SQL',
    question: 'Give examples of aggregate functions.',
    answer: 'COUNT(), SUM(), AVG(), MIN(), MAX(), and also STDEV(), VAR() in some databases.',
    difficulty: 'Beginner',
    tags: ['sql', 'aggregate', 'examples'],
    takeaways: 'The big 5: COUNT, SUM, AVG, MIN, MAX.',
    relatedIds: [21, 22, 23, 24, 25],
  },
  {
    id: 31,
    section: 4,
    sectionTitle: 'Query Writing',
    category: 'SQL',
    question: 'Find duplicate records.',
    answer: 'Use GROUP BY on the key column with HAVING COUNT(*) > 1.',
    sqlCode: `SELECT Email, COUNT(*) AS Cnt
FROM Customers
GROUP BY Email
HAVING COUNT(*) > 1;`,
    difficulty: 'Intermediate',
    tags: ['sql', 'duplicates', 'query', 'group by', 'having'],
    tips: 'This is one of the most commonly asked SQL interview questions.',
    takeaways: 'GROUP BY + HAVING COUNT(*) > 1 = find duplicates.',
    relatedIds: [32, 28],
  },
  {
    id: 32,
    section: 4,
    sectionTitle: 'Query Writing',
    category: 'SQL',
    question: 'Remove duplicate records.',
    answer: 'Use a CTE with ROW_NUMBER() partitioned by the duplicate key, then delete rows where row number > 1.',
    sqlCode: `WITH CTE AS (
    SELECT *, ROW_NUMBER() OVER (PARTITION BY Email ORDER BY CustomerID) AS rn
    FROM Customers
)
DELETE FROM CTE WHERE rn > 1;`,
    difficulty: 'Intermediate',
    tags: ['sql', 'duplicates', 'delete', 'cte', 'row_number'],
    tips: 'Always backup before deleting. Test with SELECT first.',
    mistakes: 'Deleting without checking which rows will be removed.',
    takeaways: 'ROW_NUMBER() + CTE = elegant deduplication.',
    relatedIds: [31, 55, 53],
  },
  {
    id: 33,
    section: 4,
    sectionTitle: 'Query Writing',
    category: 'SQL',
    question: 'Find second highest salary.',
    answer: 'Use a subquery with MAX and a WHERE filter, or DENSE_RANK().',
    sqlCode: `-- Method 1: Subquery
SELECT MAX(Salary) AS SecondHighest
FROM Employees
WHERE Salary < (SELECT MAX(Salary) FROM Employees);

-- Method 2: DENSE_RANK
SELECT Salary FROM (
    SELECT Salary, DENSE_RANK() OVER (ORDER BY Salary DESC) AS rnk
    FROM Employees
) t WHERE rnk = 2;`,
    difficulty: 'Intermediate',
    tags: ['sql', 'salary', 'subquery', 'dense_rank', 'ranking'],
    tips: 'DENSE_RANK is preferred — it handles ties and generalizes to Nth highest.',
    mistakes: 'Using RANK() instead of DENSE_RANK() — RANK() can skip numbers.',
    takeaways: 'Nth highest salary = DENSE_RANK() WHERE rnk = N.',
    relatedIds: [34, 55, 57],
  },
  {
    id: 34,
    section: 4,
    sectionTitle: 'Query Writing',
    category: 'SQL',
    question: 'Find third highest salary.',
    answer: 'Same approach as second highest but with rnk = 3.',
    sqlCode: `SELECT Salary FROM (
    SELECT Salary, DENSE_RANK() OVER (ORDER BY Salary DESC) AS rnk
    FROM Employees
) t WHERE rnk = 3;`,
    difficulty: 'Intermediate',
    tags: ['sql', 'salary', 'ranking', 'dense_rank'],
    tips: 'Generalize: replace 3 with any N for Nth highest.',
    takeaways: 'DENSE_RANK() is the go-to for Nth value problems.',
    relatedIds: [33, 57],
  },
  {
    id: 35,
    section: 4,
    sectionTitle: 'Query Writing',
    category: 'SQL',
    question: 'Find employees earning above average salary.',
    answer: 'Use a subquery to calculate AVG, then filter in WHERE.',
    sqlCode: `SELECT Name, Salary
FROM Employees
WHERE Salary > (SELECT AVG(Salary) FROM Employees);`,
    difficulty: 'Intermediate',
    tags: ['sql', 'salary', 'subquery', 'avg'],
    tips: 'This can also be done with a CTE or correlated subquery for per-department average.',
    takeaways: 'Subquery in WHERE for comparing against aggregate values.',
    relatedIds: [23, 51, 52],
  },
  {
    id: 36,
    section: 4,
    sectionTitle: 'Query Writing',
    category: 'SQL',
    question: 'Find Top 5 highest-selling products.',
    answer: 'Use TOP (SQL Server) or LIMIT (MySQL) with ORDER BY DESC.',
    sqlCode: `SELECT TOP 5 ProductName, SUM(Quantity) AS TotalSold
FROM Sales
GROUP BY ProductName
ORDER BY TotalSold DESC;
-- MySQL: use LIMIT 5 instead of TOP 5`,
    difficulty: 'Intermediate',
    tags: ['sql', 'top', 'limit', 'ranking', 'sales'],
    tips: 'Always specify ORDER BY with TOP/LIMIT — without it, results are unpredictable.',
    takeaways: 'TOP N + ORDER BY DESC = top performers.',
    relatedIds: [37, 77],
  },
  {
    id: 37,
    section: 4,
    sectionTitle: 'Query Writing',
    category: 'SQL',
    question: 'Find Top 10 customers by sales.',
    answer: 'Group by CustomerID, sum Amount, order descending, take top 10.',
    sqlCode: `SELECT TOP 10 CustomerID, SUM(Amount) AS TotalSpent
FROM Orders
GROUP BY CustomerID
ORDER BY TotalSpent DESC;`,
    difficulty: 'Intermediate',
    tags: ['sql', 'top', 'customers', 'sales', 'ranking'],
    tips: 'Consider using DENSE_RANK if you need to handle ties.',
    takeaways: 'GROUP BY + SUM + ORDER BY DESC + TOP = customer ranking.',
    relatedIds: [36, 76],
  },
  {
    id: 38,
    section: 4,
    sectionTitle: 'Query Writing',
    category: 'SQL',
    question: 'Find total sales by region.',
    answer: 'Group by Region and sum the Amount.',
    sqlCode: `SELECT Region, SUM(Amount) AS TotalSales
FROM Sales
GROUP BY Region;`,
    difficulty: 'Beginner',
    tags: ['sql', 'sales', 'group by', 'region'],
    takeaways: 'Simple GROUP BY + SUM for regional analysis.',
    relatedIds: [39, 78],
  },
  {
    id: 39,
    section: 4,
    sectionTitle: 'Query Writing',
    category: 'SQL',
    question: 'Find monthly sales report.',
    answer: 'Extract YEAR and MONTH from OrderDate, group and sum.',
    sqlCode: `SELECT YEAR(OrderDate) AS Yr, MONTH(OrderDate) AS Mth, SUM(Amount) AS TotalSales
FROM Orders
GROUP BY YEAR(OrderDate), MONTH(OrderDate)
ORDER BY Yr, Mth;`,
    difficulty: 'Intermediate',
    tags: ['sql', 'sales', 'monthly', 'date functions'],
    tips: 'Use YEAR() and MONTH() for SQL Server. Other databases may use EXTRACT().',
    takeaways: 'Date functions + GROUP BY = time-series reporting.',
    relatedIds: [38, 71, 73],
  },
  {
    id: 40,
    section: 4,
    sectionTitle: 'Query Writing',
    category: 'SQL',
    question: 'Count total orders per customer.',
    answer: 'Group by CustomerID and count.',
    sqlCode: `SELECT CustomerID, COUNT(*) AS OrderCount
FROM Orders
GROUP BY CustomerID;`,
    difficulty: 'Beginner',
    tags: ['sql', 'count', 'orders', 'customer'],
    takeaways: 'GROUP BY + COUNT = per-entity counts.',
    relatedIds: [75, 21],
  },
  {
    id: 41,
    section: 5,
    sectionTitle: 'Scenario-Based SQL',
    category: 'SQL',
    question: 'How would you optimize a slow SQL query?',
    answer: 'Key techniques: add appropriate indexes on WHERE/JOIN/ORDER BY columns; avoid SELECT * (select only needed columns); avoid functions on indexed columns in WHERE clause; use EXISTS instead of IN for large subqueries; check the execution plan; avoid unnecessary JOINs/subqueries; use appropriate data types; partition very large tables; update statistics/rebuild indexes periodically.',
    difficulty: 'Advanced',
    tags: ['sql', 'performance', 'optimization', 'indexes'],
    tips: 'Start with the execution plan — it shows where the bottleneck is.',
    mistakes: 'Adding indexes everywhere without considering write performance impact.',
    takeaways: 'Optimization starts with understanding the execution plan.',
    relatedIds: [64, 65, 85],
  },
  {
    id: 42,
    section: 5,
    sectionTitle: 'Scenario-Based SQL',
    category: 'SQL',
    question: 'How do you identify duplicate records in a table?',
    answer: 'Use GROUP BY on the key column(s) with HAVING COUNT(*) > 1, or use ROW_NUMBER() with PARTITION BY to flag duplicates.',
    difficulty: 'Intermediate',
    tags: ['sql', 'duplicates', 'data quality'],
    takeaways: 'Two approaches: GROUP BY + HAVING, or ROW_NUMBER() + PARTITION BY.',
    relatedIds: [31, 32],
  },
  {
    id: 43,
    section: 5,
    sectionTitle: 'Scenario-Based SQL',
    category: 'SQL',
    question: 'How do you find missing records between two tables?',
    answer: 'Use LEFT JOIN with a NULL check on the right table\'s key column.',
    sqlCode: `SELECT a.*
FROM TableA a
LEFT JOIN TableB b ON a.ID = b.ID
WHERE b.ID IS NULL;`,
    difficulty: 'Intermediate',
    tags: ['sql', 'left join', 'missing records', 'null'],
    tips: 'This is the "anti-join" pattern — very commonly asked.',
    takeaways: 'LEFT JOIN + WHERE right.key IS NULL = records in A not in B.',
    relatedIds: [12, 44],
  },
  {
    id: 44,
    section: 5,
    sectionTitle: 'Scenario-Based SQL',
    category: 'SQL',
    question: 'How do you retrieve customers who have never placed an order?',
    answer: 'Use LEFT JOIN from Customers to Orders and filter WHERE OrderID IS NULL.',
    sqlCode: `SELECT c.CustomerID, c.CustomerName
FROM Customers c
LEFT JOIN Orders o ON c.CustomerID = o.CustomerID
WHERE o.OrderID IS NULL;`,
    difficulty: 'Intermediate',
    tags: ['sql', 'left join', 'anti-join', 'customers'],
    tips: 'Alternative: use NOT EXISTS or NOT IN (but LEFT JOIN is usually clearest).',
    takeaways: 'Anti-join pattern: LEFT JOIN + IS NULL.',
    relatedIds: [43, 12, 74],
  },
  {
    id: 45,
    section: 5,
    sectionTitle: 'Scenario-Based SQL',
    category: 'SQL',
    question: 'How do you find the latest order for each customer?',
    answer: 'Use GROUP BY with MAX(OrderDate), or ROW_NUMBER() for full row details.',
    sqlCode: `-- Method 1: GROUP BY
SELECT CustomerID, MAX(OrderDate) AS LatestOrder
FROM Orders
GROUP BY CustomerID;

-- Method 2: ROW_NUMBER for full details
SELECT * FROM (
    SELECT *, ROW_NUMBER() OVER (PARTITION BY CustomerID ORDER BY OrderDate DESC) AS rn
    FROM Orders
) t WHERE rn = 1;`,
    difficulty: 'Intermediate',
    tags: ['sql', 'row_number', 'latest', 'partition by'],
    tips: 'ROW_NUMBER method gives you all columns, not just the date.',
    takeaways: 'ROW_NUMBER() + PARTITION BY = "latest per group" pattern.',
    relatedIds: [55, 58],
  },
  {
    id: 46,
    section: 5,
    sectionTitle: 'Scenario-Based SQL',
    category: 'SQL',
    question: 'How do you calculate running totals?',
    answer: 'Use SUM() as a window function with ORDER BY.',
    sqlCode: `SELECT OrderDate, Amount,
       SUM(Amount) OVER (ORDER BY OrderDate) AS RunningTotal
FROM Orders;`,
    difficulty: 'Advanced',
    tags: ['sql', 'window function', 'running total', 'sum over'],
    tips: 'SUM() OVER (ORDER BY ...) creates a cumulative sum — very powerful for reports.',
    takeaways: 'Window functions enable running calculations without self-joins.',
    relatedIds: [54, 55, 72],
  },
  {
    id: 47,
    section: 5,
    sectionTitle: 'Scenario-Based SQL',
    category: 'SQL',
    question: 'How do you rank employees by salary?',
    answer: 'Use RANK() window function.',
    sqlCode: `SELECT Name, Salary,
       RANK() OVER (ORDER BY Salary DESC) AS SalaryRank
FROM Employees;`,
    difficulty: 'Intermediate',
    tags: ['sql', 'rank', 'window function', 'salary'],
    tips: 'Choose between RANK, DENSE_RANK, and ROW_NUMBER based on how you want ties handled.',
    takeaways: 'RANK() = ranking with gaps for ties.',
    relatedIds: [55, 56, 57],
  },
  {
    id: 48,
    section: 5,
    sectionTitle: 'Scenario-Based SQL',
    category: 'SQL',
    question: 'How do you paginate SQL query results?',
    answer: 'Use OFFSET/FETCH (SQL Server) or LIMIT/OFFSET (MySQL).',
    sqlCode: `-- SQL Server:
SELECT * FROM Employees
ORDER BY EmpID
OFFSET 10 ROWS FETCH NEXT 10 ROWS ONLY;

-- MySQL:
-- SELECT * FROM Employees ORDER BY EmpID LIMIT 10 OFFSET 10;`,
    difficulty: 'Intermediate',
    tags: ['sql', 'pagination', 'offset', 'fetch', 'limit'],
    tips: 'Always use ORDER BY with pagination — without it, row order is undefined.',
    takeaways: 'OFFSET = skip rows. FETCH/LIMIT = take N rows.',
    relatedIds: [6, 36],
  },
  {
    id: 49,
    section: 5,
    sectionTitle: 'Scenario-Based SQL',
    category: 'SQL',
    question: 'How would you troubleshoot incorrect query results?',
    answer: 'Steps: re-check JOIN conditions for unintended row multiplication; verify WHERE/HAVING filter logic; check for NULL handling issues; test subqueries independently; check for duplicate rows in source tables; validate GROUP BY column grain matches expected result; compare against a small known sample manually.',
    difficulty: 'Advanced',
    tags: ['sql', 'debugging', 'troubleshooting'],
    tips: 'Break the query into parts and test each independently.',
    takeaways: 'Systematic debugging: JOINs → filters → NULLs → grain → sample check.',
    relatedIds: [50, 84],
  },
  {
    id: 50,
    section: 5,
    sectionTitle: 'Scenario-Based SQL',
    category: 'SQL',
    question: 'How do you validate SQL query output before sharing a report?',
    answer: 'Cross-check row counts and totals against the source system/raw data; spot-check a few records manually; verify aggregates (sums, counts) tie out; check for duplicates or missing data; confirm filters and date ranges are correct; peer review with a colleague when possible.',
    difficulty: 'Advanced',
    tags: ['sql', 'validation', 'reporting', 'data quality'],
    tips: 'Always run a sanity check before delivering results.',
    takeaways: 'Validation = counts + totals + spot-checks + peer review.',
    relatedIds: [49, 80],
  },
  {
    id: 51,
    section: 6,
    sectionTitle: 'Advanced SQL',
    category: 'SQL',
    question: 'What is a Subquery?',
    answer: 'A query nested inside another query (SELECT, INSERT, UPDATE, DELETE), used to return data that the outer query uses.',
    sqlCode: `SELECT Name FROM Employees
WHERE DeptID = (SELECT DeptID FROM Departments WHERE DeptName = 'Sales');`,
    difficulty: 'Intermediate',
    tags: ['sql', 'subquery', 'nested query'],
    tips: 'Subqueries can appear in WHERE, FROM, or SELECT clauses.',
    takeaways: 'Subquery = inner query that feeds data to the outer query.',
    relatedIds: [52, 53],
  },
  {
    id: 52,
    section: 6,
    sectionTitle: 'Advanced SQL',
    category: 'SQL',
    question: 'What is a Correlated Subquery?',
    answer: 'A subquery that references a column from the outer query, so it executes once for each row processed by the outer query.',
    sqlCode: `SELECT e1.Name, e1.Salary
FROM Employees e1
WHERE e1.Salary > (
    SELECT AVG(e2.Salary) FROM Employees e2 WHERE e2.DeptID = e1.DeptID
);`,
    difficulty: 'Advanced',
    tags: ['sql', 'correlated subquery', 'per-row'],
    tips: 'Correlated subqueries can be slow — consider JOINs or CTEs as alternatives.',
    mistakes: 'Not realizing it runs once per outer row — can be a performance issue.',
    takeaways: 'Correlated = references outer query. Executes per row.',
    relatedIds: [51, 53, 35],
  },
  {
    id: 53,
    section: 6,
    sectionTitle: 'Advanced SQL',
    category: 'SQL',
    question: 'What is a Common Table Expression (CTE)?',
    answer: 'A temporary, named result set defined using WITH, that can be referenced within a single SELECT/INSERT/UPDATE/DELETE statement. Improves readability and supports recursion.',
    sqlCode: `WITH DeptSalary AS (
    SELECT DeptID, AVG(Salary) AS AvgSal
    FROM Employees
    GROUP BY DeptID
)
SELECT * FROM DeptSalary WHERE AvgSal > 50000;`,
    difficulty: 'Intermediate',
    tags: ['sql', 'cte', 'with', 'temporary'],
    tips: 'CTEs make complex queries readable. They can also be recursive for hierarchies.',
    mistakes: 'Using a CTE when a simple subquery would suffice — keep it simple.',
    takeaways: 'CTE = named temporary result set for cleaner queries.',
    relatedIds: [51, 52, 32],
  },
  {
    id: 54,
    section: 6,
    sectionTitle: 'Advanced SQL',
    category: 'SQL',
    question: 'What are Window Functions?',
    answer: 'Functions that perform calculations across a set of rows related to the current row (defined by OVER()) without collapsing rows like GROUP BY does. Examples: ROW_NUMBER(), RANK(), DENSE_RANK(), SUM() OVER().',
    difficulty: 'Advanced',
    tags: ['sql', 'window functions', 'over', 'analytics'],
    tips: 'Window functions are the #1 advanced SQL topic in interviews.',
    takeaways: 'Window functions = aggregate-like calculations without collapsing rows.',
    relatedIds: [55, 56, 57, 58],
  },
  {
    id: 55,
    section: 6,
    sectionTitle: 'Advanced SQL',
    category: 'SQL',
    question: 'Explain ROW_NUMBER().',
    answer: 'Assigns a unique sequential number to each row within a partition, with no gaps and no ties (even for equal values).',
    sqlCode: `SELECT Name, Salary, ROW_NUMBER() OVER (ORDER BY Salary DESC) AS rn
FROM Employees;`,
    difficulty: 'Advanced',
    tags: ['sql', 'row_number', 'window function', 'ranking'],
    tips: 'ROW_NUMBER is perfect for deduplication and pagination.',
    takeaways: 'ROW_NUMBER = unique sequential numbers, no ties.',
    relatedIds: [56, 57, 59],
  },
  {
    id: 56,
    section: 6,
    sectionTitle: 'Advanced SQL',
    category: 'SQL',
    question: 'Explain RANK().',
    answer: 'Assigns a rank to each row within a partition; equal values get the same rank, and the next rank skips numbers (gaps).',
    sqlCode: `SELECT Name, Salary, RANK() OVER (ORDER BY Salary DESC) AS rnk
FROM Employees;`,
    difficulty: 'Advanced',
    tags: ['sql', 'rank', 'window function', 'ranking'],
    tips: 'RANK leaves gaps: 1, 2, 2, 4. Use DENSE_RANK if you don\'t want gaps.',
    takeaways: 'RANK = ranking with gaps after ties.',
    relatedIds: [55, 57, 60],
  },
  {
    id: 57,
    section: 6,
    sectionTitle: 'Advanced SQL',
    category: 'SQL',
    question: 'Explain DENSE_RANK().',
    answer: 'Like RANK(), but does NOT skip numbers after ties — ranks stay consecutive.',
    sqlCode: `SELECT Name, Salary, DENSE_RANK() OVER (ORDER BY Salary DESC) AS drnk
FROM Employees;`,
    difficulty: 'Advanced',
    tags: ['sql', 'dense_rank', 'window function', 'ranking'],
    tips: 'DENSE_RANK: 1, 2, 2, 3 (no gaps). Best for "Nth highest" problems.',
    takeaways: 'DENSE_RANK = consecutive ranking without gaps.',
    relatedIds: [55, 56, 60, 33],
  },
  {
    id: 58,
    section: 6,
    sectionTitle: 'Advanced SQL',
    category: 'SQL',
    question: 'What is PARTITION BY?',
    answer: 'Used inside a window function\'s OVER() clause to divide the result set into partitions (groups), so the window function is calculated separately within each partition.',
    sqlCode: `SELECT Name, DeptID, Salary,
       RANK() OVER (PARTITION BY DeptID ORDER BY Salary DESC) AS DeptRank
FROM Employees;`,
    difficulty: 'Advanced',
    tags: ['sql', 'partition by', 'window function'],
    tips: 'PARTITION BY is like GROUP BY for window functions — but doesn\'t collapse rows.',
    takeaways: 'PARTITION BY = group-level window calculations without collapsing.',
    relatedIds: [54, 55, 45],
  },
  {
    id: 59,
    section: 6,
    sectionTitle: 'Advanced SQL',
    category: 'SQL',
    question: 'Difference between ROW_NUMBER() and RANK().',
    answer: 'ROW_NUMBER() always gives unique, sequential numbers even for tied values. RANK() gives the same rank to tied values and then skips the next rank number(s).',
    difficulty: 'Advanced',
    tags: ['sql', 'row_number', 'rank', 'comparison'],
    tips: 'ROW_NUMBER: 1,2,3,4. RANK (with tie at 2): 1,2,2,4.',
    takeaways: 'ROW_NUMBER = always unique. RANK = ties get same number, then gaps.',
    relatedIds: [55, 56, 60],
  },
  {
    id: 60,
    section: 6,
    sectionTitle: 'Advanced SQL',
    category: 'SQL',
    question: 'Difference between RANK() and DENSE_RANK().',
    answer: 'RANK() leaves gaps in ranking after ties (e.g. 1,2,2,4). DENSE_RANK() does not leave gaps (e.g. 1,2,2,3).',
    difficulty: 'Advanced',
    tags: ['sql', 'rank', 'dense_rank', 'comparison'],
    tips: 'If the question asks "Nth highest", use DENSE_RANK to avoid skipping.',
    takeaways: 'RANK = gaps. DENSE_RANK = no gaps.',
    relatedIds: [56, 57, 59],
  },
  {
    id: 61,
    section: 7,
    sectionTitle: 'Database Concepts',
    category: 'SQL',
    question: 'What is Normalization?',
    answer: 'The process of organizing data to reduce redundancy and improve data integrity by dividing large tables into smaller related tables and defining relationships between them.',
    difficulty: 'Intermediate',
    tags: ['sql', 'normalization', 'database design'],
    tips: 'Know 1NF, 2NF, 3NF — be ready to explain with examples.',
    takeaways: 'Normalization = less redundancy, better integrity.',
    relatedIds: [62, 63],
  },
  {
    id: 62,
    section: 7,
    sectionTitle: 'Database Concepts',
    category: 'SQL',
    question: 'What are the Normal Forms?',
    answer: `1NF: Atomic values, no repeating groups.
2NF: 1NF + no partial dependency on part of a composite key.
3NF: 2NF + no transitive dependency (non-key columns depend only on the key).
BCNF: Stricter version of 3NF handling certain anomalies.
(4NF, 5NF exist but are rarely tested in interviews.)`,
    difficulty: 'Intermediate',
    tags: ['sql', 'normalization', 'normal forms', '1nf', '2nf', '3nf'],
    tips: 'Mnemonic: "The key (1NF), the whole key (2NF), and nothing but the key (3NF)."',
    takeaways: '1NF → atomic, 2NF → no partial deps, 3NF → no transitive deps.',
    relatedIds: [61, 63],
  },
  {
    id: 63,
    section: 7,
    sectionTitle: 'Database Concepts',
    category: 'SQL',
    question: 'What is Denormalization?',
    answer: 'The process of intentionally introducing redundancy into a database (combining tables) to improve read performance, often used in reporting and data warehouse systems.',
    difficulty: 'Intermediate',
    tags: ['sql', 'denormalization', 'data warehouse', 'performance'],
    tips: 'Denormalization trades write complexity for read speed.',
    takeaways: 'Denormalization = intentional redundancy for faster reads.',
    relatedIds: [61, 62],
  },
  {
    id: 64,
    section: 7,
    sectionTitle: 'Database Concepts',
    category: 'SQL',
    question: 'What is an Index?',
    answer: 'A database object that improves the speed of data retrieval on a table, at the cost of extra storage and slower writes, similar to an index in a book.',
    sqlCode: 'CREATE INDEX idx_emp_dept ON Employees(DeptID);',
    difficulty: 'Intermediate',
    tags: ['sql', 'index', 'performance', 'optimization'],
    tips: 'Index columns used in WHERE, JOIN, and ORDER BY. But don\'t over-index.',
    takeaways: 'Index = faster reads, slower writes, extra storage.',
    relatedIds: [65, 41],
  },
  {
    id: 65,
    section: 7,
    sectionTitle: 'Database Concepts',
    category: 'SQL',
    question: 'Clustered vs Non-Clustered Index.',
    answer: `Clustered Index: determines the physical storage order of table data; only one per table (usually the Primary Key).
Non-Clustered Index: a separate structure with pointers back to the actual data rows; a table can have many.`,
    difficulty: 'Advanced',
    tags: ['sql', 'index', 'clustered', 'non-clustered'],
    tips: 'Clustered = phonebook (data sorted by name). Non-clustered = book index (pointer to page).',
    takeaways: 'Clustered = 1 per table, physical order. Non-clustered = many, separate structure.',
    relatedIds: [64, 9],
  },
  {
    id: 66,
    section: 7,
    sectionTitle: 'Database Concepts',
    category: 'SQL',
    question: 'What is a View?',
    answer: 'A virtual table based on the result of a stored SQL query. It does not store data itself (in most cases) but simplifies complex queries and controls access to underlying data.',
    sqlCode: `CREATE VIEW HighEarners AS
SELECT Name, Salary FROM Employees WHERE Salary > 100000;`,
    difficulty: 'Intermediate',
    tags: ['sql', 'view', 'virtual table'],
    tips: 'Views simplify queries and can restrict data access for security.',
    takeaways: 'View = saved query that acts like a table.',
    relatedIds: [67, 68],
  },
  {
    id: 67,
    section: 7,
    sectionTitle: 'Database Concepts',
    category: 'SQL',
    question: 'What is a Stored Procedure?',
    answer: 'A precompiled, reusable set of SQL statements stored in the database, which can accept parameters and be executed with a single call.',
    sqlCode: `CREATE PROCEDURE GetEmployeesByDept @DeptID INT
AS
BEGIN
    SELECT * FROM Employees WHERE DeptID = @DeptID;
END;`,
    difficulty: 'Intermediate',
    tags: ['sql', 'stored procedure', 'reusability'],
    tips: 'Stored procedures improve performance (precompiled) and security.',
    takeaways: 'Stored Procedure = reusable, parameterized SQL block.',
    relatedIds: [66, 68],
  },
  {
    id: 68,
    section: 7,
    sectionTitle: 'Database Concepts',
    category: 'SQL',
    question: 'What is a Trigger?',
    answer: 'A special stored procedure that automatically executes in response to a specific event (INSERT, UPDATE, DELETE) on a table.',
    sqlCode: `CREATE TRIGGER trg_AuditSalaryChange
ON Employees
AFTER UPDATE
AS
BEGIN
    INSERT INTO SalaryAudit (EmpID, ChangedOn)
    SELECT EmpID, GETDATE() FROM inserted;
END;`,
    difficulty: 'Advanced',
    tags: ['sql', 'trigger', 'automation', 'audit'],
    tips: 'Use triggers sparingly — they add hidden logic that\'s hard to debug.',
    takeaways: 'Trigger = automatic SQL execution on data changes.',
    relatedIds: [67, 69],
  },
  {
    id: 69,
    section: 7,
    sectionTitle: 'Database Concepts',
    category: 'SQL',
    question: 'What is a Transaction?',
    answer: 'A logical unit of work consisting of one or more SQL statements that either all succeed (COMMIT) or all fail (ROLLBACK) together.',
    sqlCode: `BEGIN TRANSACTION;
    UPDATE Accounts SET Balance = Balance - 500 WHERE AccID = 1;
    UPDATE Accounts SET Balance = Balance + 500 WHERE AccID = 2;
COMMIT;`,
    difficulty: 'Intermediate',
    tags: ['sql', 'transaction', 'commit', 'rollback'],
    tips: 'Bank transfer is the classic transaction example.',
    takeaways: 'Transaction = all-or-nothing group of SQL statements.',
    relatedIds: [70, 68],
  },
  {
    id: 70,
    section: 7,
    sectionTitle: 'Database Concepts',
    category: 'SQL',
    question: 'Explain ACID properties.',
    answer: `Atomicity: All statements in a transaction succeed, or none do.
Consistency: Transaction brings the database from one valid state to another.
Isolation: Concurrent transactions don't interfere with each other.
Durability: Once committed, changes are permanently saved even after a crash.`,
    difficulty: 'Intermediate',
    tags: ['sql', 'acid', 'transaction', 'database'],
    tips: 'ACID = Atomicity, Consistency, Isolation, Durability. Have an example for each.',
    takeaways: 'ACID guarantees reliable database transactions.',
    relatedIds: [69],
  },
  {
    id: 71,
    section: 8,
    sectionTitle: 'Data Analyst SQL',
    category: 'SQL',
    question: 'Write a query to calculate month-over-month sales growth.',
    answer: 'Use a CTE for monthly sales, then LAG() to get previous month and calculate percentage growth.',
    sqlCode: `WITH MonthlySales AS (
    SELECT YEAR(OrderDate) AS Yr, MONTH(OrderDate) AS Mth, SUM(Amount) AS Sales
    FROM Orders
    GROUP BY YEAR(OrderDate), MONTH(OrderDate)
)
SELECT Yr, Mth, Sales,
       LAG(Sales) OVER (ORDER BY Yr, Mth) AS PrevMonthSales,
       (Sales - LAG(Sales) OVER (ORDER BY Yr, Mth)) * 100.0
            / LAG(Sales) OVER (ORDER BY Yr, Mth) AS MoM_Growth_Pct
FROM MonthlySales;`,
    difficulty: 'Advanced',
    tags: ['sql', 'lag', 'growth', 'mom', 'analytics'],
    tips: 'LAG() is the go-to for comparing current vs previous row in time series.',
    takeaways: 'CTE + LAG() = month-over-month comparison.',
    relatedIds: [72, 73, 46],
  },
  {
    id: 72,
    section: 8,
    sectionTitle: 'Data Analyst SQL',
    category: 'SQL',
    question: 'Calculate Year-to-Date (YTD) sales.',
    answer: 'Use SUM() OVER() partitioned by year, ordered by date.',
    sqlCode: `SELECT CustomerID, OrderDate, Amount,
       SUM(Amount) OVER (PARTITION BY YEAR(OrderDate) ORDER BY OrderDate) AS YTD_Sales
FROM Orders;`,
    difficulty: 'Advanced',
    tags: ['sql', 'ytd', 'running total', 'window function'],
    tips: 'PARTITION BY YEAR resets the running total each year.',
    takeaways: 'YTD = running SUM partitioned by year.',
    relatedIds: [46, 71],
  },
  {
    id: 73,
    section: 8,
    sectionTitle: 'Data Analyst SQL',
    category: 'SQL',
    question: 'Calculate Quarter-wise sales.',
    answer: 'Use DATEPART(QUARTER, ...) to extract quarter, group and sum.',
    sqlCode: `SELECT YEAR(OrderDate) AS Yr, DATEPART(QUARTER, OrderDate) AS Qtr, SUM(Amount) AS TotalSales
FROM Orders
GROUP BY YEAR(OrderDate), DATEPART(QUARTER, OrderDate);`,
    difficulty: 'Intermediate',
    tags: ['sql', 'quarter', 'sales', 'datepart'],
    takeaways: 'DATEPART(QUARTER, date) extracts the quarter number.',
    relatedIds: [39, 71],
  },
  {
    id: 74,
    section: 8,
    sectionTitle: 'Data Analyst SQL',
    category: 'SQL',
    question: 'Find inactive customers.',
    answer: 'Customers with no orders in the last 6 months — use HAVING with MAX(OrderDate).',
    sqlCode: `SELECT CustomerID, MAX(OrderDate) AS LastOrder
FROM Orders
GROUP BY CustomerID
HAVING MAX(OrderDate) < DATEADD(MONTH, -6, GETDATE());`,
    difficulty: 'Intermediate',
    tags: ['sql', 'inactive', 'customers', 'dateadd'],
    tips: 'Adjust the timeframe (3, 6, 12 months) based on business context.',
    takeaways: 'HAVING + date comparison = activity-based filtering.',
    relatedIds: [44, 75],
  },
  {
    id: 75,
    section: 8,
    sectionTitle: 'Data Analyst SQL',
    category: 'SQL',
    question: 'Find repeat customers.',
    answer: 'Customers with more than one order.',
    sqlCode: `SELECT CustomerID, COUNT(*) AS OrderCount
FROM Orders
GROUP BY CustomerID
HAVING COUNT(*) > 1;`,
    difficulty: 'Beginner',
    tags: ['sql', 'repeat', 'customers', 'loyalty'],
    takeaways: 'COUNT > 1 = repeat customer.',
    relatedIds: [40, 74, 76],
  },
  {
    id: 76,
    section: 8,
    sectionTitle: 'Data Analyst SQL',
    category: 'SQL',
    question: 'Calculate customer lifetime value.',
    answer: 'Sum all amounts per customer.',
    sqlCode: `SELECT CustomerID, SUM(Amount) AS LifetimeValue
FROM Orders
GROUP BY CustomerID
ORDER BY LifetimeValue DESC;`,
    difficulty: 'Intermediate',
    tags: ['sql', 'clv', 'lifetime value', 'customer'],
    takeaways: 'CLV = SUM(Amount) per customer.',
    relatedIds: [37, 75],
  },
  {
    id: 77,
    section: 8,
    sectionTitle: 'Data Analyst SQL',
    category: 'SQL',
    question: 'Find best-selling product category.',
    answer: 'Group by category, sum quantity, order descending.',
    sqlCode: `SELECT Category, SUM(Quantity) AS TotalUnitsSold
FROM Sales
GROUP BY Category
ORDER BY TotalUnitsSold DESC;`,
    difficulty: 'Beginner',
    tags: ['sql', 'sales', 'category', 'best-selling'],
    takeaways: 'GROUP BY + SUM + ORDER BY DESC = top performer.',
    relatedIds: [36, 78],
  },
  {
    id: 78,
    section: 8,
    sectionTitle: 'Data Analyst SQL',
    category: 'SQL',
    question: 'Find top-performing region.',
    answer: 'Group by region, sum revenue, order descending.',
    sqlCode: `SELECT Region, SUM(Amount) AS TotalRevenue
FROM Sales
GROUP BY Region
ORDER BY TotalRevenue DESC;`,
    difficulty: 'Beginner',
    tags: ['sql', 'region', 'performance', 'revenue'],
    takeaways: 'Simple aggregation for regional analysis.',
    relatedIds: [38, 77],
  },
  {
    id: 79,
    section: 8,
    sectionTitle: 'Data Analyst SQL',
    category: 'SQL',
    question: 'Find average order value.',
    answer: 'Use AVG() on order amounts.',
    sqlCode: `-- Overall:
SELECT AVG(Amount) AS AvgOrderValue FROM Orders;

-- Per customer:
SELECT CustomerID, AVG(Amount) AS AvgOrderValue
FROM Orders
GROUP BY CustomerID;`,
    difficulty: 'Beginner',
    tags: ['sql', 'avg', 'order value'],
    takeaways: 'AVG(Amount) = average order value.',
    relatedIds: [23, 80],
  },
  {
    id: 80,
    section: 8,
    sectionTitle: 'Data Analyst SQL',
    category: 'SQL',
    question: 'Create a KPI report using SQL.',
    answer: 'Combine multiple aggregates in a single SELECT for a KPI dashboard.',
    sqlCode: `SELECT
    COUNT(DISTINCT CustomerID) AS TotalCustomers,
    COUNT(*) AS TotalOrders,
    SUM(Amount) AS TotalRevenue,
    AVG(Amount) AS AvgOrderValue,
    MAX(OrderDate) AS LastOrderDate
FROM Orders;`,
    difficulty: 'Intermediate',
    tags: ['sql', 'kpi', 'report', 'dashboard'],
    tips: 'This is a common real-world task — summarizing business KPIs in one query.',
    takeaways: 'Multiple aggregates in one SELECT = KPI summary.',
    relatedIds: [79, 50],
  },
  {
    id: 81,
    section: 9,
    sectionTitle: 'Interview Closing Questions',
    category: 'Behavioral',
    question: 'Which SQL functions do you use most?',
    answer: '"I frequently use aggregate functions (SUM, COUNT, AVG), JOINs (especially LEFT and INNER), GROUP BY/HAVING for reporting, and window functions like ROW_NUMBER() and RANK() for ranking and deduplication tasks."',
    difficulty: 'Beginner',
    tags: ['behavioral', 'sql', 'experience'],
    tips: 'Tailor to your actual experience. Mention specific projects.',
    takeaways: 'Show breadth and depth of SQL knowledge.',
    relatedIds: [82, 83],
  },
  {
    id: 82,
    section: 9,
    sectionTitle: 'Interview Closing Questions',
    category: 'Behavioral',
    question: 'Which JOIN do you use most and why?',
    answer: '"INNER JOIN and LEFT JOIN, most often. INNER JOIN when I only need matching records across tables, and LEFT JOIN when I need to retain all records from the primary table — for example finding customers with no orders."',
    difficulty: 'Beginner',
    tags: ['behavioral', 'sql', 'joins'],
    tips: 'Give a concrete example from your work.',
    takeaways: 'Demonstrate practical understanding, not just theory.',
    relatedIds: [81, 11, 12],
  },
  {
    id: 83,
    section: 9,
    sectionTitle: 'Interview Closing Questions',
    category: 'Behavioral',
    question: 'Which SQL project are you most proud of?',
    answer: 'Tailor this to your experience: e.g. writing 50+ SQL scripts to clean and validate 10,000+ records, identifying 500+ data quality issues, and building queries that fed into Tableau dashboards.',
    difficulty: 'Beginner',
    tags: ['behavioral', 'project', 'experience'],
    tips: 'Use the STAR method: Situation, Task, Action, Result.',
    takeaways: 'Quantify your impact with numbers.',
    relatedIds: [86, 84],
  },
  {
    id: 84,
    section: 9,
    sectionTitle: 'Interview Closing Questions',
    category: 'Behavioral',
    question: 'How do you debug SQL queries?',
    answer: '"I break complex queries into smaller parts and test subqueries independently, check intermediate results with SELECT statements, verify JOIN conditions for row duplication, and use EXPLAIN/execution plans to understand performance issues."',
    difficulty: 'Beginner',
    tags: ['behavioral', 'debugging', 'sql'],
    tips: 'Mention execution plans — it shows you think about performance.',
    takeaways: 'Systematic debugging approach: break down, test parts, check plans.',
    relatedIds: [49, 85],
  },
  {
    id: 85,
    section: 9,
    sectionTitle: 'Interview Closing Questions',
    category: 'Behavioral',
    question: 'How do you improve query performance?',
    answer: '"By indexing key columns used in JOIN/WHERE clauses, avoiding SELECT *, minimizing nested subqueries in favor of JOINs or CTEs, and reviewing execution plans to spot table scans."',
    difficulty: 'Beginner',
    tags: ['behavioral', 'performance', 'optimization'],
    tips: 'Real examples of before/after query times are very impressive.',
    takeaways: 'Indexes, SELECT specific columns, CTEs over subqueries, execution plans.',
    relatedIds: [41, 64],
  },
  {
    id: 86,
    section: 9,
    sectionTitle: 'Interview Closing Questions',
    category: 'Behavioral',
    question: 'Explain your SQL project.',
    answer: 'Tailor to a specific project — describe the business problem, the tables/data involved, the SQL techniques used, and the outcome/impact.',
    difficulty: 'Beginner',
    tags: ['behavioral', 'project', 'presentation'],
    tips: 'Structure: Problem → Approach → SQL Techniques → Result/Impact.',
    takeaways: 'Tell a story with measurable outcomes.',
    relatedIds: [83, 87],
  },
  {
    id: 87,
    section: 9,
    sectionTitle: 'Interview Closing Questions',
    category: 'Behavioral',
    question: 'Which SQL database have you used?',
    answer: 'Tailor to your experience — e.g. MySQL, SQL Server, or the D365 F&O underlying SQL Server database.',
    difficulty: 'Beginner',
    tags: ['behavioral', 'database', 'experience'],
    tips: 'Mention specific features you\'ve used in each database.',
    takeaways: 'Show familiarity with at least one major RDBMS.',
    relatedIds: [88],
  },
  {
    id: 88,
    section: 9,
    sectionTitle: 'Interview Closing Questions',
    category: 'Behavioral',
    question: 'Difference between MySQL and SQL Server.',
    answer: `MySQL is open-source, widely used for web applications, uses LIMIT for pagination, and AUTO_INCREMENT for identity columns.
SQL Server is a Microsoft product, commonly used in enterprise/Windows environments, uses TOP for row limiting and IDENTITY for auto-increment, and has tighter integration with tools like SSIS, SSRS, and Power BI.`,
    difficulty: 'Beginner',
    tags: ['behavioral', 'mysql', 'sql server', 'comparison'],
    takeaways: 'MySQL = open-source/web. SQL Server = enterprise/Microsoft ecosystem.',
    relatedIds: [87],
  },
  {
    id: 89,
    section: 9,
    sectionTitle: 'Interview Closing Questions',
    category: 'Behavioral',
    question: 'What challenges have you faced while writing SQL queries?',
    answer: '"Handling NULL values correctly in aggregations and JOINs, optimizing queries on large datasets that were initially slow, and writing correlated subqueries for row-by-row comparisons like above-average salary checks."',
    difficulty: 'Beginner',
    tags: ['behavioral', 'challenges', 'sql'],
    tips: 'Always frame challenges positively — what you learned from them.',
    takeaways: 'Show growth: challenge → learning → solution.',
    relatedIds: [84, 90],
  },
  {
    id: 90,
    section: 9,
    sectionTitle: 'Interview Closing Questions',
    category: 'Behavioral',
    question: 'Why do you like working with SQL?',
    answer: '"SQL gives a direct, precise way to explore and shape data — it\'s the foundation for reporting, dashboards, and data quality work, and understanding it well makes every other data tool (Tableau, Python/pandas, Power BI) easier to use effectively."',
    difficulty: 'Beginner',
    tags: ['behavioral', 'motivation', 'sql'],
    tips: 'Be genuine. Connect SQL to your career goals.',
    takeaways: 'SQL is foundational — it makes all other data tools easier.',
    relatedIds: [81],
  },
  {
    id: 91,
    section: 10,
    sectionTitle: 'Excel for Data Analysts',
    category: 'Excel',
    question: 'What is the difference between VLOOKUP and INDEX-MATCH?',
    answer: 'VLOOKUP searches a value in the leftmost column of a range and returns a value from a column to its right; it can only look left-to-right and breaks if columns are inserted/moved. INDEX-MATCH combines INDEX (returns a value at a row/column position) with MATCH (finds the position of a value) and can look in any direction, is more flexible, and is less prone to breaking when columns shift.',
    difficulty: 'Intermediate',
    tags: ['excel', 'vlookup', 'index-match', 'lookup'],
    tips: 'INDEX-MATCH is more robust — always prefer it over VLOOKUP.',
    mistakes: 'Using VLOOKUP with approximate match (default) instead of exact match (FALSE/0).',
    takeaways: 'VLOOKUP = simple, left-to-right only. INDEX-MATCH = flexible, any direction.',
    relatedIds: [92],
  },
  {
    id: 92,
    section: 10,
    sectionTitle: 'Excel for Data Analysts',
    category: 'Excel',
    question: 'What is the difference between VLOOKUP and XLOOKUP?',
    answer: 'XLOOKUP (newer function) can search in any direction (left or right), has a built-in "not found" argument, defaults to exact match (safer than VLOOKUP\'s default approximate match), and can return multiple columns/arrays at once.',
    difficulty: 'Intermediate',
    tags: ['excel', 'vlookup', 'xlookup', 'lookup'],
    tips: 'XLOOKUP is the modern replacement for VLOOKUP — mention it to show you\'re current.',
    takeaways: 'XLOOKUP = modern, bidirectional, safer defaults, multi-column return.',
    relatedIds: [91],
  },
  {
    id: 93,
    section: 10,
    sectionTitle: 'Excel for Data Analysts',
    category: 'Excel',
    question: 'What are Pivot Tables used for?',
    answer: 'Pivot Tables summarize, group, and aggregate large datasets interactively — e.g. total sales by region and month — without writing formulas, and support drag-and-drop fields, filters, and calculated fields.',
    difficulty: 'Beginner',
    tags: ['excel', 'pivot table', 'summarization'],
    tips: 'Pivot Tables are one of the most powerful Excel features for data analysis.',
    takeaways: 'Pivot Tables = drag-and-drop data summarization.',
    relatedIds: [104],
  },
  {
    id: 94,
    section: 10,
    sectionTitle: 'Excel for Data Analysts',
    category: 'Excel',
    question: 'What is the difference between COUNT, COUNTA, COUNTIF, and COUNTIFS?',
    answer: 'COUNT counts numeric cells only. COUNTA counts all non-empty cells (numbers, text, dates). COUNTIF counts cells matching one condition. COUNTIFS counts cells matching multiple conditions across one or more ranges.',
    difficulty: 'Beginner',
    tags: ['excel', 'count', 'counta', 'countif', 'countifs'],
    tips: 'Remember: COUNT = numbers, COUNTA = anything non-empty, COUNTIF(S) = conditional.',
    takeaways: 'Four levels of counting: numeric → non-empty → single condition → multiple conditions.',
    relatedIds: [95],
  },
  {
    id: 95,
    section: 10,
    sectionTitle: 'Excel for Data Analysts',
    category: 'Excel',
    question: 'What is the difference between SUMIF and SUMIFS?',
    answer: 'SUMIF sums values based on a single condition. SUMIFS sums values based on multiple conditions (each with its own range).',
    difficulty: 'Beginner',
    tags: ['excel', 'sumif', 'sumifs', 'conditional sum'],
    tips: 'Note: SUMIFS syntax puts the sum_range FIRST, unlike SUMIF.',
    takeaways: 'SUMIF = one condition. SUMIFS = multiple conditions.',
    relatedIds: [94],
  },
  {
    id: 96,
    section: 10,
    sectionTitle: 'Excel for Data Analysts',
    category: 'Excel',
    question: 'What are absolute vs relative cell references?',
    answer: 'A relative reference (A1) changes when copied to another cell. An absolute reference ($A$1) stays fixed. A mixed reference ($A1 or A$1) locks only the column or only the row.',
    difficulty: 'Beginner',
    tags: ['excel', 'cell reference', 'absolute', 'relative'],
    tips: 'Press F4 to toggle between reference types while editing a formula.',
    takeaways: '$ locks a dimension. $A$1 = fully locked. A1 = fully relative.',
    relatedIds: [97],
  },
  {
    id: 97,
    section: 10,
    sectionTitle: 'Excel for Data Analysts',
    category: 'Excel',
    question: 'What is conditional formatting?',
    answer: 'A feature that automatically changes a cell\'s appearance (color, icon, data bar) based on rules or values, making it easy to visually spot trends, outliers, or issues in data.',
    difficulty: 'Beginner',
    tags: ['excel', 'conditional formatting', 'visualization'],
    takeaways: 'Conditional formatting = visual rules for cells.',
    relatedIds: [98],
  },
  {
    id: 98,
    section: 10,
    sectionTitle: 'Excel for Data Analysts',
    category: 'Excel',
    question: 'What is data validation in Excel?',
    answer: 'A feature that restricts what can be entered into a cell (e.g. dropdown lists, number ranges, date ranges), helping maintain data quality at the point of entry.',
    difficulty: 'Beginner',
    tags: ['excel', 'data validation', 'data quality'],
    takeaways: 'Data validation = input restrictions for quality control.',
    relatedIds: [97, 100],
  },
  {
    id: 99,
    section: 10,
    sectionTitle: 'Excel for Data Analysts',
    category: 'Excel',
    question: 'What is the difference between IFERROR and IF?',
    answer: 'IF evaluates a logical condition and returns one value if TRUE and another if FALSE. IFERROR specifically checks whether a formula produces an error (like #N/A, #DIV/0!) and returns an alternate value if so, otherwise returns the formula\'s normal result.',
    difficulty: 'Beginner',
    tags: ['excel', 'if', 'iferror', 'error handling'],
    takeaways: 'IF = condition check. IFERROR = error handling wrapper.',
    relatedIds: [94],
  },
  {
    id: 100,
    section: 10,
    sectionTitle: 'Excel for Data Analysts',
    category: 'Excel',
    question: 'How do you remove duplicates in Excel?',
    answer: 'Select the data range, go to Data tab → Remove Duplicates, choose the columns to check, and Excel deletes rows that are exact duplicates based on those columns.',
    difficulty: 'Beginner',
    tags: ['excel', 'duplicates', 'data cleaning'],
    takeaways: 'Data tab → Remove Duplicates. Simple but powerful.',
    relatedIds: [98, 101],
  },
  {
    id: 101,
    section: 10,
    sectionTitle: 'Excel for Data Analysts',
    category: 'Excel',
    question: 'What are Excel array formulas / dynamic arrays (e.g. FILTER, UNIQUE)?',
    answer: 'Array formulas operate on multiple values at once. Modern dynamic array functions like FILTER() extract rows matching a condition, UNIQUE() returns distinct values, and SORT() sorts an array — all "spilling" results across multiple cells automatically.',
    difficulty: 'Intermediate',
    tags: ['excel', 'array formulas', 'dynamic arrays', 'filter', 'unique'],
    tips: 'Dynamic arrays (FILTER, UNIQUE, SORT) are game-changers in modern Excel.',
    takeaways: 'Dynamic arrays = multi-cell output from a single formula.',
    relatedIds: [100, 102],
  },
  {
    id: 102,
    section: 10,
    sectionTitle: 'Excel for Data Analysts',
    category: 'Excel',
    question: 'What is Power Query used for?',
    answer: 'Power Query is Excel\'s data connection and transformation tool — used to import, clean, reshape (pivot/unpivot, merge, append), and automate repeatable data prep steps before loading data into a worksheet or the data model.',
    difficulty: 'Intermediate',
    tags: ['excel', 'power query', 'etl', 'data transformation'],
    tips: 'Power Query is essentially ETL built into Excel.',
    takeaways: 'Power Query = import, clean, transform, automate data prep.',
    relatedIds: [103],
  },
  {
    id: 103,
    section: 10,
    sectionTitle: 'Excel for Data Analysts',
    category: 'Excel',
    question: 'How do you handle blank/missing values in Excel?',
    answer: 'Options include: use ISBLANK() to detect blanks; use IFERROR/IF to substitute defaults; use Go To Special > Blanks to select and fill them; or use Power Query to fill down/replace nulls, depending on whether the blank should be treated as zero, excluded, or imputed.',
    difficulty: 'Intermediate',
    tags: ['excel', 'missing values', 'blanks', 'data cleaning'],
    takeaways: 'Multiple strategies: detect, fill, substitute, or Power Query.',
    relatedIds: [99, 102],
  },
  {
    id: 104,
    section: 10,
    sectionTitle: 'Excel for Data Analysts',
    category: 'Excel',
    question: 'What is the difference between a Chart and a Pivot Chart?',
    answer: 'A regular chart is based on static or a fixed data range. A Pivot Chart is linked to a Pivot Table and updates dynamically as the underlying Pivot Table\'s filters, fields, or data change.',
    difficulty: 'Beginner',
    tags: ['excel', 'chart', 'pivot chart', 'visualization'],
    takeaways: 'Chart = static range. Pivot Chart = dynamic, linked to Pivot Table.',
    relatedIds: [93],
  },
  {
    id: 105,
    section: 10,
    sectionTitle: 'Excel for Data Analysts',
    category: 'Excel',
    question: 'What is the use of the CONCATENATE / TEXTJOIN function?',
    answer: 'CONCATENATE (or the & operator, or newer CONCAT) joins multiple text strings into one. TEXTJOIN does the same but lets you specify a delimiter and optionally ignore blank cells, useful for combining a range of cells efficiently.',
    difficulty: 'Beginner',
    tags: ['excel', 'concatenate', 'textjoin', 'text functions'],
    takeaways: 'CONCATENATE = join text. TEXTJOIN = join with delimiter + ignore blanks.',
    relatedIds: [94],
  },
  {
    id: 106,
    section: 11,
    sectionTitle: 'Tableau / Data Visualization',
    category: 'Tableau',
    question: 'What is the difference between a Dimension and a Measure in Tableau?',
    answer: 'Dimensions are typically qualitative/categorical fields (Region, Product, Name) used to slice and group data. Measures are typically quantitative/numeric fields (Sales, Profit) that can be aggregated (SUM, AVG, COUNT).',
    difficulty: 'Beginner',
    tags: ['tableau', 'dimension', 'measure', 'basics'],
    tips: 'Dimensions = categories (blue). Measures = numbers (green).',
    takeaways: 'Dimension = qualitative grouping. Measure = quantitative aggregation.',
    relatedIds: [111],
  },
  {
    id: 107,
    section: 11,
    sectionTitle: 'Tableau / Data Visualization',
    category: 'Tableau',
    question: 'What is the difference between a Blend and a Join in Tableau?',
    answer: 'A Join combines rows from two tables at the data source level (row-level, before aggregation) based on a common field. A Blend combines data from two separate data sources at the aggregate level (after each source is queried independently), used when data can\'t be joined directly (e.g. different databases).',
    difficulty: 'Intermediate',
    tags: ['tableau', 'blend', 'join', 'data sources'],
    tips: 'Join = same data source. Blend = different data sources.',
    takeaways: 'Join = row-level combination. Blend = aggregate-level combination.',
    relatedIds: [108],
  },
  {
    id: 108,
    section: 11,
    sectionTitle: 'Tableau / Data Visualization',
    category: 'Tableau',
    question: 'What are Tableau Extracts vs Live connections?',
    answer: 'A Live connection queries the underlying database directly in real time. An Extract is a compressed snapshot (.hyper file) of the data pulled into Tableau\'s fast in-memory engine — faster performance, works offline, but data is only as current as the last refresh.',
    difficulty: 'Intermediate',
    tags: ['tableau', 'extract', 'live', 'connection'],
    tips: 'Use Extracts for performance; Live for real-time needs.',
    takeaways: 'Live = real-time, slower. Extract = snapshot, faster.',
    relatedIds: [107, 117],
  },
  {
    id: 109,
    section: 11,
    sectionTitle: 'Tableau / Data Visualization',
    category: 'Tableau',
    question: 'What is a Calculated Field in Tableau?',
    answer: 'A custom field created using a formula (referencing existing fields, functions, or parameters) to derive new metrics not present in the raw data, e.g. Profit Ratio = SUM(Profit)/SUM(Sales).',
    difficulty: 'Intermediate',
    tags: ['tableau', 'calculated field', 'formula'],
    takeaways: 'Calculated Field = custom metric derived from existing data.',
    relatedIds: [110, 116],
  },
  {
    id: 110,
    section: 11,
    sectionTitle: 'Tableau / Data Visualization',
    category: 'Tableau',
    question: 'What are Table Calculations in Tableau?',
    answer: 'Calculations applied to the values already in a visualization (post-aggregation) such as running totals, percent of total, difference, or rank — computed based on the structure of the table/view rather than the raw data source.',
    difficulty: 'Advanced',
    tags: ['tableau', 'table calculations', 'post-aggregation'],
    tips: 'Table calcs run AFTER the query — they work on the viz, not the data source.',
    takeaways: 'Table Calculations = post-aggregation computations on the viz.',
    relatedIds: [109, 116],
  },
  {
    id: 111,
    section: 11,
    sectionTitle: 'Tableau / Data Visualization',
    category: 'Tableau',
    question: 'What is the difference between Discrete and Continuous fields in Tableau?',
    answer: 'Discrete (blue) fields create separate, distinct headers/categories (e.g. individual dates as labels). Continuous (green) fields create a continuous axis/range (e.g. a trend line over time).',
    difficulty: 'Intermediate',
    tags: ['tableau', 'discrete', 'continuous'],
    tips: 'Blue = discrete = individual labels. Green = continuous = axis range.',
    takeaways: 'Discrete = categories. Continuous = axis.',
    relatedIds: [106],
  },
  {
    id: 112,
    section: 11,
    sectionTitle: 'Tableau / Data Visualization',
    category: 'Tableau',
    question: 'What are Filters vs Parameters in Tableau?',
    answer: 'Filters restrict which data rows are included in a view and can be dimension-, measure-, or context-based. Parameters are dynamic, user-controlled input values (numbers, strings, dates) that can drive calculated fields, titles, or filter logic across a dashboard.',
    difficulty: 'Intermediate',
    tags: ['tableau', 'filters', 'parameters'],
    tips: 'Filters = restrict data. Parameters = user inputs that drive logic.',
    takeaways: 'Filters exclude data. Parameters provide dynamic user input.',
    relatedIds: [113],
  },
  {
    id: 113,
    section: 11,
    sectionTitle: 'Tableau / Data Visualization',
    category: 'Tableau',
    question: 'What is a Dashboard Action in Tableau?',
    answer: 'An interactive behavior (Filter, Highlight, or URL action) that lets users click or hover on one visualization to affect another sheet or dashboard, enabling drill-down and cross-filtering experiences.',
    difficulty: 'Intermediate',
    tags: ['tableau', 'dashboard', 'actions', 'interactivity'],
    takeaways: 'Dashboard Actions = click/hover interactivity across sheets.',
    relatedIds: [112],
  },
  {
    id: 114,
    section: 11,
    sectionTitle: 'Tableau / Data Visualization',
    category: 'Tableau',
    question: 'What is the difference between a bar chart and a histogram?',
    answer: 'A bar chart compares discrete categories against a measure. A histogram groups continuous numeric data into bins/ranges to show the distribution/frequency of values.',
    difficulty: 'Beginner',
    tags: ['tableau', 'bar chart', 'histogram', 'visualization'],
    takeaways: 'Bar chart = categories. Histogram = distribution of continuous data.',
    relatedIds: [115, 118],
  },
  {
    id: 115,
    section: 11,
    sectionTitle: 'Tableau / Data Visualization',
    category: 'Tableau',
    question: 'When would you use a heat map vs a treemap?',
    answer: 'A heat map is useful for showing intensity/values across two categorical dimensions using color. A treemap is useful for showing hierarchical, part-to-whole relationships using nested, sized rectangles (size = one measure, color = another).',
    difficulty: 'Intermediate',
    tags: ['tableau', 'heat map', 'treemap', 'visualization'],
    takeaways: 'Heat map = intensity grid. Treemap = hierarchical part-to-whole.',
    relatedIds: [114, 119],
  },
  {
    id: 116,
    section: 11,
    sectionTitle: 'Tableau / Data Visualization',
    category: 'Tableau',
    question: 'What is Level of Detail (LOD) expression in Tableau?',
    answer: 'LOD expressions (FIXED, INCLUDE, EXCLUDE) let you compute aggregations at a different level of granularity than the view itself, independent of the dimensions currently on the sheet — e.g. average sales per customer, shown alongside order-level detail.',
    difficulty: 'Advanced',
    tags: ['tableau', 'lod', 'fixed', 'include', 'exclude'],
    tips: 'LOD is one of the most powerful and most-asked Tableau features.',
    takeaways: 'LOD = compute at a different grain than the current view.',
    relatedIds: [109, 110],
  },
  {
    id: 117,
    section: 11,
    sectionTitle: 'Tableau / Data Visualization',
    category: 'Tableau',
    question: 'How do you handle a dashboard with a large dataset that loads slowly?',
    answer: 'Use an Extract instead of a live connection, filter data at the source, hide unused fields, aggregate visible data where possible, reduce the number of marks/quick filters, and avoid overly complex calculated/table calculations on the fly.',
    difficulty: 'Advanced',
    tags: ['tableau', 'performance', 'optimization', 'dashboard'],
    tips: 'Extract first. Filter early. Simplify calcs.',
    takeaways: 'Extract → filter → aggregate → simplify = faster dashboard.',
    relatedIds: [108],
  },
  {
    id: 118,
    section: 11,
    sectionTitle: 'Tableau / Data Visualization',
    category: 'Tableau',
    question: 'What chart would you use to show sales trend over time?',
    answer: 'A line chart, since it clearly shows continuous change and trend direction across a time-based (continuous) axis.',
    difficulty: 'Beginner',
    tags: ['tableau', 'line chart', 'trend', 'time series'],
    takeaways: 'Line chart = best for time-series trends.',
    relatedIds: [114, 119],
  },
  {
    id: 119,
    section: 11,
    sectionTitle: 'Tableau / Data Visualization',
    category: 'Tableau',
    question: 'What chart would you use to compare parts of a whole?',
    answer: 'A pie chart (for few categories) or, more often preferred by analysts, a stacked bar chart or treemap, since bars are generally easier to read accurately than pie slices, especially with more than a few categories.',
    difficulty: 'Beginner',
    tags: ['tableau', 'pie chart', 'stacked bar', 'part-to-whole'],
    takeaways: 'Stacked bar > pie chart for accuracy. Treemap for hierarchy.',
    relatedIds: [114, 115],
  },
  {
    id: 120,
    section: 11,
    sectionTitle: 'Tableau / Data Visualization',
    category: 'Tableau',
    question: 'What is the difference between Tableau Desktop and Tableau Public?',
    answer: 'Tableau Desktop is the full paid authoring tool that can connect to private/local data sources and save workbooks locally or to Tableau Server/Online. Tableau Public is a free version where workbooks and data are published publicly on Tableau\'s public cloud — no private data or local-only saving.',
    difficulty: 'Beginner',
    tags: ['tableau', 'desktop', 'public', 'licensing'],
    takeaways: 'Desktop = paid, private. Public = free, public.',
    relatedIds: [108],
  },
  {
    id: 121,
    section: 12,
    sectionTitle: 'Statistics & Probability',
    category: 'Statistics',
    question: 'What is the difference between Mean, Median, and Mode?',
    answer: 'Mean is the average of all values. Median is the middle value when data is sorted. Mode is the most frequently occurring value. Median is more robust to outliers than mean.',
    difficulty: 'Beginner',
    tags: ['statistics', 'mean', 'median', 'mode', 'central tendency'],
    tips: 'For skewed data, median is usually more representative than mean.',
    takeaways: 'Mean = average. Median = middle. Mode = most frequent.',
    relatedIds: [122, 129],
  },
  {
    id: 122,
    section: 12,
    sectionTitle: 'Statistics & Probability',
    category: 'Statistics',
    question: 'What is Standard Deviation and Variance?',
    answer: 'Variance measures the average squared distance of data points from the mean (spread of data). Standard Deviation is the square root of variance, expressed in the same units as the original data, making it easier to interpret.',
    difficulty: 'Intermediate',
    tags: ['statistics', 'standard deviation', 'variance', 'spread'],
    tips: 'Std dev is more intuitive because it\'s in the same units as the data.',
    takeaways: 'Variance = spread². Std Dev = √Variance = spread in original units.',
    relatedIds: [121, 127],
  },
  {
    id: 123,
    section: 12,
    sectionTitle: 'Statistics & Probability',
    category: 'Statistics',
    question: 'What is the difference between Population and Sample statistics?',
    answer: 'Population statistics describe an entire group of interest (every member). Sample statistics are calculated from a subset of the population and used to estimate/infer population parameters; sample variance/std dev typically divide by (n-1) instead of n (Bessel\'s correction) to reduce bias.',
    difficulty: 'Intermediate',
    tags: ['statistics', 'population', 'sample', 'inference'],
    takeaways: 'Population = all. Sample = subset. Sample uses n-1 (Bessel\'s correction).',
    relatedIds: [130, 135],
  },
  {
    id: 124,
    section: 12,
    sectionTitle: 'Statistics & Probability',
    category: 'Statistics',
    question: 'What is Correlation vs Causation?',
    answer: 'Correlation means two variables move together (statistical association), measured e.g. by a correlation coefficient. Causation means one variable directly causes a change in another. Correlation does NOT imply causation — a third variable or coincidence could explain an observed relationship.',
    difficulty: 'Intermediate',
    tags: ['statistics', 'correlation', 'causation'],
    tips: '"Correlation does not imply causation" — the most important stats principle.',
    takeaways: 'Correlation = association. Causation = direct effect. They\'re different.',
    relatedIds: [132],
  },
  {
    id: 125,
    section: 12,
    sectionTitle: 'Statistics & Probability',
    category: 'Statistics',
    question: 'What is a p-value?',
    answer: 'The probability of observing results at least as extreme as those measured, assuming the null hypothesis is true. A small p-value (commonly < 0.05) suggests the observed effect is unlikely to be due to chance alone, leading to rejection of the null hypothesis.',
    difficulty: 'Intermediate',
    tags: ['statistics', 'p-value', 'hypothesis testing', 'significance'],
    tips: 'p < 0.05 = "statistically significant" (by convention).',
    takeaways: 'p-value = probability of data given H0 is true. Small p → reject H0.',
    relatedIds: [126, 128],
  },
  {
    id: 126,
    section: 12,
    sectionTitle: 'Statistics & Probability',
    category: 'Statistics',
    question: 'What is a Null Hypothesis vs Alternative Hypothesis?',
    answer: 'The Null Hypothesis (H0) assumes no effect or no difference exists. The Alternative Hypothesis (H1) proposes that an effect or difference does exist. Statistical tests assess whether there\'s enough evidence to reject H0 in favor of H1.',
    difficulty: 'Intermediate',
    tags: ['statistics', 'hypothesis', 'null', 'alternative'],
    takeaways: 'H0 = no effect. H1 = effect exists. Tests try to reject H0.',
    relatedIds: [125, 128, 134],
  },
  {
    id: 127,
    section: 12,
    sectionTitle: 'Statistics & Probability',
    category: 'Statistics',
    question: 'What is an Outlier, and how do you detect one?',
    answer: 'An outlier is a data point that differs significantly from other observations. Common detection methods: IQR method (values beyond Q1 - 1.5*IQR or Q3 + 1.5*IQR), Z-score (values beyond ~±3 standard deviations from the mean), or visual methods like box plots/scatter plots.',
    difficulty: 'Intermediate',
    tags: ['statistics', 'outlier', 'iqr', 'z-score', 'detection'],
    tips: 'Always investigate outliers before removing them — they might be real.',
    takeaways: 'Detect with IQR (1.5×) or Z-score (±3σ). Investigate before removing.',
    relatedIds: [122, 155],
  },
  {
    id: 128,
    section: 12,
    sectionTitle: 'Statistics & Probability',
    category: 'Statistics',
    question: 'What is the difference between Type I and Type II error?',
    answer: 'Type I error (false positive) is rejecting a true null hypothesis. Type II error (false negative) is failing to reject a false null hypothesis.',
    difficulty: 'Intermediate',
    tags: ['statistics', 'type i', 'type ii', 'error', 'hypothesis'],
    tips: 'Type I = false alarm. Type II = missed detection.',
    takeaways: 'Type I = reject true H0. Type II = accept false H0.',
    relatedIds: [125, 126],
  },
  {
    id: 129,
    section: 12,
    sectionTitle: 'Statistics & Probability',
    category: 'Statistics',
    question: 'What is a Normal Distribution?',
    answer: 'A symmetric, bell-shaped probability distribution where most values cluster around the mean, with mean, median, and mode all equal, and defined spread rules (~68% of data within 1 std dev, ~95% within 2).',
    difficulty: 'Intermediate',
    tags: ['statistics', 'normal distribution', 'bell curve', 'gaussian'],
    tips: 'The 68-95-99.7 rule is a great way to explain normal distribution.',
    takeaways: 'Normal = bell-shaped, symmetric, mean=median=mode. 68-95-99.7 rule.',
    relatedIds: [121, 133, 135],
  },
  {
    id: 130,
    section: 12,
    sectionTitle: 'Statistics & Probability',
    category: 'Statistics',
    question: 'What is the difference between Descriptive and Inferential statistics?',
    answer: 'Descriptive statistics summarize and describe features of a dataset (mean, median, charts). Inferential statistics use sample data to make predictions or generalizations about a larger population (hypothesis testing, confidence intervals, regression).',
    difficulty: 'Beginner',
    tags: ['statistics', 'descriptive', 'inferential'],
    takeaways: 'Descriptive = summarize data. Inferential = generalize to population.',
    relatedIds: [123, 131],
  },
  {
    id: 131,
    section: 12,
    sectionTitle: 'Statistics & Probability',
    category: 'Statistics',
    question: 'What is a Confidence Interval?',
    answer: 'A range of values, derived from sample data, that is likely to contain the true population parameter with a stated level of confidence (e.g. 95%) — it quantifies the uncertainty around an estimate.',
    difficulty: 'Intermediate',
    tags: ['statistics', 'confidence interval', 'estimation'],
    tips: '95% CI means: if we repeated the experiment 100 times, ~95 intervals would contain the true value.',
    takeaways: 'CI = range estimate with a confidence level (e.g., 95%).',
    relatedIds: [125, 130],
  },
  {
    id: 132,
    section: 12,
    sectionTitle: 'Statistics & Probability',
    category: 'Statistics',
    question: 'What is Linear Regression?',
    answer: 'A statistical method that models the relationship between a dependent variable and one or more independent variables using a straight-line equation (y = mx + c), used for prediction and trend analysis.',
    difficulty: 'Intermediate',
    tags: ['statistics', 'linear regression', 'prediction', 'modeling'],
    tips: 'Know the formula y = mx + c, and what R² means.',
    takeaways: 'Linear regression = straight-line model for prediction.',
    relatedIds: [124, 133],
  },
  {
    id: 133,
    section: 12,
    sectionTitle: 'Statistics & Probability',
    category: 'Statistics',
    question: 'What is the difference between Skewness and Kurtosis?',
    answer: 'Skewness measures the asymmetry of a distribution (left/negative vs right/positive skew). Kurtosis measures the "tailedness" or peakedness of a distribution compared to a normal distribution.',
    difficulty: 'Advanced',
    tags: ['statistics', 'skewness', 'kurtosis', 'distribution'],
    takeaways: 'Skewness = asymmetry. Kurtosis = tail heaviness/peakedness.',
    relatedIds: [129],
  },
  {
    id: 134,
    section: 12,
    sectionTitle: 'Statistics & Probability',
    category: 'Statistics',
    question: 'What is A/B Testing?',
    answer: 'An experiment comparing two versions (A = control, B = variant) of something (e.g. a webpage, email) by randomly splitting an audience, measuring a target metric, and using statistical tests to determine if the difference is significant.',
    difficulty: 'Intermediate',
    tags: ['statistics', 'ab testing', 'experiment', 'significance'],
    tips: 'Key elements: random split, control vs variant, statistical significance.',
    takeaways: 'A/B test = controlled experiment with statistical validation.',
    relatedIds: [125, 126],
  },
  {
    id: 135,
    section: 12,
    sectionTitle: 'Statistics & Probability',
    category: 'Statistics',
    question: 'What is the Central Limit Theorem?',
    answer: 'States that the sampling distribution of the mean of a large number of independent, identically distributed samples approaches a normal distribution, regardless of the shape of the original population\'s distribution — this underpins much of inferential statistics.',
    difficulty: 'Advanced',
    tags: ['statistics', 'clt', 'central limit theorem', 'sampling'],
    tips: 'CLT is why we can use normal-based tests even when population isn\'t normal.',
    takeaways: 'CLT: sample means → normal distribution as n increases.',
    relatedIds: [129, 123],
  },
  {
    id: 136,
    section: 13,
    sectionTitle: 'Python for Data Analysis',
    category: 'Python',
    question: 'What is the difference between a List and a Tuple in Python?',
    answer: 'A List is mutable (can be changed after creation) and uses square brackets []. A Tuple is immutable (cannot be changed) and uses parentheses (). Tuples are generally faster and used for fixed data.',
    pythonCode: `my_list = [1, 2, 3]
my_tuple = (1, 2, 3)`,
    difficulty: 'Beginner',
    tags: ['python', 'list', 'tuple', 'data structures'],
    tips: 'Lists for data that changes. Tuples for constants (like coordinates).',
    takeaways: 'List = mutable []. Tuple = immutable ().',
    relatedIds: [137],
  },
  {
    id: 137,
    section: 13,
    sectionTitle: 'Python for Data Analysis',
    category: 'Python',
    question: 'What is the difference between a List and a Dictionary?',
    answer: 'A List is an ordered collection of items accessed by index position. A Dictionary is an unordered (insertion-ordered in modern Python) collection of key-value pairs accessed by key.',
    pythonCode: 'my_dict = {"name": "Bhagabata", "role": "Data Analyst"}',
    difficulty: 'Beginner',
    tags: ['python', 'list', 'dictionary', 'data structures'],
    takeaways: 'List = ordered by index. Dict = key-value pairs.',
    relatedIds: [136],
  },
  {
    id: 138,
    section: 13,
    sectionTitle: 'Python for Data Analysis',
    category: 'Python',
    question: 'What is Pandas used for?',
    answer: 'Pandas is a Python library for data manipulation and analysis, providing DataFrame and Series structures to load, clean, transform, filter, group, merge, and analyze tabular data efficiently.',
    pythonCode: `import pandas as pd
df = pd.read_csv("data.csv")`,
    difficulty: 'Beginner',
    tags: ['python', 'pandas', 'data analysis', 'dataframe'],
    tips: 'Pandas is the #1 library for data analysis in Python.',
    takeaways: 'Pandas = tabular data manipulation (DataFrame + Series).',
    relatedIds: [139, 142, 145],
  },
  {
    id: 139,
    section: 13,
    sectionTitle: 'Python for Data Analysis',
    category: 'Python',
    question: 'What is the difference between loc and iloc in Pandas?',
    answer: 'loc selects rows/columns by label (name), while iloc selects rows/columns by integer position (index number).',
    pythonCode: `df.loc[0, "Salary"]    # by label
df.iloc[0, 2]          # by position`,
    difficulty: 'Intermediate',
    tags: ['python', 'pandas', 'loc', 'iloc', 'indexing'],
    tips: 'loc = Label-based. iloc = Integer-based. "i" = integer.',
    takeaways: 'loc = label. iloc = integer position.',
    relatedIds: [138, 146],
  },
  {
    id: 140,
    section: 13,
    sectionTitle: 'Python for Data Analysis',
    category: 'Python',
    question: 'How do you handle missing values in Pandas?',
    answer: 'Use df.isnull() / df.isna() to detect missing values, df.dropna() to remove rows/columns with missing values, and df.fillna(value) to fill them with a default, mean, median, or forward/backward filled value.',
    pythonCode: 'df.fillna(df.mean(numeric_only=True), inplace=True)',
    difficulty: 'Intermediate',
    tags: ['python', 'pandas', 'missing values', 'null', 'fillna'],
    tips: 'Always check for missing values FIRST when exploring new data.',
    takeaways: 'isnull() → detect. dropna() → remove. fillna() → impute.',
    relatedIds: [138, 153],
  },
  {
    id: 141,
    section: 13,
    sectionTitle: 'Python for Data Analysis',
    category: 'Python',
    question: 'What is the difference between merge(), join(), and concat() in Pandas?',
    answer: 'merge() combines DataFrames based on common columns/keys (like SQL JOIN). join() combines DataFrames based on their index. concat() stacks DataFrames either vertically (rows) or horizontally (columns) without matching on keys.',
    pythonCode: `pd.merge(df1, df2, on="CustomerID", how="left")
pd.concat([df1, df2], axis=0)`,
    difficulty: 'Intermediate',
    tags: ['python', 'pandas', 'merge', 'join', 'concat'],
    tips: 'merge = SQL-like JOIN. concat = stacking. join = index-based.',
    takeaways: 'merge() = by column. join() = by index. concat() = stack.',
    relatedIds: [138, 142],
  },
  {
    id: 142,
    section: 13,
    sectionTitle: 'Python for Data Analysis',
    category: 'Python',
    question: 'What is groupby() used for in Pandas?',
    answer: 'groupby() splits data into groups based on column values, applies an aggregate function to each group, and combines results — the Pandas equivalent of SQL\'s GROUP BY.',
    pythonCode: 'df.groupby("Department")["Salary"].mean()',
    difficulty: 'Intermediate',
    tags: ['python', 'pandas', 'groupby', 'aggregation'],
    tips: 'groupby follows split-apply-combine pattern.',
    takeaways: 'groupby() = Pandas version of SQL GROUP BY.',
    relatedIds: [5, 138, 141],
  },
  {
    id: 143,
    section: 13,
    sectionTitle: 'Python for Data Analysis',
    category: 'Python',
    question: 'What is the difference between apply(), map(), and applymap()?',
    answer: 'map() works element-wise on a Series. apply() works on a Series or DataFrame (row-wise or column-wise, and can apply more complex functions). applymap() applies a function element-wise across an entire DataFrame.',
    difficulty: 'Intermediate',
    tags: ['python', 'pandas', 'apply', 'map', 'applymap'],
    takeaways: 'map = Series elements. apply = rows/cols. applymap = all DataFrame cells.',
    relatedIds: [147],
  },
  {
    id: 144,
    section: 13,
    sectionTitle: 'Python for Data Analysis',
    category: 'Python',
    question: 'What is NumPy used for?',
    answer: 'NumPy is a Python library for numerical computing, providing fast array operations, mathematical functions, and the underlying array structure that Pandas is built on.',
    pythonCode: `import numpy as np
arr = np.array([1, 2, 3, 4])
arr.mean()`,
    difficulty: 'Beginner',
    tags: ['python', 'numpy', 'numerical computing', 'arrays'],
    takeaways: 'NumPy = fast numerical arrays. Foundation of Pandas.',
    relatedIds: [138],
  },
  {
    id: 145,
    section: 13,
    sectionTitle: 'Python for Data Analysis',
    category: 'Python',
    question: 'What is the difference between a Series and a DataFrame in Pandas?',
    answer: 'A Series is a one-dimensional labeled array (like a single column). A DataFrame is a two-dimensional labeled data structure (like a table), essentially a collection of Series sharing the same index.',
    difficulty: 'Beginner',
    tags: ['python', 'pandas', 'series', 'dataframe'],
    takeaways: 'Series = 1D column. DataFrame = 2D table of Series.',
    relatedIds: [138],
  },
  {
    id: 146,
    section: 13,
    sectionTitle: 'Python for Data Analysis',
    category: 'Python',
    question: 'How do you filter rows in a Pandas DataFrame based on a condition?',
    answer: 'Use boolean indexing with conditions inside brackets.',
    pythonCode: `df_filtered = df[df["Salary"] > 50000]
df_filtered2 = df[(df["Dept"] == "Sales") & (df["Salary"] > 50000)]`,
    difficulty: 'Beginner',
    tags: ['python', 'pandas', 'filtering', 'boolean indexing'],
    tips: 'Use & for AND, | for OR. Wrap each condition in parentheses.',
    takeaways: 'df[condition] = filtered DataFrame.',
    relatedIds: [139],
  },
  {
    id: 147,
    section: 13,
    sectionTitle: 'Python for Data Analysis',
    category: 'Python',
    question: 'What is a Lambda function in Python, and where might you use it?',
    answer: 'An anonymous, single-expression function defined with the lambda keyword, often used inline with functions like apply(), filter(), or sorted() where defining a full named function would be unnecessary.',
    pythonCode: 'df["Bonus"] = df["Salary"].apply(lambda x: x * 0.1)',
    difficulty: 'Intermediate',
    tags: ['python', 'lambda', 'anonymous function'],
    takeaways: 'Lambda = quick inline function for simple operations.',
    relatedIds: [143],
  },
  {
    id: 148,
    section: 13,
    sectionTitle: 'Python for Data Analysis',
    category: 'Python',
    question: 'What are common data visualization libraries in Python?',
    answer: 'Matplotlib (low-level, highly customizable plotting), Seaborn (built on Matplotlib, statistical visualizations with better defaults), and Plotly (interactive, web-based visualizations).',
    difficulty: 'Beginner',
    tags: ['python', 'matplotlib', 'seaborn', 'plotly', 'visualization'],
    takeaways: 'Matplotlib = base. Seaborn = statistical. Plotly = interactive.',
    relatedIds: [144],
  },
  {
    id: 149,
    section: 13,
    sectionTitle: 'Python for Data Analysis',
    category: 'Python',
    question: 'What is the difference between == and is in Python?',
    answer: '== checks if two objects have the same VALUE. is checks if two variables point to the exact same object in memory (identity).',
    difficulty: 'Intermediate',
    tags: ['python', 'comparison', 'identity', 'equality'],
    takeaways: '== = value equality. is = identity (same object in memory).',
    relatedIds: [136],
  },
  {
    id: 150,
    section: 13,
    sectionTitle: 'Python for Data Analysis',
    category: 'Python',
    question: 'How would you read a large CSV file efficiently in Pandas?',
    answer: 'Use chunksize to read the file in chunks instead of all at once, specify dtypes explicitly to reduce memory usage, use usecols to load only needed columns, and consider more efficient formats like Parquet for repeated use.',
    pythonCode: `for chunk in pd.read_csv("large_file.csv", chunksize=100000):
    process(chunk)`,
    difficulty: 'Advanced',
    tags: ['python', 'pandas', 'large data', 'chunking', 'performance'],
    tips: 'For very large files, consider Dask or Polars as Pandas alternatives.',
    takeaways: 'Chunksize + dtypes + usecols = efficient large file reading.',
    relatedIds: [138],
  },
  {
    id: 151,
    section: 14,
    sectionTitle: 'Data Cleaning & EDA',
    category: 'Python',
    question: 'What is Exploratory Data Analysis (EDA)?',
    answer: 'The process of investigating a dataset to summarize its main characteristics, often using visual methods, before formal modeling — includes checking data types, missing values, distributions, outliers, and relationships between variables.',
    difficulty: 'Beginner',
    tags: ['python', 'eda', 'data analysis', 'exploration'],
    tips: 'EDA is ALWAYS the first step before any analysis or modeling.',
    takeaways: 'EDA = understand data before modeling.',
    relatedIds: [152, 153],
  },
  {
    id: 152,
    section: 14,
    sectionTitle: 'Data Cleaning & EDA',
    category: 'Python',
    question: 'What steps do you take to clean a messy dataset?',
    answer: 'Typical steps: check and fix data types; handle missing values (impute or drop); remove duplicate records; standardize text/categorical values (casing, whitespace, typos); detect and handle outliers; validate referential integrity between related tables; and document any assumptions/transformations made.',
    difficulty: 'Intermediate',
    tags: ['python', 'data cleaning', 'data quality'],
    tips: 'Always document your cleaning steps for reproducibility.',
    takeaways: 'Clean = types → nulls → duplicates → standardize → outliers → validate.',
    relatedIds: [151, 153, 155],
  },
  {
    id: 153,
    section: 14,
    sectionTitle: 'Data Cleaning & EDA',
    category: 'Python',
    question: 'How do you handle missing data — what are the strategies?',
    answer: 'Strategies include: deletion (drop rows/columns if missing data is minimal and random); mean/median/mode imputation for numeric/categorical data; forward/backward fill for time series; predictive imputation using other columns; or flagging missingness itself as a feature if it\'s informative.',
    difficulty: 'Intermediate',
    tags: ['python', 'missing data', 'imputation', 'strategies'],
    takeaways: 'Delete, impute (mean/median/mode), fill forward/backward, or flag.',
    relatedIds: [140, 152],
  },
  {
    id: 154,
    section: 14,
    sectionTitle: 'Data Cleaning & EDA',
    category: 'Python',
    question: 'What is Data Wrangling / Data Munging?',
    answer: 'The overall process of transforming and mapping raw data into a clean, structured, analysis-ready format — includes cleaning, reshaping, merging, and enriching data.',
    difficulty: 'Beginner',
    tags: ['python', 'data wrangling', 'munging', 'transformation'],
    takeaways: 'Data Wrangling = clean + reshape + merge + enrich.',
    relatedIds: [152],
  },
  {
    id: 155,
    section: 14,
    sectionTitle: 'Data Cleaning & EDA',
    category: 'Python',
    question: 'How do you detect and treat outliers?',
    answer: 'Detect using IQR, Z-score, or visualization (box plot, scatter plot). Treat by investigating the cause (data entry error vs genuine extreme value), then either correcting, capping/winsorizing, removing, or leaving as-is with a note, depending on business context.',
    difficulty: 'Intermediate',
    tags: ['python', 'outliers', 'iqr', 'z-score', 'data quality'],
    takeaways: 'Detect (IQR/Z-score/visual) → investigate → decide (correct/cap/remove/keep).',
    relatedIds: [127, 152],
  },
  {
    id: 156,
    section: 14,
    sectionTitle: 'Data Cleaning & EDA',
    category: 'Python',
    question: 'What is data type conversion / casting, and why does it matter?',
    answer: 'Converting a column from one data type to another (e.g. text to date, string to integer) — important because incorrect types can break calculations, sorting, and filtering, and often signal upstream data quality issues.',
    difficulty: 'Beginner',
    tags: ['python', 'data types', 'casting', 'conversion'],
    takeaways: 'Wrong types → broken calcs. Always check and fix types early.',
    relatedIds: [152],
  },
  {
    id: 157,
    section: 14,
    sectionTitle: 'Data Cleaning & EDA',
    category: 'Python',
    question: 'How do you identify inconsistent categorical data (e.g. "NY", "New York", "ny")?',
    answer: 'Use value_counts() / DISTINCT queries to inspect unique values, then standardize using mapping dictionaries, string functions (TRIM, UPPER/LOWER), or fuzzy matching for near-duplicates.',
    difficulty: 'Intermediate',
    tags: ['python', 'data cleaning', 'categorical', 'standardization'],
    takeaways: 'Inspect unique values → standardize with mappings/string functions.',
    relatedIds: [152],
  },
  {
    id: 158,
    section: 14,
    sectionTitle: 'Data Cleaning & EDA',
    category: 'Python',
    question: 'What is feature engineering?',
    answer: 'The process of creating new input features from existing raw data to improve model performance — e.g. extracting year/month from a date, creating ratio columns, binning numeric values, or encoding categorical variables.',
    difficulty: 'Intermediate',
    tags: ['python', 'feature engineering', 'modeling', 'transformation'],
    takeaways: 'Feature engineering = create new meaningful columns from raw data.',
    relatedIds: [151],
  },
  {
    id: 159,
    section: 14,
    sectionTitle: 'Data Cleaning & EDA',
    category: 'Python',
    question: 'How do you handle imbalanced datasets?',
    answer: 'Techniques include: oversampling the minority class (SMOTE), undersampling the majority class, using class weights in models, ensemble methods, or evaluation metrics that account for imbalance (F1-score, AUC-ROC instead of accuracy).',
    difficulty: 'Advanced',
    tags: ['python', 'imbalanced data', 'smote', 'classification'],
    takeaways: 'Oversample, undersample, class weights, or better metrics.',
    relatedIds: [155],
  },
  {
    id: 160,
    section: 14,
    sectionTitle: 'Data Cleaning & EDA',
    category: 'Python',
    question: 'What is the difference between structured and unstructured data?',
    answer: 'Structured data is organized in rows and columns (databases, spreadsheets). Unstructured data lacks a predefined format (text, images, videos, logs). Semi-structured data has some organization but isn\'t fully tabular (JSON, XML).',
    difficulty: 'Beginner',
    tags: ['python', 'structured', 'unstructured', 'data types'],
    takeaways: 'Structured = tables. Unstructured = text/images. Semi = JSON/XML.',
    relatedIds: [151],
  },
  {
    id: 161,
    section: 15,
    sectionTitle: 'Data Governance & Data Quality',
    category: 'Data Governance',
    question: 'What is Data Governance?',
    answer: `A framework of policies, roles, standards, and processes that
ensures data across an organization is accurate, consistent, secure,
and used properly — covering data ownership, quality, privacy, and
compliance.`,
    difficulty: 'Intermediate',
    tags: ['data governance', 'section-15'],
  },
  {
    id: 162,
    section: 15,
    sectionTitle: 'Data Governance & Data Quality',
    category: 'Data Governance',
    question: 'What are the key dimensions of Data Quality?',
    answer: `Accuracy, Completeness, Consistency, Timeliness, Uniqueness, and
Validity — data quality frameworks (including tools like Collibra)
typically assess data against these dimensions.`,
    difficulty: 'Intermediate',
    tags: ['data governance', 'section-15'],
  },
  {
    id: 163,
    section: 15,
    sectionTitle: 'Data Governance & Data Quality',
    category: 'Data Governance',
    question: 'What is a Data Catalog?',
    answer: `A centralized inventory of an organization's data assets,
including metadata (definitions, ownership, lineage, sensitivity),
making it easier for users to find, understand, and trust data. Tools
like Collibra provide data cataloging capabilities.`,
    difficulty: 'Intermediate',
    tags: ['data governance', 'section-15'],
  },
  {
    id: 164,
    section: 15,
    sectionTitle: 'Data Governance & Data Quality',
    category: 'Data Governance',
    question: 'What is Data Lineage?',
    answer: `The tracking of data's origin, movement, and transformations as
it flows through systems — from source to destination — helping teams
understand where data comes from and how it has changed.`,
    difficulty: 'Intermediate',
    tags: ['data governance', 'section-15'],
  },
  {
    id: 165,
    section: 15,
    sectionTitle: 'Data Governance & Data Quality',
    category: 'Data Governance',
    question: 'What is Master Data Management (MDM)?',
    answer: `A discipline/process for creating a single, consistent, and
authoritative source of core business data (e.g. customer, product)
across multiple systems, reducing duplication and inconsistency.`,
    difficulty: 'Intermediate',
    tags: ['data governance', 'section-15'],
  },
  {
    id: 166,
    section: 15,
    sectionTitle: 'Data Governance & Data Quality',
    category: 'Data Governance',
    question: 'What is a Data Steward, and what do they do?',
    answer: `A person responsible for managing and overseeing an
organization's data assets — ensuring data quality, defining business
terms/metadata, resolving data issues, and enforcing governance
policies for a specific domain.`,
    difficulty: 'Intermediate',
    tags: ['data governance', 'section-15'],
  },
  {
    id: 167,
    section: 15,
    sectionTitle: 'Data Governance & Data Quality',
    category: 'Data Governance',
    question: `What is the difference between Data Governance and Data
Management?`,
    answer: `Data Governance defines the policies, standards, and
accountability (the "what" and "who"). Data Management is the
operational execution of those policies — the actual processes and
technology used to store, move, and maintain data (the "how").`,
    difficulty: 'Intermediate',
    tags: ['data governance', 'section-15'],
  },
  {
    id: 168,
    section: 15,
    sectionTitle: 'Data Governance & Data Quality',
    category: 'Data Governance',
    question: 'What is metadata, and why is it important?',
    answer: `Metadata is "data about data" — descriptive information like
column definitions, data types, source system, and ownership. It's
important because it helps users understand, trust, and correctly use
data without needing to inspect the raw data itself.`,
    difficulty: 'Intermediate',
    tags: ['data governance', 'section-15'],
  },
  {
    id: 169,
    section: 15,
    sectionTitle: 'Data Governance & Data Quality',
    category: 'Data Governance',
    question: 'What is a business glossary?',
    answer: `A centralized, standardized list of business terms and their
definitions (e.g. what exactly counts as an "Active Customer"), used to
ensure everyone across an organization interprets data terms
consistently.`,
    difficulty: 'Intermediate',
    tags: ['data governance', 'section-15'],
  },
  {
    id: 170,
    section: 15,
    sectionTitle: 'Data Governance & Data Quality',
    category: 'Data Governance',
    question: `How would you handle a data quality issue you discover in a
report?`,
    answer: `Sample answer: "I'd first verify the issue isn't a one-off query
error, trace it back to the source data to find the root cause, flag it
to the relevant data owner/steward, document the impact on downstream
reports, and — depending on urgency — either correct it directly or
clearly caveat the affected numbers until it's resolved."`,
    difficulty: 'Intermediate',
    tags: ['data governance', 'section-15'],
  },
  {
    id: 171,
    section: 16,
    sectionTitle: 'Power BI',
    category: 'Power BI',
    question: 'What is Power BI, and how does it compare to Tableau?',
    answer: `Power BI is Microsoft's business intelligence tool for connecting
to data sources, transforming data (via Power Query), and building
interactive reports/dashboards. Compared to Tableau, Power BI has
tighter integration with Microsoft products (Excel, Azure, Teams) and a
typically lower cost, while Tableau is often considered stronger for
complex, highly customized visualizations.`,
    difficulty: 'Intermediate',
    tags: ['power bi', 'section-16'],
  },
  {
    id: 172,
    section: 16,
    sectionTitle: 'Power BI',
    category: 'Power BI',
    question: 'What is DAX in Power BI?',
    answer: `DAX (Data Analysis Expressions) is the formula language used in
Power BI (and Excel Power Pivot) to create calculated columns, measures,
and custom aggregations.
Example measure:
Total Sales = SUM(Sales[Amount])`,
    difficulty: 'Intermediate',
    tags: ['power bi', 'section-16'],
  },
  {
    id: 173,
    section: 16,
    sectionTitle: 'Power BI',
    category: 'Power BI',
    question: `What is the difference between a Calculated Column and a Measure
in Power BI?`,
    answer: `A Calculated Column is computed row-by-row and stored in the
table (uses storage). A Measure is calculated dynamically at query time
based on the current filter context (e.g. what's on a visual) and is
not stored — generally more efficient for aggregations.`,
    difficulty: 'Intermediate',
    tags: ['power bi', 'section-16'],
  },
  {
    id: 174,
    section: 16,
    sectionTitle: 'Power BI',
    category: 'Power BI',
    question: 'What is Power Query in Power BI?',
    answer: `The data connection and transformation engine (same underlying
technology as Excel's Power Query) used to import, clean, reshape, and
combine data before it's loaded into the Power BI data model.`,
    difficulty: 'Intermediate',
    tags: ['power bi', 'section-16'],
  },
  {
    id: 175,
    section: 16,
    sectionTitle: 'Power BI',
    category: 'Power BI',
    question: 'What is a Star Schema, and why is it used in BI tools?',
    answer: `A data modeling approach with a central Fact table (containing
measures/transactions) connected to surrounding Dimension tables
(containing descriptive attributes like Date, Product, Customer). It's
used because it simplifies queries, improves performance, and works
naturally with BI tools' filtering and aggregation.`,
    difficulty: 'Intermediate',
    tags: ['power bi', 'section-16'],
  },
  {
    id: 176,
    section: 16,
    sectionTitle: 'Power BI',
    category: 'Power BI',
    question: `What is the difference between Import mode and DirectQuery mode
in Power BI?`,
    answer: `Import mode loads a copy of the data into Power BI's in-memory
model (fast, but needs refreshing). DirectQuery queries the source
database live for each interaction (always current, but can be slower
and depends on source database performance).`,
    difficulty: 'Intermediate',
    tags: ['power bi', 'section-16'],
  },
  {
    id: 177,
    section: 16,
    sectionTitle: 'Power BI',
    category: 'Power BI',
    question: 'What are Slicers in Power BI?',
    answer: `Visual filter controls placed on a report that let users interact
with and filter the data shown across visuals on a page, similar to
Quick Filters in Tableau.`,
    difficulty: 'Intermediate',
    tags: ['power bi', 'section-16'],
  },
  {
    id: 178,
    section: 16,
    sectionTitle: 'Power BI',
    category: 'Power BI',
    question: 'What is Row-Level Security (RLS) in Power BI?',
    answer: `A feature that restricts data access for specific users based on
roles/filters, so different users see only the rows of data relevant
to them (e.g. a regional manager sees only their region's data) when
viewing the same report.`,
    difficulty: 'Intermediate',
    tags: ['power bi', 'section-16'],
  },
  {
    id: 179,
    section: 16,
    sectionTitle: 'Power BI',
    category: 'Power BI',
    question: `What is the difference between Power BI Desktop and Power BI
Service?`,
    answer: `Power BI Desktop is the free Windows application used to build
and design reports. Power BI Service is the cloud-based platform used
to publish, share, schedule refreshes, and collaborate on those reports
with others.`,
    difficulty: 'Intermediate',
    tags: ['power bi', 'section-16'],
  },
  {
    id: 180,
    section: 16,
    sectionTitle: 'Power BI',
    category: 'Power BI',
    question: 'How do you optimize a slow Power BI report?',
    answer: `Reduce the data model size (import only needed columns/rows), use
Import mode where possible, minimize the use of calculated columns in
favor of measures, simplify complex DAX, use a proper star schema, and
limit the number of visuals per page.`,
    difficulty: 'Intermediate',
    tags: ['power bi', 'section-16'],
  },
  {
    id: 181,
    section: 17,
    sectionTitle: 'Business / Case / Behavioral Questions',
    category: 'Behavioral',
    question: `Tell me about a time you found an insight in data that changed a
business decision.`,
    answer: `Sample structure (STAR method): Situation — describe the business
context; Task — what you were asked to analyze; Action — the analysis
you performed (tools, method); Result — the insight found and its
business impact. Tailor this to a real example from your Data Gyan
internship or D365 F&O work.`,
    difficulty: 'Intermediate',
    tags: ['behavioral', 'section-17'],
  },
  {
    id: 182,
    section: 17,
    sectionTitle: 'Business / Case / Behavioral Questions',
    category: 'Behavioral',
    question: `How do you prioritize multiple reporting requests with tight
deadlines?`,
    answer: `Sample answer: "I clarify the business impact and urgency of each
request with stakeholders, prioritize based on decisions that depend on
the data, communicate realistic timelines early, and look for ways to
reuse existing queries/dashboards to save time."`,
    difficulty: 'Intermediate',
    tags: ['behavioral', 'section-17'],
  },
  {
    id: 183,
    section: 17,
    sectionTitle: 'Business / Case / Behavioral Questions',
    category: 'Behavioral',
    question: `How would you explain a complex data finding to a non-technical
stakeholder?`,
    answer: `Sample answer: "I'd focus on the business impact rather than the
technical method, use simple visuals instead of raw numbers or code,
avoid jargon, and tie the finding back to a decision or action the
stakeholder can take."`,
    difficulty: 'Intermediate',
    tags: ['behavioral', 'section-17'],
  },
  {
    id: 184,
    section: 17,
    sectionTitle: 'Business / Case / Behavioral Questions',
    category: 'Behavioral',
    question: `What would you do if your analysis contradicted a stakeholder's
expectations?`,
    answer: `Sample answer: "I'd double-check my data and methodology for
errors first, then present the findings transparently with supporting
evidence, remain open to their business context/domain knowledge that I
might be missing, and let the data guide the conversation rather than
assuming either side is automatically right."`,
    difficulty: 'Intermediate',
    tags: ['behavioral', 'section-17'],
  },
  {
    id: 185,
    section: 17,
    sectionTitle: 'Business / Case / Behavioral Questions',
    category: 'Behavioral',
    question: 'How do you ensure accuracy in your reports?',
    answer: `Sample answer: "I validate totals against source systems, spot-
check individual records, use consistent, documented definitions for
metrics, and where possible have a peer review key reports before they
go out."`,
    difficulty: 'Intermediate',
    tags: ['behavioral', 'section-17'],
  },
  {
    id: 186,
    section: 17,
    sectionTitle: 'Business / Case / Behavioral Questions',
    category: 'Behavioral',
    question: `Describe a situation where you had to work with incomplete or
messy data.`,
    answer: `Sample structure: describe the specific data quality issues found
(missing values, inconsistent formats, duplicates), the cleaning
approach taken, and how you communicated any resulting limitations or
assumptions to stakeholders.`,
    difficulty: 'Intermediate',
    tags: ['behavioral', 'section-17'],
  },
  {
    id: 187,
    section: 17,
    sectionTitle: 'Business / Case / Behavioral Questions',
    category: 'Behavioral',
    question: `How do you stay updated with new tools and techniques in data
analytics?`,
    answer: `Sample answer: "I follow structured learning paths (e.g. SQL,
Tableau, Python), work on hands-on practice datasets, and apply new
skills directly to real projects at work, like combining my D365 F&O/
ERP background with data analysis and governance tools like Collibra."`,
    difficulty: 'Intermediate',
    tags: ['behavioral', 'section-17'],
  },
  {
    id: 188,
    section: 17,
    sectionTitle: 'Business / Case / Behavioral Questions',
    category: 'Behavioral',
    question: `What metrics would you track to measure the success of an
e-commerce website?`,
    answer: `Examples: Conversion Rate, Average Order Value, Customer
Acquisition Cost, Customer Lifetime Value, Cart Abandonment Rate,
Repeat Purchase Rate, Traffic by channel, and Revenue by product/
region.`,
    difficulty: 'Intermediate',
    tags: ['behavioral', 'section-17'],
  },
  {
    id: 189,
    section: 17,
    sectionTitle: 'Business / Case / Behavioral Questions',
    category: 'Behavioral',
    question: `A dashboard shows a sudden drop in sales overnight — how do you
investigate?`,
    answer: `Sample approach: first rule out a data/reporting issue (ETL
failure, filter misconfiguration, date range issue); check if the drop
is isolated to one region/product/channel or across the board; compare
against historical patterns (seasonality, day-of-week effects); check
for external factors (promotions ended, website outage, stock-outs);
then communicate findings once confirmed.`,
    difficulty: 'Intermediate',
    tags: ['behavioral', 'section-17'],
  },
  {
    id: 190,
    section: 17,
    sectionTitle: 'Business / Case / Behavioral Questions',
    category: 'Behavioral',
    question: 'How would you design a KPI dashboard for a sales team?',
    answer: `Sample approach: clarify the audience and their key decisions
first; select a small set of meaningful KPIs (e.g. Revenue, Growth %,
Conversion Rate, Top Products/Regions) rather than everything possible;
design for at-a-glance readability with drill-down options; ensure data
refreshes reliably; and validate numbers against source reports before
rollout.`,
    difficulty: 'Intermediate',
    tags: ['behavioral', 'section-17'],
  },
  {
    id: 191,
    section: 18,
    sectionTitle: 'General Data Analyst Concepts',
    category: 'General',
    question: `What is the difference between a Data Analyst, Data Scientist, and
Data Engineer?`,
    answer: `A Data Analyst focuses on interpreting existing data to answer
business questions and build reports/dashboards. A Data Scientist
builds predictive models and applies advanced statistics/machine
learning. A Data Engineer builds and maintains the pipelines and
infrastructure that collect, store, and move data for the other two
roles to use.`,
    difficulty: 'Intermediate',
    tags: ['general', 'section-18'],
  },
  {
    id: 192,
    section: 18,
    sectionTitle: 'General Data Analyst Concepts',
    category: 'General',
    question: 'What is ETL vs ELT?',
    answer: `ETL (Extract, Transform, Load) transforms data before loading it
into the target system. ELT (Extract, Load, Transform) loads raw data
into the target system first (often a cloud data warehouse) and
transforms it afterward, taking advantage of the target system's
processing power.`,
    difficulty: 'Intermediate',
    tags: ['general', 'section-18'],
  },
  {
    id: 193,
    section: 18,
    sectionTitle: 'General Data Analyst Concepts',
    category: 'General',
    question: 'What is a Data Warehouse vs a Database?',
    answer: `A Database (OLTP) is optimized for fast, transactional read/write
operations on current, detailed data (e.g. order processing). A Data
Warehouse (OLAP) is optimized for analytical queries across large
volumes of historical, aggregated data from multiple sources, often
structured as a star/snowflake schema.`,
    difficulty: 'Intermediate',
    tags: ['general', 'section-18'],
  },
  {
    id: 194,
    section: 18,
    sectionTitle: 'General Data Analyst Concepts',
    category: 'General',
    question: 'What is a KPI (Key Performance Indicator)?',
    answer: `A measurable value that shows how effectively an organization or
team is achieving a key business objective (e.g. Monthly Revenue
Growth, Customer Churn Rate) — used to track progress and guide
decisions.`,
    difficulty: 'Intermediate',
    tags: ['general', 'section-18'],
  },
  {
    id: 195,
    section: 18,
    sectionTitle: 'General Data Analyst Concepts',
    category: 'General',
    question: 'What is the difference between OLAP and OLTP?',
    answer: `OLTP (Online Transaction Processing) systems handle day-to-day
transactional operations with frequent, small read/write actions. OLAP
(Online Analytical Processing) systems handle complex analytical
queries over large historical datasets, typically used for reporting
and business intelligence.`,
    difficulty: 'Intermediate',
    tags: ['general', 'section-18'],
  },
  {
    id: 196,
    section: 18,
    sectionTitle: 'General Data Analyst Concepts',
    category: 'General',
    question: 'What is Data Modeling?',
    answer: `The process of designing how data is structured, related, and
stored — defining tables, keys, and relationships (e.g. star schema) —
to support efficient storage, querying, and reporting.`,
    difficulty: 'Intermediate',
    tags: ['general', 'section-18'],
  },
  {
    id: 197,
    section: 18,
    sectionTitle: 'General Data Analyst Concepts',
    category: 'General',
    question: `What is the difference between a Fact table and a Dimension
table?`,
    answer: `A Fact table stores quantitative, measurable data (transactions,
sales amounts) and foreign keys linking to dimensions. A Dimension
table stores descriptive, categorical attributes (product name,
customer details, date attributes) that give context to the facts.`,
    difficulty: 'Intermediate',
    tags: ['general', 'section-18'],
  },
  {
    id: 198,
    section: 18,
    sectionTitle: 'General Data Analyst Concepts',
    category: 'General',
    question: `What is Data Visualization best practice you follow when building
a report?`,
    answer: `Practices include: choosing the right chart type for the data
(avoid pie charts for many categories); keeping visuals uncluttered;
using consistent color coding; labeling axes/units clearly; ordering
categories meaningfully; and highlighting the key takeaway rather than
showing everything at once.`,
    difficulty: 'Intermediate',
    tags: ['general', 'section-18'],
  },
  {
    id: 199,
    section: 18,
    sectionTitle: 'General Data Analyst Concepts',
    category: 'General',
    question: `What is the difference between Structured Query Language (SQL)
and NoSQL databases?`,
    answer: `SQL (relational) databases store data in structured tables with
fixed schemas and relationships, using SQL for querying (e.g. MySQL,
SQL Server). NoSQL databases store data in flexible formats (document,
key-value, column, graph) without a fixed schema, often used for
unstructured or rapidly changing data (e.g. MongoDB, Cassandra).`,
    difficulty: 'Intermediate',
    tags: ['general', 'section-18'],
  },
  {
    id: 200,
    section: 18,
    sectionTitle: 'General Data Analyst Concepts',
    category: 'General',
    question: `Walk me through how you would approach a new, unfamiliar dataset
given to you for analysis.`,
    answer: `Sample approach: 1) Understand the business question/goal first;
2) Profile the data — check size, columns, data types, missing values;
3) Perform EDA — distributions, relationships, outliers; 4) Clean and
transform the data as needed; 5) Analyze and build visuals/queries
targeted at the original question; 6) Validate findings against source
data or known benchmarks; 7) Summarize insights clearly for the
intended audience.`,
    difficulty: 'Intermediate',
    tags: ['general', 'section-18'],
  },
  {
    id: 201,
    section: 19,
    sectionTitle: 'Advanced Excel Functions & Analysis',
    category: 'Excel',
    question: 'What is the INDEX function and how does it differ from OFFSET?',
    answer: `INDEX returns the value at a given row/column position within a
fixed range and is non-volatile (doesn't recalculate on every sheet
change). OFFSET returns a reference shifted from a starting point by a
given number of rows/columns and is volatile — it recalculates
constantly, which can slow down large workbooks.`,
    difficulty: 'Intermediate',
    tags: ['excel', 'section-19'],
  },
  {
    id: 202,
    section: 19,
    sectionTitle: 'Advanced Excel Functions & Analysis',
    category: 'Excel',
    question: 'What is an Array constant in Excel?',
    answer: `A fixed set of values entered directly into a formula using curly
braces, e.g. {1,2,3;4,5,6}, used to supply multiple values to a
function without referencing cells.`,
    difficulty: 'Intermediate',
    tags: ['excel', 'section-19'],
  },
  {
    id: 203,
    section: 19,
    sectionTitle: 'Advanced Excel Functions & Analysis',
    category: 'Excel',
    question: `What is the purpose of the OFFSET function, and why is it
considered "volatile"?`,
    answer: `OFFSET returns a reference that is a specified number of rows/
columns from a starting cell, often used for dynamic ranges. It's
"volatile" because Excel recalculates it every time ANY cell in the
workbook changes, not just its dependents, which can slow performance
in large files.`,
    difficulty: 'Intermediate',
    tags: ['excel', 'section-19'],
  },
  {
    id: 204,
    section: 19,
    sectionTitle: 'Advanced Excel Functions & Analysis',
    category: 'Excel',
    question: 'What are named ranges and why use them?',
    answer: `A named range assigns a readable name (e.g. "SalesData") to a
cell or range, making formulas easier to read, reducing reference
errors, and simplifying maintenance across a workbook.`,
    difficulty: 'Intermediate',
    tags: ['excel', 'section-19'],
  },
  {
    id: 205,
    section: 19,
    sectionTitle: 'Advanced Excel Functions & Analysis',
    category: 'Excel',
    question: `What is the difference between a Table (Ctrl+T) and a normal
range in Excel?`,
    answer: `An Excel Table auto-expands as new rows/columns are added, has
structured references (e.g. Table1[Sales]), built-in filtering/sorting,
and formulas auto-fill down new rows — a normal range does none of
this automatically.`,
    difficulty: 'Intermediate',
    tags: ['excel', 'section-19'],
  },
  {
    id: 206,
    section: 19,
    sectionTitle: 'Advanced Excel Functions & Analysis',
    category: 'Excel',
    question: 'What is Goal Seek used for?',
    answer: `A what-if analysis tool that works backward — given a desired
result for a formula, Goal Seek finds the input value needed to achieve
it (e.g. "what sales figure gives me a 20% margin?").`,
    difficulty: 'Intermediate',
    tags: ['excel', 'section-19'],
  },
  {
    id: 207,
    section: 19,
    sectionTitle: 'Advanced Excel Functions & Analysis',
    category: 'Excel',
    question: 'What is What-If Analysis / Data Tables?',
    answer: `A feature that shows how a formula's result changes as one or two
input variables change, generating a table of possible outcomes —
useful for sensitivity analysis (e.g. profit at different price points).`,
    difficulty: 'Intermediate',
    tags: ['excel', 'section-19'],
  },
  {
    id: 208,
    section: 19,
    sectionTitle: 'Advanced Excel Functions & Analysis',
    category: 'Excel',
    question: 'What is Solver, and when would you use it?',
    answer: `An Excel add-in used to find an optimal value (max/min/target) for
a formula by adjusting multiple variable cells, subject to constraints —
used for optimization problems like maximizing profit given resource
limits.`,
    difficulty: 'Intermediate',
    tags: ['excel', 'section-19'],
  },
  {
    id: 209,
    section: 19,
    sectionTitle: 'Advanced Excel Functions & Analysis',
    category: 'Excel',
    question: `What is the difference between AND/OR/NOT logical functions and
nested IF?`,
    answer: `AND/OR/NOT evaluate multiple conditions and return TRUE/FALSE,
typically combined inside a single IF. Nested IF chains multiple IF
statements to handle several distinct outcomes — AND/OR/NOT are usually
cleaner when checking multiple conditions for ONE outcome.`,
    difficulty: 'Intermediate',
    tags: ['excel', 'section-19'],
  },
  {
    id: 210,
    section: 19,
    sectionTitle: 'Advanced Excel Functions & Analysis',
    category: 'Excel',
    question: 'What is the TEXT function used for?',
    answer: `TEXT converts a number or date into a formatted text string
(e.g. TEXT(A1,"dd-mmm-yyyy")), useful for concatenating numbers/dates
into readable labels or messages.`,
    difficulty: 'Intermediate',
    tags: ['excel', 'section-19'],
  },
  {
    id: 211,
    section: 19,
    sectionTitle: 'Advanced Excel Functions & Analysis',
    category: 'Excel',
    question: 'What is the difference between Freeze Panes and Split?',
    answer: `Freeze Panes locks specific rows/columns in place so they stay
visible while scrolling. Split divides the window into multiple
independently scrollable panes of the same sheet, without locking
anything.`,
    difficulty: 'Intermediate',
    tags: ['excel', 'section-19'],
  },
  {
    id: 212,
    section: 19,
    sectionTitle: 'Advanced Excel Functions & Analysis',
    category: 'Excel',
    question: 'What are slicers in Excel Pivot Tables?',
    answer: `Visual, clickable filter buttons for Pivot Table fields, making
it easier and faster to filter data interactively compared to the
standard dropdown filter.`,
    difficulty: 'Intermediate',
    tags: ['excel', 'section-19'],
  },
  {
    id: 213,
    section: 19,
    sectionTitle: 'Advanced Excel Functions & Analysis',
    category: 'Excel',
    question: `What is the difference between a Pivot Table and a Power Pivot
Data Model?`,
    answer: `A standard Pivot Table summarizes a single flat data range. A
Power Pivot Data Model can combine multiple related tables (like a mini
relational database), handle much larger datasets, and use DAX formulas
for advanced calculations.`,
    difficulty: 'Intermediate',
    tags: ['excel', 'section-19'],
  },
  {
    id: 214,
    section: 19,
    sectionTitle: 'Advanced Excel Functions & Analysis',
    category: 'Excel',
    question: 'How do you create a dynamic dashboard in Excel?',
    answer: `Combine Excel Tables (for auto-expanding data), Pivot Tables/
Pivot Charts linked to that data, slicers for interactivity, and
formulas like INDEX-MATCH or XLOOKUP for dynamic summary cells — all
laid out on a single sheet designed for at-a-glance viewing.`,
    difficulty: 'Intermediate',
    tags: ['excel', 'section-19'],
  },
  {
    id: 215,
    section: 19,
    sectionTitle: 'Advanced Excel Functions & Analysis',
    category: 'Excel',
    question: 'What is the difference between .xlsx and .xlsm file formats?',
    answer: `.xlsx is a standard Excel workbook without macro support. .xlsm
is a macro-enabled workbook that can store and run VBA code.`,
    difficulty: 'Intermediate',
    tags: ['excel', 'section-19'],
  },
  {
    id: 216,
    section: 20,
    sectionTitle: 'Advanced Tableau',
    category: 'Tableau',
    question: 'What is a Tableau Story?',
    answer: `A sequence of worksheets/dashboards arranged to narrate a
data-driven storyline step by step, often used for presentations where
each "story point" builds on the last.`,
    difficulty: 'Advanced',
    tags: ['tableau', 'section-20'],
  },
  {
    id: 217,
    section: 20,
    sectionTitle: 'Advanced Tableau',
    category: 'Tableau',
    question: `What is the difference between a Worksheet and a Dashboard in
Tableau?`,
    answer: `A Worksheet is a single chart/view built from one data source. A
Dashboard combines multiple worksheets, filters, and objects into one
interactive, unified view.`,
    difficulty: 'Advanced',
    tags: ['tableau', 'section-20'],
  },
  {
    id: 218,
    section: 20,
    sectionTitle: 'Advanced Tableau',
    category: 'Tableau',
    question: 'What are Sets in Tableau?',
    answer: `Custom fields that define a subset of data based on a condition
or manual selection (e.g. "Top 10 Customers"), which can be used in
filters, colors, or calculations, and can be dynamic (auto-updating).`,
    difficulty: 'Advanced',
    tags: ['tableau', 'section-20'],
  },
  {
    id: 219,
    section: 20,
    sectionTitle: 'Advanced Tableau',
    category: 'Tableau',
    question: 'What are Groups in Tableau, and how do they differ from Sets?',
    answer: `Groups combine multiple dimension members into a single category
(e.g. combining several cities into "West Region"). Unlike Sets, Groups
are static categorizations of members rather than a dynamic in/out
condition.`,
    difficulty: 'Advanced',
    tags: ['tableau', 'section-20'],
  },
  {
    id: 220,
    section: 20,
    sectionTitle: 'Advanced Tableau',
    category: 'Tableau',
    question: 'What is a Dual-Axis chart in Tableau?',
    answer: `A chart that overlays two measures on the same view using two
separate Y-axes, useful for comparing two related but differently
scaled metrics (e.g. Sales as bars and Profit Margin as a line).`,
    difficulty: 'Advanced',
    tags: ['tableau', 'section-20'],
  },
  {
    id: 221,
    section: 20,
    sectionTitle: 'Advanced Tableau',
    category: 'Tableau',
    question: `What is the difference between Synchronized and Independent dual
axes?`,
    answer: `Synchronized axes share the same scale, aligning both measures on
comparable ranges. Independent axes let each measure use its own scale,
useful when the two measures have very different magnitudes.`,
    difficulty: 'Advanced',
    tags: ['tableau', 'section-20'],
  },
  {
    id: 222,
    section: 20,
    sectionTitle: 'Advanced Tableau',
    category: 'Tableau',
    question: 'What is a Bins field in Tableau?',
    answer: `A field that groups a continuous measure into equal-sized ranges
(bins), commonly used to build histograms.`,
    difficulty: 'Advanced',
    tags: ['tableau', 'section-20'],
  },
  {
    id: 223,
    section: 20,
    sectionTitle: 'Advanced Tableau',
    category: 'Tableau',
    question: 'What is the purpose of Tableau\'s "Show Me" panel?',
    answer: `A built-in panel that recommends chart types based on the fields
currently selected, helping users quickly build an appropriate
visualization without manually configuring marks.`,
    difficulty: 'Advanced',
    tags: ['tableau', 'section-20'],
  },
  {
    id: 224,
    section: 20,
    sectionTitle: 'Advanced Tableau',
    category: 'Tableau',
    question: 'What is context filter, and when do you use it?',
    answer: `A filter set to run FIRST, before other filters, creating a
temporary "context" table that other filters/calculations then operate
on — used to improve performance on large datasets or to make other
filters/dimensions dependent on it (e.g. Top N within a category).`,
    difficulty: 'Advanced',
    tags: ['tableau', 'section-20'],
  },
  {
    id: 225,
    section: 20,
    sectionTitle: 'Advanced Tableau',
    category: 'Tableau',
    question: 'What is the order of operations in Tableau (filter order)?',
    answer: `Generally: Extract filters → Data Source filters → Context
filters → Sets/Dimension filters → Measure filters → Table
calculation filters. Understanding this order matters for getting
correct Top-N and LOD results.`,
    difficulty: 'Advanced',
    tags: ['tableau', 'section-20'],
  },
  {
    id: 226,
    section: 20,
    sectionTitle: 'Advanced Tableau',
    category: 'Tableau',
    question: 'What is a Tableau Data Source filter vs a Sheet-level filter?',
    answer: `A Data Source filter applies at the connection level, restricting
data across ALL sheets using that source. A Sheet-level filter applies
only to the specific worksheet it's added to.`,
    difficulty: 'Advanced',
    tags: ['tableau', 'section-20'],
  },
  {
    id: 227,
    section: 20,
    sectionTitle: 'Advanced Tableau',
    category: 'Tableau',
    question: 'What are Reference Lines used for?',
    answer: `Lines added to a view (e.g. average, median, constant value) to
give visual context for how data points compare against a benchmark.`,
    difficulty: 'Advanced',
    tags: ['tableau', 'section-20'],
  },
  {
    id: 228,
    section: 20,
    sectionTitle: 'Advanced Tableau',
    category: 'Tableau',
    question: 'What is Forecasting in Tableau?',
    answer: `A built-in feature that uses exponential smoothing to project
future values for a continuous time-based measure directly on a chart,
without needing external statistical tools.`,
    difficulty: 'Advanced',
    tags: ['tableau', 'section-20'],
  },
  {
    id: 229,
    section: 20,
    sectionTitle: 'Advanced Tableau',
    category: 'Tableau',
    question: 'What is the difference between Tableau Server and Tableau Online?',
    answer: `Tableau Server is self-hosted on an organization's own
infrastructure. Tableau Online is Tableau's fully managed cloud
version of the same server platform, requiring no in-house hosting.`,
    difficulty: 'Advanced',
    tags: ['tableau', 'section-20'],
  },
  {
    id: 230,
    section: 20,
    sectionTitle: 'Advanced Tableau',
    category: 'Tableau',
    question: 'How would you create a "Top N with Others" view in Tableau?',
    answer: `Use a Set or Top N filter to isolate the top N members by a
measure, then use a calculated field (often with an IF/set condition)
to relabel everything outside that set as "Others" and group them into
a single bar/slice.`,
    difficulty: 'Advanced',
    tags: ['tableau', 'section-20'],
  },
  {
    id: 231,
    section: 21,
    sectionTitle: 'SQL Window Functions & Query Optimization',
    category: 'SQL',
    question: 'What is the difference between LAG() and LEAD()?',
    answer: `LAG() returns the value from a previous row (based on a defined
order), and LEAD() returns the value from a following row — both
commonly used to compare a row to the one before/after it, e.g.
month-over-month change.`,
    sqlCode: `SELECT OrderDate, Amount,
       LAG(Amount) OVER (ORDER BY OrderDate) AS PrevAmount,
       LEAD(Amount) OVER (ORDER BY OrderDate) AS NextAmount
FROM Orders;`,
    difficulty: 'Advanced',
    tags: ['sql', 'section-21'],
  },
  {
    id: 232,
    section: 21,
    sectionTitle: 'SQL Window Functions & Query Optimization',
    category: 'SQL',
    question: 'What is FIRST_VALUE() and LAST_VALUE()?',
    answer: `Window functions that return the first or last value within a
defined window frame/partition — e.g. finding the first purchase amount
for each customer.`,
    sqlCode: `SELECT CustomerID, OrderDate,
       FIRST_VALUE(Amount) OVER (PARTITION BY CustomerID ORDER BY OrderDate) AS FirstOrderAmt
FROM Orders;`,
    difficulty: 'Advanced',
    tags: ['sql', 'section-21'],
  },
  {
    id: 233,
    section: 21,
    sectionTitle: 'SQL Window Functions & Query Optimization',
    category: 'SQL',
    question: 'What is NTILE() used for?',
    answer: `NTILE(n) divides ordered rows into n roughly equal-sized groups
(buckets), commonly used to create quartiles/deciles, e.g. splitting
customers into 4 spending tiers.`,
    sqlCode: `SELECT CustomerID, Amount, NTILE(4) OVER (ORDER BY Amount DESC) AS Quartile
FROM Orders;`,
    difficulty: 'Advanced',
    tags: ['sql', 'section-21'],
  },
  {
    id: 234,
    section: 21,
    sectionTitle: 'SQL Window Functions & Query Optimization',
    category: 'SQL',
    question: 'Explain the ROWS BETWEEN / RANGE BETWEEN frame clause.',
    answer: `It defines exactly which rows within a partition a window
function considers, relative to the current row (e.g. ROWS BETWEEN 2
PRECEDING AND CURRENT ROW for a 3-row moving average). ROWS counts
physical rows; RANGE groups by logical value, treating ties as one unit.`,
    sqlCode: `SELECT OrderDate, Amount,
       AVG(Amount) OVER (ORDER BY OrderDate ROWS BETWEEN 2 PRECEDING AND CURRENT ROW) AS MovingAvg3
FROM Orders;`,
    difficulty: 'Advanced',
    tags: ['sql', 'section-21'],
  },
  {
    id: 235,
    section: 21,
    sectionTitle: 'SQL Window Functions & Query Optimization',
    category: 'SQL',
    question: `What is the difference between a scalar subquery and a
table-valued subquery?`,
    answer: `A scalar subquery returns exactly one value (one row, one
column) and can be used anywhere a single value is expected. A
table-valued (derived table) subquery returns multiple rows/columns and
is used in the FROM clause like a virtual table.`,
    difficulty: 'Advanced',
    tags: ['sql', 'section-21'],
  },
  {
    id: 236,
    section: 21,
    sectionTitle: 'SQL Window Functions & Query Optimization',
    category: 'SQL',
    question: 'What is the difference between EXISTS and IN?',
    answer: `EXISTS checks whether a subquery returns any rows at all (stops
as soon as a match is found, often faster on large subqueries and
handles NULLs safely). IN compares a value against a list/subquery
result and can behave unexpectedly if the subquery returns NULLs.`,
    difficulty: 'Advanced',
    tags: ['sql', 'section-21'],
  },
  {
    id: 237,
    section: 21,
    sectionTitle: 'SQL Window Functions & Query Optimization',
    category: 'SQL',
    question: 'What is a query execution plan?',
    answer: `A breakdown, generated by the database engine, of exactly how a
query will be (or was) executed — which indexes are used, join
algorithms chosen, and estimated costs — used to diagnose performance
issues.`,
    difficulty: 'Advanced',
    tags: ['sql', 'section-21'],
  },
  {
    id: 238,
    section: 21,
    sectionTitle: 'SQL Window Functions & Query Optimization',
    category: 'SQL',
    question: 'What is index seek vs index scan?',
    answer: `An Index Seek directly navigates to the needed rows using an
index (fast, efficient for selective queries). An Index Scan reads the
entire index sequentially (slower, happens when the query isn't
selective enough or the optimizer can't use the index efficiently).`,
    difficulty: 'Advanced',
    tags: ['sql', 'section-21'],
  },
  {
    id: 239,
    section: 21,
    sectionTitle: 'SQL Window Functions & Query Optimization',
    category: 'SQL',
    question: 'What is a covering index?',
    answer: `An index that contains all the columns needed to satisfy a
query (in the index itself or as included columns), letting the
database answer the query without needing to look up the actual table
rows — improving performance.`,
    difficulty: 'Advanced',
    tags: ['sql', 'section-21'],
  },
  {
    id: 240,
    section: 21,
    sectionTitle: 'SQL Window Functions & Query Optimization',
    category: 'SQL',
    question: 'What is query parameter sniffing?',
    answer: `A SQL Server behavior where the optimizer caches an execution
plan based on the parameter values used the FIRST time a query runs,
which can lead to a suboptimal plan being reused for very different
parameter values later.`,
    difficulty: 'Advanced',
    tags: ['sql', 'section-21'],
  },
  {
    id: 241,
    section: 21,
    sectionTitle: 'SQL Window Functions & Query Optimization',
    category: 'SQL',
    question: 'What is deadlock, and how do you avoid it?',
    answer: `A deadlock occurs when two transactions each hold a lock the
other needs, causing both to wait indefinitely; the database typically
kills one automatically. Avoid it by accessing tables/rows in a
consistent order across transactions, keeping transactions short, and
using appropriate isolation levels.`,
    difficulty: 'Advanced',
    tags: ['sql', 'section-21'],
  },
  {
    id: 242,
    section: 21,
    sectionTitle: 'SQL Window Functions & Query Optimization',
    category: 'SQL',
    question: 'What is the difference between clustered index and heap table?',
    answer: `A table with a clustered index has its data physically sorted and
stored in that index's order. A heap table has no clustered index, so
rows are stored in no particular physical order, which can make certain
lookups slower.`,
    difficulty: 'Advanced',
    tags: ['sql', 'section-21'],
  },
  {
    id: 243,
    section: 21,
    sectionTitle: 'SQL Window Functions & Query Optimization',
    category: 'SQL',
    question: `What is the difference between UNION and UNION ALL
performance-wise?`,
    answer: `UNION ALL is generally faster because it simply appends result
sets without checking for duplicates. UNION performs an additional
sort/distinct operation to remove duplicate rows, which adds overhead.`,
    difficulty: 'Advanced',
    tags: ['sql', 'section-21'],
  },
  {
    id: 244,
    section: 21,
    sectionTitle: 'SQL Window Functions & Query Optimization',
    category: 'SQL',
    question: 'What is CROSS APPLY / OUTER APPLY used for (SQL Server)?',
    answer: `APPLY lets you invoke a table-valued expression (often a
correlated subquery or function) for each row of the outer query.
CROSS APPLY behaves like an inner join (drops rows with no result);
OUTER APPLY behaves like a left join (keeps them, with NULLs).`,
    difficulty: 'Advanced',
    tags: ['sql', 'section-21'],
  },
  {
    id: 245,
    section: 21,
    sectionTitle: 'SQL Window Functions & Query Optimization',
    category: 'SQL',
    question: 'How do you find the Nth highest value generically?',
    answer: `Use DENSE_RANK() to rank distinct values, then filter for the
rank equal to N — this generalizes cleanly to any N and handles ties
correctly, unlike LIMIT/OFFSET-based approaches.`,
    sqlCode: `SELECT Salary FROM (
    SELECT Salary, DENSE_RANK() OVER (ORDER BY Salary DESC) AS rnk
    FROM Employees
) t WHERE rnk = 4;  -- change N here`,
    difficulty: 'Advanced',
    tags: ['sql', 'section-21'],
  },
  {
    id: 246,
    section: 22,
    sectionTitle: 'Advanced Python for Data Analysis',
    category: 'Python',
    question: 'What is a Python virtual environment, and why use one?',
    answer: `An isolated Python environment with its own installed packages,
separate from the system-wide installation — used so different
projects can use different (even conflicting) package versions without
interfering with each other.`,
    pythonCode: `python -m venv venv
source venv/bin/activate`,
    difficulty: 'Advanced',
    tags: ['python', 'section-22'],
  },
  {
    id: 247,
    section: 22,
    sectionTitle: 'Advanced Python for Data Analysis',
    category: 'Python',
    question: 'What is the difference between a shallow copy and a deep copy?',
    answer: `A shallow copy creates a new object but still references the
same nested objects inside it (changes to nested data affect both). A
deep copy recursively copies everything, so the two objects are
completely independent.`,
    pythonCode: `import copy
shallow = copy.copy(original)
deep = copy.deepcopy(original)`,
    difficulty: 'Advanced',
    tags: ['python', 'section-22'],
  },
  {
    id: 248,
    section: 22,
    sectionTitle: 'Advanced Python for Data Analysis',
    category: 'Python',
    question: 'What are Python decorators?',
    answer: `Functions that wrap another function to add extra behavior
(logging, timing, access control) without modifying the original
function's code, applied using the @decorator_name syntax above a
function definition.`,
    difficulty: 'Advanced',
    tags: ['python', 'section-22'],
  },
  {
    id: 249,
    section: 22,
    sectionTitle: 'Advanced Python for Data Analysis',
    category: 'Python',
    question: 'What is list comprehension, and give an example.',
    answer: `A concise way to create a list by applying an expression to each
item in an iterable, optionally with a filter condition, in a single
readable line instead of a multi-line for-loop.`,
    pythonCode: 'squares = [x**2 for x in range(10) if x % 2 == 0]',
    difficulty: 'Advanced',
    tags: ['python', 'section-22'],
  },
  {
    id: 250,
    section: 22,
    sectionTitle: 'Advanced Python for Data Analysis',
    category: 'Python',
    question: 'What is the difference between a generator and a list?',
    answer: `A list stores all its values in memory at once. A generator
produces values one at a time, lazily, only when requested — much more
memory-efficient for large or infinite sequences.`,
    pythonCode: 'gen = (x**2 for x in range(1000000))  -- generator expression',
    difficulty: 'Advanced',
    tags: ['python', 'section-22'],
  },
  {
    id: 251,
    section: 22,
    sectionTitle: 'Advanced Python for Data Analysis',
    category: 'Python',
    question: 'What is the GIL (Global Interpreter Lock)?',
    answer: `A mechanism in CPython that allows only one thread to execute
Python bytecode at a time, meaning multi-threading doesn't achieve true
parallelism for CPU-bound tasks in Python (multiprocessing is used
instead for that).`,
    difficulty: 'Advanced',
    tags: ['python', 'section-22'],
  },
  {
    id: 252,
    section: 22,
    sectionTitle: 'Advanced Python for Data Analysis',
    category: 'Python',
    question: `What is the difference between Pandas pivot_table() and
groupby()?`,
    answer: `groupby() groups rows and applies an aggregation, returning a
long-format result. pivot_table() does grouping AND aggregation while
also reshaping the result into a wide, spreadsheet-style table with
rows/columns/values — essentially a groupby with a built-in reshape.`,
    pythonCode: 'df.pivot_table(index="Region", columns="Product", values="Sales", aggfunc="sum")',
    difficulty: 'Advanced',
    tags: ['python', 'section-22'],
  },
  {
    id: 253,
    section: 22,
    sectionTitle: 'Advanced Python for Data Analysis',
    category: 'Python',
    question: 'What is the melt() function in Pandas used for?',
    answer: `melt() reshapes a wide DataFrame into a long ("tidy") format,
turning multiple columns into rows — the opposite of pivot_table().`,
    pythonCode: 'pd.melt(df, id_vars=["CustomerID"], value_vars=["Jan","Feb","Mar"])',
    difficulty: 'Advanced',
    tags: ['python', 'section-22'],
  },
  {
    id: 254,
    section: 22,
    sectionTitle: 'Advanced Python for Data Analysis',
    category: 'Python',
    question: 'How do you detect and remove outliers using Pandas/NumPy?',
    answer: `Use the IQR method or Z-score to flag values outside an
acceptable range, then filter them out.`,
    pythonCode: `Q1, Q3 = df["Salary"].quantile([0.25, 0.75])
IQR = Q3 - Q1
df_clean = df[(df["Salary"] >= Q1 - 1.5*IQR) & (df["Salary"] <= Q3 + 1.5*IQR)]`,
    difficulty: 'Advanced',
    tags: ['python', 'section-22'],
  },
  {
    id: 255,
    section: 22,
    sectionTitle: 'Advanced Python for Data Analysis',
    category: 'Python',
    question: 'What is broadcasting in NumPy?',
    answer: `A mechanism that lets NumPy perform element-wise operations
between arrays of different (but compatible) shapes without explicitly
copying data — e.g. adding a single number to every element of an
array automatically.`,
    pythonCode: `arr = np.array([1, 2, 3])
result = arr + 10  -- 10 is "broadcast" to each element`,
    difficulty: 'Advanced',
    tags: ['python', 'section-22'],
  },
  {
    id: 256,
    section: 22,
    sectionTitle: 'Advanced Python for Data Analysis',
    category: 'Python',
    question: 'What is the difference between axis=0 and axis=1 in Pandas?',
    answer: `axis=0 refers to operations performed down the rows (column-wise
aggregation, e.g. df.sum(axis=0) sums each column). axis=1 refers to
operations performed across columns (row-wise aggregation, e.g.
df.sum(axis=1) sums each row).`,
    difficulty: 'Advanced',
    tags: ['python', 'section-22'],
  },
  {
    id: 257,
    section: 22,
    sectionTitle: 'Advanced Python for Data Analysis',
    category: 'Python',
    question: 'How do you merge datasets with different key names in Pandas?',
    answer: `Use the left_on and right_on parameters of merge() to specify
different column names to join on from each DataFrame.`,
    pythonCode: 'pd.merge(df1, df2, left_on="CustID", right_on="CustomerID", how="left")',
    difficulty: 'Advanced',
    tags: ['python', 'section-22'],
  },
  {
    id: 258,
    section: 22,
    sectionTitle: 'Advanced Python for Data Analysis',
    category: 'Python',
    question: 'What is a MultiIndex in Pandas?',
    answer: `A hierarchical index with multiple levels on rows and/or columns,
allowing higher-dimensional data to be represented in a 2D DataFrame,
commonly produced by groupby() with multiple keys or pivot_table().`,
    difficulty: 'Advanced',
    tags: ['python', 'section-22'],
  },
  {
    id: 259,
    section: 22,
    sectionTitle: 'Advanced Python for Data Analysis',
    category: 'Python',
    question: 'How would you profile/speed up a slow Pandas script?',
    answer: `Use vectorized operations instead of row-wise loops/apply()
where possible, avoid unnecessary copies, use appropriate dtypes
(e.g. category for repeated strings), read only needed columns, and
profile with tools like %timeit or cProfile to find the actual
bottleneck before optimizing.`,
    difficulty: 'Advanced',
    tags: ['python', 'section-22'],
  },
  {
    id: 260,
    section: 22,
    sectionTitle: 'Advanced Python for Data Analysis',
    category: 'Python',
    question: `What is the difference between .values, .to_numpy(), and
.tolist() in Pandas?`,
    answer: `.values and .to_numpy() both return the underlying data as a
NumPy array (.to_numpy() is the newer, more explicit, recommended
method). .tolist() converts the data into a native Python list instead
of a NumPy array.`,
    difficulty: 'Advanced',
    tags: ['python', 'section-22'],
  },
  {
    id: 261,
    section: 23,
    sectionTitle: 'Advanced / Business Statistics',
    category: 'Statistics',
    question: `What is the difference between one-tailed and two-tailed
hypothesis tests?`,
    answer: `A one-tailed test checks for an effect in only ONE specific
direction (e.g. "is the new version better?"). A two-tailed test
checks for a difference in EITHER direction (e.g. "is the new version
different, better or worse?").`,
    difficulty: 'Advanced',
    tags: ['statistics', 'section-23'],
  },
  {
    id: 262,
    section: 23,
    sectionTitle: 'Advanced / Business Statistics',
    category: 'Statistics',
    question: 'What is a Chi-Square test used for?',
    answer: `A statistical test used to determine whether there's a
significant association between two categorical variables (e.g. does
gender relate to product preference?), by comparing observed vs
expected frequencies.`,
    difficulty: 'Advanced',
    tags: ['statistics', 'section-23'],
  },
  {
    id: 263,
    section: 23,
    sectionTitle: 'Advanced / Business Statistics',
    category: 'Statistics',
    question: 'What is ANOVA?',
    answer: `Analysis of Variance — a statistical test used to compare the
means of three or more groups at once to see if at least one group's
mean is significantly different from the others.`,
    difficulty: 'Advanced',
    tags: ['statistics', 'section-23'],
  },
  {
    id: 264,
    section: 23,
    sectionTitle: 'Advanced / Business Statistics',
    category: 'Statistics',
    question: `What is the difference between parametric and non-parametric
tests?`,
    answer: `Parametric tests (e.g. t-test, ANOVA) assume the data follows a
specific distribution (usually normal) and estimate parameters like
mean/variance. Non-parametric tests (e.g. Chi-Square, Mann-Whitney U)
make fewer assumptions about the underlying distribution.`,
    difficulty: 'Advanced',
    tags: ['statistics', 'section-23'],
  },
  {
    id: 265,
    section: 23,
    sectionTitle: 'Advanced / Business Statistics',
    category: 'Statistics',
    question: 'What is Multicollinearity?',
    answer: `A situation in regression analysis where two or more independent
variables are highly correlated with each other, making it difficult
to isolate each variable's individual effect on the outcome and
destabilizing coefficient estimates.`,
    difficulty: 'Advanced',
    tags: ['statistics', 'section-23'],
  },
  {
    id: 266,
    section: 23,
    sectionTitle: 'Advanced / Business Statistics',
    category: 'Statistics',
    question: 'What is R-squared, and what does it tell you?',
    answer: `A statistic (0 to 1) that represents the proportion of variance
in the dependent variable explained by the independent variable(s) in a
regression model — higher generally means a better fit, but doesn't
imply causation or that the model is correctly specified.`,
    difficulty: 'Advanced',
    tags: ['statistics', 'section-23'],
  },
  {
    id: 267,
    section: 23,
    sectionTitle: 'Advanced / Business Statistics',
    category: 'Statistics',
    question: 'What is the difference between R-squared and Adjusted R-squared?',
    answer: `R-squared always increases (or stays the same) as more predictors
are added, even useless ones. Adjusted R-squared penalizes adding
predictors that don't meaningfully improve the model, making it more
reliable for comparing models with different numbers of variables.`,
    difficulty: 'Advanced',
    tags: ['statistics', 'section-23'],
  },
  {
    id: 268,
    section: 23,
    sectionTitle: 'Advanced / Business Statistics',
    category: 'Statistics',
    question: 'What is Heteroscedasticity?',
    answer: `A pattern where the variability (spread) of a regression model's
errors is not constant across all levels of the independent variable —
violates a key regression assumption and can make standard errors
unreliable.`,
    difficulty: 'Advanced',
    tags: ['statistics', 'section-23'],
  },
  {
    id: 269,
    section: 23,
    sectionTitle: 'Advanced / Business Statistics',
    category: 'Statistics',
    question: 'What is Time Series Seasonality vs Trend?',
    answer: `Trend is the long-term upward or downward movement in data over
time. Seasonality is a regular, predictable pattern that repeats at
fixed intervals (e.g. higher retail sales every December).`,
    difficulty: 'Advanced',
    tags: ['statistics', 'section-23'],
  },
  {
    id: 270,
    section: 23,
    sectionTitle: 'Advanced / Business Statistics',
    category: 'Statistics',
    question: 'What is Moving Average, and why is it used?',
    answer: `An average recalculated over a sliding window of recent data
points (e.g. a 7-day moving average), used to smooth out short-term
fluctuations/noise and reveal the underlying trend.`,
    difficulty: 'Advanced',
    tags: ['statistics', 'section-23'],
  },
  {
    id: 271,
    section: 23,
    sectionTitle: 'Advanced / Business Statistics',
    category: 'Statistics',
    question: 'What is the Pareto Principle (80/20 rule) in data analysis?',
    answer: `The observation that roughly 80% of outcomes often come from 20%
of causes (e.g. 80% of revenue from 20% of customers) — used to help
prioritize where analysis or business focus will have the most impact.`,
    difficulty: 'Advanced',
    tags: ['statistics', 'section-23'],
  },
  {
    id: 272,
    section: 23,
    sectionTitle: 'Advanced / Business Statistics',
    category: 'Statistics',
    question: 'What is Cohort Analysis?',
    answer: `A technique that groups users/customers by a shared starting
point (e.g. signup month) and tracks their behavior over time,
commonly used to measure retention.`,
    difficulty: 'Advanced',
    tags: ['statistics', 'section-23'],
  },
  {
    id: 273,
    section: 23,
    sectionTitle: 'Advanced / Business Statistics',
    category: 'Statistics',
    question: 'What is Survivorship Bias?',
    answer: `A logical error that occurs when analysis only considers
"survivors" (e.g. currently active customers, successful companies)
while ignoring those that dropped out or failed, leading to overly
optimistic or misleading conclusions.`,
    difficulty: 'Advanced',
    tags: ['statistics', 'section-23'],
  },
  {
    id: 274,
    section: 23,
    sectionTitle: 'Advanced / Business Statistics',
    category: 'Statistics',
    question: 'What is Simpson\'s Paradox?',
    answer: `A phenomenon where a trend appears in several different groups of
data but disappears or reverses when those groups are combined —
usually caused by a lurking/confounding variable.`,
    difficulty: 'Advanced',
    tags: ['statistics', 'section-23'],
  },
  {
    id: 275,
    section: 23,
    sectionTitle: 'Advanced / Business Statistics',
    category: 'Statistics',
    question: 'What is the difference between Leading and Lagging indicators?',
    answer: `A Leading indicator predicts future performance (e.g. website
traffic predicting future sales). A Lagging indicator reflects past
performance after the fact (e.g. quarterly revenue).`,
    difficulty: 'Advanced',
    tags: ['statistics', 'section-23'],
  },
  {
    id: 276,
    section: 24,
    sectionTitle: 'Data Warehousing, ETL & Data Pipelines',
    category: 'Data Governance',
    question: 'What is a Data Pipeline?',
    answer: `An automated series of steps that moves data from one or more
sources through processing/transformation stages into a destination
system (e.g. a data warehouse), typically run on a schedule or trigger.`,
    difficulty: 'Advanced',
    tags: ['data governance', 'section-24'],
  },
  {
    id: 277,
    section: 24,
    sectionTitle: 'Data Warehousing, ETL & Data Pipelines',
    category: 'Data Governance',
    question: `What is the difference between Batch processing and
Streaming/real-time processing?`,
    answer: `Batch processing handles data in large chunks at scheduled
intervals (e.g. nightly ETL jobs). Streaming processing handles data
continuously as it arrives, with near-instant results (e.g. live
transaction monitoring).`,
    difficulty: 'Advanced',
    tags: ['data governance', 'section-24'],
  },
  {
    id: 278,
    section: 24,
    sectionTitle: 'Data Warehousing, ETL & Data Pipelines',
    category: 'Data Governance',
    question: 'What is a Staging Area in ETL?',
    answer: `An intermediate storage area where raw data is temporarily loaded
from source systems before being cleaned, transformed, and moved into
the final target tables — isolates raw extraction from transformation
logic.`,
    difficulty: 'Advanced',
    tags: ['data governance', 'section-24'],
  },
  {
    id: 279,
    section: 24,
    sectionTitle: 'Data Warehousing, ETL & Data Pipelines',
    category: 'Data Governance',
    question: 'What is Data Partitioning, and why is it used?',
    answer: `Splitting a large table into smaller, more manageable pieces
(commonly by date range) so queries can scan only the relevant
partitions instead of the entire table, improving performance.`,
    difficulty: 'Advanced',
    tags: ['data governance', 'section-24'],
  },
  {
    id: 280,
    section: 24,
    sectionTitle: 'Data Warehousing, ETL & Data Pipelines',
    category: 'Data Governance',
    question: 'What is Slowly Changing Dimension (SCD), and what are its types?',
    answer: `A technique for handling changes to dimension data (e.g. a
customer's address changing) over time in a data warehouse.
Type 1: overwrite the old value (no history kept).
Type 2: keep history by adding a new row with effective dates.
Type 3: keep limited history in additional columns (e.g. "previous
value").`,
    difficulty: 'Advanced',
    tags: ['data governance', 'section-24'],
  },
  {
    id: 281,
    section: 24,
    sectionTitle: 'Data Warehousing, ETL & Data Pipelines',
    category: 'Data Governance',
    question: `What is Snowflake Schema, and how does it differ from Star
Schema?`,
    answer: `A Snowflake Schema normalizes dimension tables into multiple
related sub-tables (reducing redundancy but requiring more joins). A
Star Schema keeps dimension tables flat and denormalized, prioritizing
simpler, faster queries.`,
    difficulty: 'Advanced',
    tags: ['data governance', 'section-24'],
  },
  {
    id: 282,
    section: 24,
    sectionTitle: 'Data Warehousing, ETL & Data Pipelines',
    category: 'Data Governance',
    question: 'What is a Surrogate Key vs Natural Key?',
    answer: `A Natural Key is a business-meaningful identifier already present
in the source data (e.g. an email address). A Surrogate Key is an
artificial, system-generated key (often a simple integer) used
internally in the warehouse, independent of any business meaning.`,
    difficulty: 'Advanced',
    tags: ['data governance', 'section-24'],
  },
  {
    id: 283,
    section: 24,
    sectionTitle: 'Data Warehousing, ETL & Data Pipelines',
    category: 'Data Governance',
    question: 'What is Change Data Capture (CDC)?',
    answer: `A technique for identifying and capturing only the rows that have
changed (inserted, updated, deleted) in a source system since the last
extraction, rather than reloading the entire dataset each time.`,
    difficulty: 'Advanced',
    tags: ['data governance', 'section-24'],
  },
  {
    id: 284,
    section: 24,
    sectionTitle: 'Data Warehousing, ETL & Data Pipelines',
    category: 'Data Governance',
    question: 'What is Data Deduplication in a pipeline context?',
    answer: `The process of identifying and removing duplicate records as data
flows through a pipeline, often based on matching keys or fuzzy
matching rules, to ensure downstream tables/reports aren't inflated.`,
    difficulty: 'Advanced',
    tags: ['data governance', 'section-24'],
  },
  {
    id: 285,
    section: 24,
    sectionTitle: 'Data Warehousing, ETL & Data Pipelines',
    category: 'Data Governance',
    question: 'What is idempotency in a data pipeline, and why does it matter?',
    answer: `A pipeline is idempotent if running it multiple times with the
same input produces the same result without creating duplicates or
errors — important because pipelines often need to be safely re-run
after failures.`,
    difficulty: 'Advanced',
    tags: ['data governance', 'section-24'],
  },
  {
    id: 286,
    section: 24,
    sectionTitle: 'Data Warehousing, ETL & Data Pipelines',
    category: 'Data Governance',
    question: 'What are common cloud data warehouse platforms?',
    answer: `Examples include Snowflake, Google BigQuery, Amazon Redshift, and
Azure Synapse Analytics — all designed for large-scale analytical
(OLAP) workloads in the cloud.`,
    difficulty: 'Advanced',
    tags: ['data governance', 'section-24'],
  },
  {
    id: 287,
    section: 24,
    sectionTitle: 'Data Warehousing, ETL & Data Pipelines',
    category: 'Data Governance',
    question: 'What is Apache Airflow used for?',
    answer: `An open-source platform for programmatically authoring,
scheduling, and monitoring data pipelines/workflows, represented as
DAGs (Directed Acyclic Graphs) of tasks.`,
    difficulty: 'Advanced',
    tags: ['data governance', 'section-24'],
  },
  {
    id: 288,
    section: 24,
    sectionTitle: 'Data Warehousing, ETL & Data Pipelines',
    category: 'Data Governance',
    question: `What is a Data Lake, and how does it differ from a Data
Warehouse?`,
    answer: `A Data Lake stores raw data in its native format (structured,
semi-structured, unstructured) at large scale, with schema applied
only when read. A Data Warehouse stores structured, cleaned, schema-
enforced data optimized for reporting and analysis.`,
    difficulty: 'Advanced',
    tags: ['data governance', 'section-24'],
  },
  {
    id: 289,
    section: 24,
    sectionTitle: 'Data Warehousing, ETL & Data Pipelines',
    category: 'Data Governance',
    question: 'What is Data Latency, and why does it matter for reporting?',
    answer: `The delay between when an event happens in a source system and
when it's reflected in the reporting/analytics layer — matters because
high latency can mean decisions are made on stale data.`,
    difficulty: 'Advanced',
    tags: ['data governance', 'section-24'],
  },
  {
    id: 290,
    section: 24,
    sectionTitle: 'Data Warehousing, ETL & Data Pipelines',
    category: 'Data Governance',
    question: 'What is a Schema-on-Read vs Schema-on-Write approach?',
    answer: `Schema-on-Write enforces structure when data is loaded (typical
of data warehouses). Schema-on-Read stores raw data as-is and applies
structure only when it's queried/read (typical of data lakes),
offering more flexibility but less upfront validation.`,
    difficulty: 'Advanced',
    tags: ['data governance', 'section-24'],
  },
  {
    id: 291,
    section: 25,
    sectionTitle: 'Data Privacy, Compliance & Governance',
    category: 'Data Governance',
    question: 'What is GDPR, and why does it matter for data analysts?',
    answer: `The General Data Protection Regulation is an EU law governing how
personal data of EU residents is collected, processed, and stored. It
matters because analysts must ensure data handling (e.g. reports,
exports, retention) complies with consent, minimization, and
right-to-access/erasure requirements.`,
    difficulty: 'Advanced',
    tags: ['data governance', 'section-25'],
  },
  {
    id: 292,
    section: 25,
    sectionTitle: 'Data Privacy, Compliance & Governance',
    category: 'Data Governance',
    question: 'What is PII (Personally Identifiable Information)?',
    answer: `Any data that can be used, alone or combined with other data, to
identify a specific individual — e.g. name, email, phone number,
national ID, or IP address — requiring special handling and protection.`,
    difficulty: 'Advanced',
    tags: ['data governance', 'section-25'],
  },
  {
    id: 293,
    section: 25,
    sectionTitle: 'Data Privacy, Compliance & Governance',
    category: 'Data Governance',
    question: 'What is Data Anonymization vs Data Masking?',
    answer: `Anonymization permanently and irreversibly removes identifying
information so individuals can't be re-identified. Masking obscures
sensitive data (e.g. showing only the last 4 digits of a card number)
but may be reversible with proper authorization, often used in
non-production environments.`,
    difficulty: 'Advanced',
    tags: ['data governance', 'section-25'],
  },
  {
    id: 294,
    section: 25,
    sectionTitle: 'Data Privacy, Compliance & Governance',
    category: 'Data Governance',
    question: 'What is the Right to be Forgotten?',
    answer: `A GDPR provision giving individuals the right to request that
their personal data be deleted from an organization's systems, subject
to certain legal exceptions.`,
    difficulty: 'Advanced',
    tags: ['data governance', 'section-25'],
  },
  {
    id: 295,
    section: 25,
    sectionTitle: 'Data Privacy, Compliance & Governance',
    category: 'Data Governance',
    question: 'What is Data Retention Policy?',
    answer: `A defined set of rules stating how long different types of data
should be kept before being archived or deleted, balancing business/
legal needs against privacy and storage cost considerations.`,
    difficulty: 'Advanced',
    tags: ['data governance', 'section-25'],
  },
  {
    id: 296,
    section: 25,
    sectionTitle: 'Data Privacy, Compliance & Governance',
    category: 'Data Governance',
    question: 'What is Role-Based Access Control (RBAC)?',
    answer: `A security model where data/system access permissions are
assigned based on a user's role (e.g. Analyst, Manager, Admin) rather
than to each individual separately, simplifying and standardizing
access management.`,
    difficulty: 'Advanced',
    tags: ['data governance', 'section-25'],
  },
  {
    id: 297,
    section: 25,
    sectionTitle: 'Data Privacy, Compliance & Governance',
    category: 'Data Governance',
    question: `What is a Data Breach, and what is an analyst's responsibility
if they notice one?`,
    answer: `A Data Breach is unauthorized access, exposure, or loss of
sensitive data. If an analyst notices signs of one (e.g. exposed PII in
a shared file), they should report it immediately to the appropriate
security/compliance team rather than attempting to fix or hide it
themselves.`,
    difficulty: 'Advanced',
    tags: ['data governance', 'section-25'],
  },
  {
    id: 298,
    section: 25,
    sectionTitle: 'Data Privacy, Compliance & Governance',
    category: 'Data Governance',
    question: `What is Data Classification (public/internal/confidential/
restricted)?`,
    answer: `The practice of categorizing data based on its sensitivity level,
which then determines what access controls, encryption, and handling
rules apply to it.`,
    difficulty: 'Advanced',
    tags: ['data governance', 'section-25'],
  },
  {
    id: 299,
    section: 25,
    sectionTitle: 'Data Privacy, Compliance & Governance',
    category: 'Data Governance',
    question: 'What is HIPAA, and when is it relevant?',
    answer: `The Health Insurance Portability and Accountability Act is a US
law protecting patient health information. It's relevant for analysts
working with healthcare data, requiring strict controls on how such
data is stored, shared, and reported.`,
    difficulty: 'Advanced',
    tags: ['data governance', 'section-25'],
  },
  {
    id: 300,
    section: 25,
    sectionTitle: 'Data Privacy, Compliance & Governance',
    category: 'Data Governance',
    question: 'What is the difference between Data Privacy and Data Security?',
    answer: `Data Privacy concerns the appropriate collection, use, and
sharing of personal data (the "should we" question, often governed by
policy/law). Data Security concerns protecting data from unauthorized
access or breaches (the "can they" question, addressed through
technical controls).`,
    difficulty: 'Advanced',
    tags: ['data governance', 'section-25'],
  },
  {
    id: 301,
    section: 26,
    sectionTitle: 'Advanced Power BI & DAX',
    category: 'Power BI',
    question: 'What is the CALCULATE() function in DAX?',
    answer: `One of the most powerful DAX functions — it evaluates an
expression while modifying the filter context (adding, removing, or
overriding filters), e.g. calculating sales for a specific category
regardless of what's selected on the report page.
Sales_Electronics = CALCULATE(SUM(Sales[Amount]), Sales[Category] = "Electronics")`,
    difficulty: 'Advanced',
    tags: ['power bi', 'section-26'],
  },
  {
    id: 302,
    section: 26,
    sectionTitle: 'Advanced Power BI & DAX',
    category: 'Power BI',
    question: 'What is Filter Context vs Row Context in DAX?',
    answer: `Row Context evaluates a formula one row at a time (as in
calculated columns). Filter Context is the set of filters currently
applied to a calculation (from slicers, rows/columns in a visual, or
CALCULATE) that determines which rows are included when a measure is
evaluated.`,
    difficulty: 'Advanced',
    tags: ['power bi', 'section-26'],
  },
  {
    id: 303,
    section: 26,
    sectionTitle: 'Advanced Power BI & DAX',
    category: 'Power BI',
    question: 'What is the difference between SUMX and SUM?',
    answer: `SUM simply adds up values in a single column. SUMX is an
iterator that evaluates an expression row-by-row across a table and
then sums the results — needed when the calculation itself (not just
the column) varies per row, e.g. SUMX(Sales, Sales[Qty] * Sales[Price]).`,
    difficulty: 'Advanced',
    tags: ['power bi', 'section-26'],
  },
  {
    id: 304,
    section: 26,
    sectionTitle: 'Advanced Power BI & DAX',
    category: 'Power BI',
    question: 'What are Time Intelligence functions in DAX?',
    answer: `Built-in DAX functions (e.g. TOTALYTD, SAMEPERIODLASTYEAR,
DATEADD) that make date-based calculations like year-to-date, prior
period comparisons, and rolling totals much easier, provided a proper
Date table is in the model.`,
    difficulty: 'Advanced',
    tags: ['power bi', 'section-26'],
  },
  {
    id: 305,
    section: 26,
    sectionTitle: 'Advanced Power BI & DAX',
    category: 'Power BI',
    question: 'What is a Bridge Table in Power BI?',
    answer: `A table used to resolve many-to-many relationships between two
other tables, acting as an intermediary that both tables relate to
individually.`,
    difficulty: 'Advanced',
    tags: ['power bi', 'section-26'],
  },
  {
    id: 306,
    section: 26,
    sectionTitle: 'Advanced Power BI & DAX',
    category: 'Power BI',
    question: `What is the difference between a One-to-Many and Many-to-Many
relationship in Power BI?`,
    answer: `One-to-Many means one row in a table (e.g. Product) can relate to
many rows in another (e.g. Sales) — the standard, preferred
relationship type. Many-to-Many means rows on both sides can relate to
multiple rows on the other side, which is more complex to model
correctly and can affect performance.`,
    difficulty: 'Advanced',
    tags: ['power bi', 'section-26'],
  },
  {
    id: 307,
    section: 26,
    sectionTitle: 'Advanced Power BI & DAX',
    category: 'Power BI',
    question: 'What is a Bookmark in Power BI?',
    answer: `A saved snapshot of a report page's current state (filters,
visibility, sort order) that can be recalled with a click — often used
to build interactive navigation or toggle between views.`,
    difficulty: 'Advanced',
    tags: ['power bi', 'section-26'],
  },
  {
    id: 308,
    section: 26,
    sectionTitle: 'Advanced Power BI & DAX',
    category: 'Power BI',
    question: 'What are Power BI Dataflows?',
    answer: `Reusable, cloud-based ETL processes (built with Power Query
Online) that extract, clean, and transform data once, so multiple
reports/datasets can reuse the same prepared data instead of
duplicating transformation logic.`,
    difficulty: 'Advanced',
    tags: ['power bi', 'section-26'],
  },
  {
    id: 309,
    section: 26,
    sectionTitle: 'Advanced Power BI & DAX',
    category: 'Power BI',
    question: 'What is the Q&A / natural language query feature in Power BI?',
    answer: `A feature that lets users type plain-language questions (e.g.
"total sales by region last quarter") and have Power BI automatically
generate a matching visual from the underlying data model.`,
    difficulty: 'Advanced',
    tags: ['power bi', 'section-26'],
  },
  {
    id: 310,
    section: 26,
    sectionTitle: 'Advanced Power BI & DAX',
    category: 'Power BI',
    question: `What is the difference between a Report and a Dashboard in Power
BI Service?`,
    answer: `A Report is a multi-page, interactive set of visuals built from
one dataset, with full filtering/drill-down. A Dashboard is a
single-page collection of pinned visuals (called tiles), which can pull
from multiple reports/datasets, but with more limited interactivity.`,
    difficulty: 'Advanced',
    tags: ['power bi', 'section-26'],
  },
  {
    id: 311,
    section: 27,
    sectionTitle: 'Business Analytics & KPI Frameworks',
    category: 'General',
    question: 'What is Churn Rate, and how is it calculated?',
    answer: `The percentage of customers (or revenue) lost over a given
period. Formula: Churn Rate = (Customers Lost During Period / Customers
at Start of Period) × 100.`,
    difficulty: 'Advanced',
    tags: ['general', 'section-27'],
  },
  {
    id: 312,
    section: 27,
    sectionTitle: 'Business Analytics & KPI Frameworks',
    category: 'General',
    question: 'What is Net Promoter Score (NPS)?',
    answer: `A customer loyalty metric based on the question "How likely are
you to recommend us?" (0-10 scale). Respondents are grouped into
Promoters (9-10), Passives (7-8), and Detractors (0-6); NPS = %
Promoters − % Detractors.`,
    difficulty: 'Advanced',
    tags: ['general', 'section-27'],
  },
  {
    id: 313,
    section: 27,
    sectionTitle: 'Business Analytics & KPI Frameworks',
    category: 'General',
    question: 'What is Customer Acquisition Cost (CAC)?',
    answer: `The average cost of acquiring one new customer, calculated as
Total Sales & Marketing Spend ÷ Number of New Customers Acquired over a
period.`,
    difficulty: 'Advanced',
    tags: ['general', 'section-27'],
  },
  {
    id: 314,
    section: 27,
    sectionTitle: 'Business Analytics & KPI Frameworks',
    category: 'General',
    question: `What is Customer Lifetime Value (CLV) and how is it typically
calculated?`,
    answer: `The total revenue/profit a business expects from a customer over
the entire relationship. A common simple formula: CLV = Average
Purchase Value × Purchase Frequency × Average Customer Lifespan.`,
    difficulty: 'Advanced',
    tags: ['general', 'section-27'],
  },
  {
    id: 315,
    section: 27,
    sectionTitle: 'Business Analytics & KPI Frameworks',
    category: 'General',
    question: 'What is the difference between Gross Margin and Net Margin?',
    answer: `Gross Margin = (Revenue − Cost of Goods Sold) / Revenue, showing
profitability before operating expenses. Net Margin = Net Profit /
Revenue, showing profitability after ALL expenses, taxes, and interest.`,
    difficulty: 'Advanced',
    tags: ['general', 'section-27'],
  },
  {
    id: 316,
    section: 27,
    sectionTitle: 'Business Analytics & KPI Frameworks',
    category: 'General',
    question: 'What is Conversion Rate Optimization (CRO)?',
    answer: `The practice of analyzing and testing changes to a website/app
(layout, copy, flow) to increase the percentage of visitors who
complete a desired action, such as a purchase or signup.`,
    difficulty: 'Advanced',
    tags: ['general', 'section-27'],
  },
  {
    id: 317,
    section: 27,
    sectionTitle: 'Business Analytics & KPI Frameworks',
    category: 'General',
    question: 'What is a Funnel Analysis?',
    answer: `An analysis that tracks how users move through a sequence of
steps toward a goal (e.g. Visit → Add to Cart → Checkout → Purchase),
identifying where the largest drop-offs occur.`,
    difficulty: 'Advanced',
    tags: ['general', 'section-27'],
  },
  {
    id: 318,
    section: 27,
    sectionTitle: 'Business Analytics & KPI Frameworks',
    category: 'General',
    question: 'What is Cohort Retention?',
    answer: `The percentage of users from a specific starting cohort (e.g.
signed up in January) who remain active at subsequent points in time
(Week 1, Week 2, Month 1, etc.), used to measure how "sticky" a product
is.`,
    difficulty: 'Advanced',
    tags: ['general', 'section-27'],
  },
  {
    id: 319,
    section: 27,
    sectionTitle: 'Business Analytics & KPI Frameworks',
    category: 'General',
    question: 'What is the North Star Metric?',
    answer: `A single metric that best captures the core value a product
delivers to customers, chosen as the primary focus for teams to align
around (e.g. "weekly active users" for a social app).`,
    difficulty: 'Advanced',
    tags: ['general', 'section-27'],
  },
  {
    id: 320,
    section: 27,
    sectionTitle: 'Business Analytics & KPI Frameworks',
    category: 'General',
    question: `What is the difference between Leading Indicators and Vanity
Metrics?`,
    answer: `Leading indicators predict future outcomes and can inform action
(e.g. trial signups predicting future revenue). Vanity metrics look
impressive (e.g. total downloads) but don't reliably connect to
business outcomes or actionable decisions.`,
    difficulty: 'Advanced',
    tags: ['general', 'section-27'],
  },
  {
    id: 321,
    section: 27,
    sectionTitle: 'Business Analytics & KPI Frameworks',
    category: 'General',
    question: 'What is Market Basket Analysis?',
    answer: `A technique that analyzes which products are frequently
purchased together (association rules, e.g. "customers who buy bread
often buy butter"), commonly used for cross-selling and store layout
decisions.`,
    difficulty: 'Advanced',
    tags: ['general', 'section-27'],
  },
  {
    id: 322,
    section: 27,
    sectionTitle: 'Business Analytics & KPI Frameworks',
    category: 'General',
    question: 'What is RFM Analysis (Recency, Frequency, Monetary)?',
    answer: `A customer segmentation technique scoring customers on how
Recently they purchased, how Frequently they purchase, and how much
Money they spend — used to identify high-value, at-risk, or loyal
customer segments.`,
    difficulty: 'Advanced',
    tags: ['general', 'section-27'],
  },
  {
    id: 323,
    section: 27,
    sectionTitle: 'Business Analytics & KPI Frameworks',
    category: 'General',
    question: 'What is Year-over-Year (YoY) vs Month-over-Month (MoM) analysis?',
    answer: `YoY compares a metric to the same period one year earlier
(accounts for seasonality). MoM compares a metric to the immediately
preceding month (shows short-term momentum but can be noisy/seasonal).`,
    difficulty: 'Advanced',
    tags: ['general', 'section-27'],
  },
  {
    id: 324,
    section: 27,
    sectionTitle: 'Business Analytics & KPI Frameworks',
    category: 'General',
    question: 'What is Benchmarking in business analytics?',
    answer: `Comparing a company's metrics/performance against industry
standards, competitors, or its own historical performance to assess
how well it's doing and identify improvement areas.`,
    difficulty: 'Advanced',
    tags: ['general', 'section-27'],
  },
  {
    id: 325,
    section: 27,
    sectionTitle: 'Business Analytics & KPI Frameworks',
    category: 'General',
    question: 'What is the Balanced Scorecard framework?',
    answer: `A strategic performance management framework that tracks an
organization's goals across four perspectives — Financial, Customer,
Internal Process, and Learning & Growth — rather than financial metrics
alone.
(Sample talking points — tailor with your own real examples)`,
    difficulty: 'Advanced',
    tags: ['general', 'section-27'],
  },
  {
    id: 326,
    section: 28,
    sectionTitle: 'Behavioral & Career Development Questions',
    category: 'Behavioral',
    question: 'Why do you want to work as a Data Analyst?',
    answer: `Sample answer: "I enjoy the mix of technical problem-solving and
business impact — taking raw, messy data and turning it into something
that directly informs a decision. My background combining ERP
development (D365 F&O/X++) with data analysis tools like SQL, Tableau,
and Collibra gives me a practical, end-to-end view of how data moves
from source systems into insights."`,
    difficulty: 'Advanced',
    tags: ['behavioral', 'section-28'],
  },
  {
    id: 327,
    section: 28,
    sectionTitle: 'Behavioral & Career Development Questions',
    category: 'Behavioral',
    question: 'What is your greatest strength as a Data Analyst?',
    answer: `Sample answer: "Attention to detail combined with persistence in
tracing data issues back to their root cause — for example, during my
Data Gyan internship I identified 500+ data quality issues by
methodically validating records rather than accepting them at face
value."`,
    difficulty: 'Advanced',
    tags: ['behavioral', 'section-28'],
  },
  {
    id: 328,
    section: 28,
    sectionTitle: 'Behavioral & Career Development Questions',
    category: 'Behavioral',
    question: 'What is your biggest weakness, and how are you addressing it?',
    answer: `Sample answer: "I'm still building depth in Python for data
analysis, since my formal background leaned more toward SQL, Tableau,
and X++. I'm actively practicing with structured exercises to close
that gap."`,
    difficulty: 'Advanced',
    tags: ['behavioral', 'section-28'],
  },
  {
    id: 329,
    section: 28,
    sectionTitle: 'Behavioral & Career Development Questions',
    category: 'Behavioral',
    question: `Describe a time you made a mistake in an analysis — what
happened?`,
    answer: `Sample structure (STAR): describe the specific mistake (e.g. a
misjoined table inflating a total), how you caught it (validation
against source totals), how you corrected and communicated it, and
what process change you made afterward to prevent it recurring.`,
    difficulty: 'Advanced',
    tags: ['behavioral', 'section-28'],
  },
  {
    id: 330,
    section: 28,
    sectionTitle: 'Behavioral & Career Development Questions',
    category: 'Behavioral',
    question: 'How do you handle receiving critical feedback on your work?',
    answer: `Sample answer: "I treat it as useful information rather than a
personal judgment — I ask clarifying questions to fully understand the
concern, make the correction, and where useful, adjust my process so
the same issue doesn't recur."`,
    difficulty: 'Advanced',
    tags: ['behavioral', 'section-28'],
  },
  {
    id: 331,
    section: 28,
    sectionTitle: 'Behavioral & Career Development Questions',
    category: 'Behavioral',
    question: 'Where do you see yourself in 3-5 years?',
    answer: `Sample answer: "Growing from an entry-level Data Analyst into a
more senior analytics or data governance role, building deeper
expertise in tools like Collibra and SQL while continuing to develop my
Python and statistical skills."`,
    difficulty: 'Advanced',
    tags: ['behavioral', 'section-28'],
  },
  {
    id: 332,
    section: 28,
    sectionTitle: 'Behavioral & Career Development Questions',
    category: 'Behavioral',
    question: 'How do you manage your time across multiple projects?',
    answer: `Sample answer: "I clarify priorities and deadlines with
stakeholders upfront, break larger tasks into smaller milestones, and
keep a running list so nothing slips — reprioritizing quickly when
something more urgent comes in."`,
    difficulty: 'Advanced',
    tags: ['behavioral', 'section-28'],
  },
  {
    id: 333,
    section: 28,
    sectionTitle: 'Behavioral & Career Development Questions',
    category: 'Behavioral',
    question: `Describe a time you had to learn a new tool quickly for a
project.`,
    answer: `Tailor this to a real example — e.g. picking up X++ and D365
F&O development at Ghora Technologies, or ramping up on Collibra for
data governance work, and how you structured your learning to become
productive quickly.`,
    difficulty: 'Advanced',
    tags: ['behavioral', 'section-28'],
  },
  {
    id: 334,
    section: 28,
    sectionTitle: 'Behavioral & Career Development Questions',
    category: 'Behavioral',
    question: 'How would your previous manager/colleagues describe you?',
    answer: `Sample answer: "Reliable and thorough — someone who double-checks
their numbers before sharing them, communicates clearly when something
is blocked, and is comfortable asking questions rather than guessing."`,
    difficulty: 'Advanced',
    tags: ['behavioral', 'section-28'],
  },
  {
    id: 335,
    section: 28,
    sectionTitle: 'Behavioral & Career Development Questions',
    category: 'Behavioral',
    question: `What do you do when you don't know the answer to a stakeholder's
question?`,
    answer: `Sample answer: "I'm upfront that I don't have the answer yet
rather than guessing, give a realistic timeframe for when I can find
out, and follow up once I've properly investigated rather than leaving
it open-ended."`,
    difficulty: 'Advanced',
    tags: ['behavioral', 'section-28'],
  },
  {
    id: 336,
    section: 28,
    sectionTitle: 'Behavioral & Career Development Questions',
    category: 'Behavioral',
    question: `How do you handle disagreements with a teammate about an
approach?`,
    answer: `Sample answer: "I focus on the data and the business goal rather
than personal preference — laying out the trade-offs of each approach
and, where there's genuine uncertainty, proposing a quick test or
second opinion rather than letting it become a standoff."`,
    difficulty: 'Advanced',
    tags: ['behavioral', 'section-28'],
  },
  {
    id: 337,
    section: 28,
    sectionTitle: 'Behavioral & Career Development Questions',
    category: 'Behavioral',
    question: 'What questions do you ask before starting a new analysis?',
    answer: `Sample answer: "What decision will this analysis inform? Who's
the audience? What does 'done' look like? What's the deadline? And
where does the data actually live, and can I trust it?"`,
    difficulty: 'Advanced',
    tags: ['behavioral', 'section-28'],
  },
  {
    id: 338,
    section: 28,
    sectionTitle: 'Behavioral & Career Development Questions',
    category: 'Behavioral',
    question: 'How do you balance speed vs accuracy in your work?',
    answer: `Sample answer: "For quick directional questions, I'll give a fast
estimate and clearly flag it as such. For anything feeding a real
decision or going to leadership, I take the extra time to validate
because a wrong number is worse than a slow one."`,
    difficulty: 'Advanced',
    tags: ['behavioral', 'section-28'],
  },
  {
    id: 339,
    section: 28,
    sectionTitle: 'Behavioral & Career Development Questions',
    category: 'Behavioral',
    question: `What's a data project you'd like to work on if you had
unlimited resources?`,
    answer: `Open-ended — a good answer ties personal interest to a concrete,
believable project (e.g. building an end-to-end data governance
framework connecting D365 F&O source data to a Collibra catalog with
automated quality scoring) rather than something vague.`,
    difficulty: 'Advanced',
    tags: ['behavioral', 'section-28'],
  },
  {
    id: 340,
    section: 28,
    sectionTitle: 'Behavioral & Career Development Questions',
    category: 'Behavioral',
    question: 'Why should we hire you over other candidates?',
    answer: `Sample answer: "My combination of hands-on SQL/Tableau/data
quality experience with real ERP development exposure (D365 F&O,
X++) is an unusual pairing for an early-career candidate — I understand
both how business data gets created in source systems and how to
analyze and govern it afterward."`,
    difficulty: 'Advanced',
    tags: ['behavioral', 'section-28'],
  },
  {
    id: 341,
    section: 29,
    sectionTitle: 'Data Analyst Toolkit (Git, Jupyter, Google Sheets)',
    category: 'General',
    question: 'What is Git, and why is it useful for a data analyst?',
    answer: `Git is a version control system that tracks changes to files
(scripts, notebooks, SQL files) over time. It's useful for analysts to
keep a history of changes, collaborate without overwriting each
other's work, and safely experiment using branches.`,
    difficulty: 'Intermediate',
    tags: ['general', 'section-29'],
  },
  {
    id: 342,
    section: 29,
    sectionTitle: 'Data Analyst Toolkit (Git, Jupyter, Google Sheets)',
    category: 'General',
    question: 'What is the difference between git commit and git push?',
    answer: `git commit saves a snapshot of changes to your LOCAL repository
history. git push uploads those committed changes to a REMOTE
repository (e.g. GitHub) so others can see/access them.`,
    sqlCode: `git add .
git commit -m "add cleaned sales dataset script"
git push origin main`,
    difficulty: 'Intermediate',
    tags: ['general', 'section-29'],
  },
  {
    id: 343,
    section: 29,
    sectionTitle: 'Data Analyst Toolkit (Git, Jupyter, Google Sheets)',
    category: 'General',
    question: `What is a Jupyter Notebook, and why is it popular for data
analysis?`,
    answer: `An interactive, browser-based coding environment that lets you
mix executable code, output (tables, charts), and formatted text/
explanations in one document — popular because it makes exploratory
data analysis and sharing results easy.`,
    difficulty: 'Intermediate',
    tags: ['general', 'section-29'],
  },
  {
    id: 344,
    section: 29,
    sectionTitle: 'Data Analyst Toolkit (Git, Jupyter, Google Sheets)',
    category: 'General',
    question: `What is Google Colab, and how does it differ from local
Jupyter?`,
    answer: `Google Colab is a free, cloud-hosted Jupyter Notebook environment
that runs on Google's servers (with optional free GPU access) and
requires no local setup, whereas local Jupyter runs on your own
machine using your own installed Python environment.`,
    difficulty: 'Intermediate',
    tags: ['general', 'section-29'],
  },
  {
    id: 345,
    section: 29,
    sectionTitle: 'Data Analyst Toolkit (Git, Jupyter, Google Sheets)',
    category: 'General',
    question: 'What are the key differences between Google Sheets and Excel?',
    answer: `Google Sheets is cloud-based, supports real-time multi-user
collaboration, and integrates natively with other Google tools/APIs
(Apps Script, QUERY, IMPORTRANGE). Excel offers more advanced
functions, Power Query/Power Pivot, and better performance on very
large datasets, but is traditionally more desktop/file-based.`,
    difficulty: 'Intermediate',
    tags: ['general', 'section-29'],
  },
  {
    id: 346,
    section: 29,
    sectionTitle: 'Data Analyst Toolkit (Git, Jupyter, Google Sheets)',
    category: 'General',
    question: 'What is Google Sheets\' QUERY function used for?',
    answer: `QUERY lets you run SQL-like statements (SELECT, WHERE, GROUP BY,
ORDER BY) directly on a range of cells, useful for filtering and
summarizing data without complex nested formulas.`,
    sqlCode: '=QUERY(A1:D100, "SELECT B, SUM(D) WHERE C = \'Sales\' GROUP BY B", 1)',
    difficulty: 'Intermediate',
    tags: ['general', 'section-29'],
  },
  {
    id: 347,
    section: 29,
    sectionTitle: 'Data Analyst Toolkit (Git, Jupyter, Google Sheets)',
    category: 'General',
    question: `What is version control, and why does it matter for analytics
scripts?`,
    answer: `The practice of tracking and managing changes to code/files over
time. It matters for analytics scripts because it lets you see what
changed and why, roll back a broken query/script, and collaborate
without emailing files back and forth.`,
    difficulty: 'Intermediate',
    tags: ['general', 'section-29'],
  },
  {
    id: 348,
    section: 29,
    sectionTitle: 'Data Analyst Toolkit (Git, Jupyter, Google Sheets)',
    category: 'General',
    question: 'What is a requirements.txt file used for in Python projects?',
    answer: `A text file listing the exact Python packages (and often
versions) a project depends on, so anyone can recreate the same
environment with a single command.`,
    sqlCode: 'pip install -r requirements.txt',
    difficulty: 'Intermediate',
    tags: ['general', 'section-29'],
  },
  {
    id: 349,
    section: 29,
    sectionTitle: 'Data Analyst Toolkit (Git, Jupyter, Google Sheets)',
    category: 'General',
    question: 'What is the difference between a .csv and a .parquet file?',
    answer: `CSV is a simple, human-readable, row-based text format, widely
compatible but inefficient for very large datasets. Parquet is a
compressed, column-oriented binary format that's much faster to read/
query for large-scale analytics, though not human-readable.`,
    difficulty: 'Intermediate',
    tags: ['general', 'section-29'],
  },
  {
    id: 350,
    section: 29,
    sectionTitle: 'Data Analyst Toolkit (Git, Jupyter, Google Sheets)',
    category: 'General',
    question: 'What is an API, and how might a data analyst use one?',
    answer: `An API (Application Programming Interface) is a defined way for
one system to request data or functionality from another. A data
analyst might use an API to pull data directly from a source (e.g. a
marketing platform or a public data provider) into a script or
dashboard instead of manual exports.`,
    difficulty: 'Intermediate',
    tags: ['general', 'section-29'],
  },
  {
    id: 351,
    section: 30,
    sectionTitle: 'Machine Learning Fundamentals for Analysts',
    category: 'Machine Learning',
    question: `What is the difference between Supervised and Unsupervised
Learning?`,
    answer: `Supervised Learning trains a model on labeled data (inputs paired
with known correct outputs) to predict outcomes, e.g. predicting churn.
Unsupervised Learning finds patterns/structure in unlabeled data
without predefined outcomes, e.g. customer segmentation via clustering.`,
    difficulty: 'Advanced',
    tags: ['machine learning', 'section-30'],
  },
  {
    id: 352,
    section: 30,
    sectionTitle: 'Machine Learning Fundamentals for Analysts',
    category: 'Machine Learning',
    question: 'What is Overfitting vs Underfitting?',
    answer: `Overfitting means a model learns the training data too closely
(including its noise), performing well on training data but poorly on
new data. Underfitting means a model is too simple to capture the
underlying pattern, performing poorly on both training and new data.`,
    difficulty: 'Advanced',
    tags: ['machine learning', 'section-30'],
  },
  {
    id: 353,
    section: 30,
    sectionTitle: 'Machine Learning Fundamentals for Analysts',
    category: 'Machine Learning',
    question: 'What is a Training set vs Test set vs Validation set?',
    answer: `The Training set is used to fit the model. The Validation set is
used during development to tune parameters and compare models. The
Test set is held back entirely until the end, to give an unbiased
estimate of how the final model performs on unseen data.`,
    difficulty: 'Advanced',
    tags: ['machine learning', 'section-30'],
  },
  {
    id: 355,
    section: 30,
    sectionTitle: 'Machine Learning Fundamentals for Analysts',
    category: 'Machine Learning',
    question: 'What is Classification vs Regression?',
    answer: `Classification predicts a discrete category/label (e.g. will a
customer churn: yes/no). Regression predicts a continuous numeric
value (e.g. predicted revenue next month).`,
    difficulty: 'Advanced',
    tags: ['machine learning', 'section-30'],
  },
  {
    id: 356,
    section: 30,
    sectionTitle: 'Machine Learning Fundamentals for Analysts',
    category: 'Machine Learning',
    question: 'What is Clustering, and what is K-Means used for?',
    answer: `Clustering is an unsupervised technique that groups similar data
points together without predefined labels. K-Means is a popular
clustering algorithm that partitions data into K groups by minimizing
the distance between points and their assigned cluster's center —
often used for customer segmentation.`,
    difficulty: 'Advanced',
    tags: ['machine learning', 'section-30'],
  },
  {
    id: 357,
    section: 30,
    sectionTitle: 'Machine Learning Fundamentals for Analysts',
    category: 'Machine Learning',
    question: 'What is a Confusion Matrix?',
    answer: `A table summarizing a classification model's predictions against
actual outcomes, broken into True Positives, True Negatives, False
Positives, and False Negatives — the basis for metrics like precision,
recall, and accuracy.`,
    difficulty: 'Advanced',
    tags: ['machine learning', 'section-30'],
  },
  {
    id: 358,
    section: 30,
    sectionTitle: 'Machine Learning Fundamentals for Analysts',
    category: 'Machine Learning',
    question: 'What is the difference between Precision and Recall?',
    answer: `Precision measures how many of the model's positive predictions
were actually correct (True Positives / Predicted Positives). Recall
measures how many of the actual positives the model successfully
caught (True Positives / Actual Positives). There's often a trade-off
between the two.`,
    difficulty: 'Advanced',
    tags: ['machine learning', 'section-30'],
  },
  {
    id: 359,
    section: 30,
    sectionTitle: 'Machine Learning Fundamentals for Analysts',
    category: 'Machine Learning',
    question: 'What is Cross-Validation?',
    answer: `A technique for evaluating a model's performance by splitting the
data into multiple folds, training on some folds and testing on the
remaining fold, then rotating — giving a more reliable performance
estimate than a single train/test split.`,
    difficulty: 'Advanced',
    tags: ['machine learning', 'section-30'],
  },
  {
    id: 360,
    section: 30,
    sectionTitle: 'Machine Learning Fundamentals for Analysts',
    category: 'Machine Learning',
    question: 'What is a Decision Tree, in simple terms?',
    answer: `A model that makes predictions by asking a series of yes/no
questions about the data (e.g. "Is Salary > 50000?"), splitting the
data at each step, until arriving at a final prediction — easy to
visualize and interpret.`,
    difficulty: 'Advanced',
    tags: ['machine learning', 'section-30'],
  },
  {
    id: 361,
    section: 30,
    sectionTitle: 'Machine Learning Fundamentals for Analysts',
    category: 'Machine Learning',
    question: 'What is the difference between Bagging and Boosting?',
    answer: `Bagging (e.g. Random Forest) trains many models independently in
parallel on random subsets of data and averages their results to
reduce variance. Boosting (e.g. XGBoost) trains models sequentially,
with each new model focusing on correcting the errors of the previous
ones, to reduce bias.`,
    difficulty: 'Advanced',
    tags: ['machine learning', 'section-30'],
  },
  {
    id: 362,
    section: 30,
    sectionTitle: 'Machine Learning Fundamentals for Analysts',
    category: 'Machine Learning',
    question: `What is Feature Importance, and why does it matter for a data
analyst?`,
    answer: `A measure of how much each input variable contributes to a
model's predictions. It matters for analysts because it can reveal
which business factors most influence an outcome (e.g. which factors
drive churn most), even without needing to fully build the model
themselves.`,
    difficulty: 'Advanced',
    tags: ['machine learning', 'section-30'],
  },
  {
    id: 363,
    section: 30,
    sectionTitle: 'Machine Learning Fundamentals for Analysts',
    category: 'Machine Learning',
    question: `What is the difference between a Data Analyst's and a Data
Scientist's involvement in an ML project?`,
    answer: `A Data Analyst typically handles data exploration, cleaning,
defining the business question, and interpreting/communicating model
results. A Data Scientist typically builds, tunes, and validates the
predictive models themselves.`,
    difficulty: 'Advanced',
    tags: ['machine learning', 'section-30'],
  },
  {
    id: 364,
    section: 30,
    sectionTitle: 'Machine Learning Fundamentals for Analysts',
    category: 'Machine Learning',
    question: 'What is Model Drift?',
    answer: `A gradual decline in a deployed model's performance over time as
real-world data patterns shift away from what the model was originally
trained on — requiring monitoring and periodic retraining.`,
    difficulty: 'Advanced',
    tags: ['machine learning', 'section-30'],
  },
  {
    id: 365,
    section: 30,
    sectionTitle: 'Machine Learning Fundamentals for Analysts',
    category: 'Machine Learning',
    question: `What is a simple example of how ML could improve a reporting
process you already do manually?`,
    answer: `Sample answer: "Instead of manually flagging unusual transactions
for data quality review, a simple anomaly-detection model could
automatically surface outliers for me to investigate, saving time
versus scanning every record manually."`,
    difficulty: 'Advanced',
    tags: ['machine learning', 'section-30'],
  },
  {
    id: 366,
    section: 31,
    sectionTitle: 'Domain-Specific Analytics (Finance, Marketing, HR)',
    category: 'General',
    question: 'What is Variance Analysis in financial reporting?',
    answer: `Comparing actual financial results against a budget or forecast,
and investigating the reasons behind significant differences
(favorable or unfavorable variances).`,
    difficulty: 'Advanced',
    tags: ['general', 'section-31'],
  },
  {
    id: 367,
    section: 31,
    sectionTitle: 'Domain-Specific Analytics (Finance, Marketing, HR)',
    category: 'General',
    question: 'What is Working Capital, and why does it matter?',
    answer: `Working Capital = Current Assets − Current Liabilities. It
matters because it indicates a company's short-term liquidity — its
ability to cover near-term obligations with assets it can quickly
convert to cash.`,
    difficulty: 'Advanced',
    tags: ['general', 'section-31'],
  },
  {
    id: 368,
    section: 31,
    sectionTitle: 'Domain-Specific Analytics (Finance, Marketing, HR)',
    category: 'General',
    question: 'What is Attribution Modeling in marketing analytics?',
    answer: `A method for assigning credit for a conversion (e.g. a sale)
across the different marketing touchpoints a customer interacted with
(e.g. first-click, last-click, or multi-touch models), used to
understand which channels are actually driving results.`,
    difficulty: 'Advanced',
    tags: ['general', 'section-31'],
  },
  {
    id: 369,
    section: 31,
    sectionTitle: 'Domain-Specific Analytics (Finance, Marketing, HR)',
    category: 'General',
    question: `What is Customer Segmentation, and what techniques are used for
it?`,
    answer: `The practice of dividing customers into meaningful groups based
on shared characteristics (demographics, behavior, spending).
Techniques include RFM analysis, K-Means clustering, and rule-based
segmentation.`,
    difficulty: 'Advanced',
    tags: ['general', 'section-31'],
  },
  {
    id: 370,
    section: 31,
    sectionTitle: 'Domain-Specific Analytics (Finance, Marketing, HR)',
    category: 'General',
    question: `What is Employee Attrition Rate, and how would you calculate
it?`,
    answer: `The rate at which employees leave an organization over a period.
Formula: Attrition Rate = (Number of Employees Who Left / Average
Total Employees) × 100.`,
    difficulty: 'Advanced',
    tags: ['general', 'section-31'],
  },
  {
    id: 371,
    section: 31,
    sectionTitle: 'Domain-Specific Analytics (Finance, Marketing, HR)',
    category: 'General',
    question: 'What is Headcount Planning / Workforce Analytics?',
    answer: `The use of data to forecast staffing needs, analyze workforce
trends (attrition, hiring velocity, tenure), and support decisions
about hiring, restructuring, or resource allocation.`,
    difficulty: 'Advanced',
    tags: ['general', 'section-31'],
  },
  {
    id: 372,
    section: 31,
    sectionTitle: 'Domain-Specific Analytics (Finance, Marketing, HR)',
    category: 'General',
    question: 'What is Return on Investment (ROI), and how is it calculated?',
    answer: `A measure of the profitability of an investment relative to its
cost. Formula: ROI = (Net Gain from Investment − Cost of Investment) /
Cost of Investment × 100.`,
    difficulty: 'Advanced',
    tags: ['general', 'section-31'],
  },
  {
    id: 373,
    section: 31,
    sectionTitle: 'Domain-Specific Analytics (Finance, Marketing, HR)',
    category: 'General',
    question: 'What is A/B Testing used for in a marketing campaign context?',
    answer: `Comparing two versions of a marketing asset (e.g. two email
subject lines or ad creatives) by showing each to a random subset of
the audience, to statistically determine which performs better on a
target metric like click-through or conversion rate.`,
    difficulty: 'Advanced',
    tags: ['general', 'section-31'],
  },
  {
    id: 374,
    section: 31,
    sectionTitle: 'Domain-Specific Analytics (Finance, Marketing, HR)',
    category: 'General',
    question: 'What is Days Sales Outstanding (DSO)?',
    answer: `A metric measuring the average number of days it takes a company
to collect payment after a sale, calculated as (Accounts Receivable /
Total Credit Sales) × Number of Days — lower DSO generally means
faster cash collection.`,
    difficulty: 'Advanced',
    tags: ['general', 'section-31'],
  },
  {
    id: 375,
    section: 31,
    sectionTitle: 'Domain-Specific Analytics (Finance, Marketing, HR)',
    category: 'General',
    question: `What is Employee Engagement Score, and how is it typically
measured?`,
    answer: `A metric summarizing how motivated, committed, and satisfied
employees are, typically measured through periodic survey questions
(e.g. on a 1-5 scale) and aggregated into an overall score, often
tracked over time and by department.`,
    difficulty: 'Advanced',
    tags: ['general', 'section-31'],
  },
  {
    id: 376,
    section: 32,
    sectionTitle: 'Stakeholder Communication & Case Studies',
    category: 'Behavioral',
    question: `How would you present a negative finding (e.g. declining
revenue) to leadership?`,
    answer: `Sample approach: lead with the headline finding clearly and
factually, provide supporting context (what changed, when, by how
much), avoid burying it in caveats, and where possible pair it with
a recommended next step or further investigation rather than just
delivering bad news with no direction.`,
    difficulty: 'Advanced',
    tags: ['behavioral', 'section-32'],
  },
  {
    id: 377,
    section: 32,
    sectionTitle: 'Stakeholder Communication & Case Studies',
    category: 'Behavioral',
    question: 'What is the "So What?" test for a data insight?',
    answer: `A check on whether a finding is actually useful — after stating a
result, asking "so what should someone DO differently because of
this?" If there's no clear action or decision it informs, the insight
likely needs to be reframed or isn't ready to present.`,
    difficulty: 'Advanced',
    tags: ['behavioral', 'section-32'],
  },
  {
    id: 378,
    section: 32,
    sectionTitle: 'Stakeholder Communication & Case Studies',
    category: 'Behavioral',
    question: `How do you decide what NOT to include in an executive
dashboard?`,
    answer: `Sample answer: "I focus on metrics tied directly to the
decisions that audience actually makes, and cut anything that's
'interesting but not actionable' for them — detailed operational
metrics can live in a secondary, more detailed report instead."`,
    difficulty: 'Advanced',
    tags: ['behavioral', 'section-32'],
  },
  {
    id: 379,
    section: 32,
    sectionTitle: 'Stakeholder Communication & Case Studies',
    category: 'Behavioral',
    question: `Describe how you'd structure a data analysis project from
request to delivery.`,
    answer: `Sample structure: 1) Clarify the business question and audience;
2) Identify and validate data sources; 3) Clean/prepare the data; 4)
Analyze; 5) Build the visualization/report; 6) Review findings against
the original question; 7) Present with clear takeaways and next steps.`,
    difficulty: 'Advanced',
    tags: ['behavioral', 'section-32'],
  },
  {
    id: 380,
    section: 32,
    sectionTitle: 'Stakeholder Communication & Case Studies',
    category: 'Behavioral',
    question: `How do you handle a stakeholder who wants a report "by end of
day" for a complex analysis?`,
    answer: `Sample answer: "I'd clarify what decision is driving the
urgency, offer a quick, clearly-caveated directional answer if
possible today, and be transparent about what a fully validated
version would need and when that could realistically be ready."`,
    difficulty: 'Advanced',
    tags: ['behavioral', 'section-32'],
  },
  {
    id: 381,
    section: 32,
    sectionTitle: 'Stakeholder Communication & Case Studies',
    category: 'Behavioral',
    question: `How do you document your SQL queries or Python scripts for
other team members?`,
    answer: `Use clear comments explaining the purpose of each major step (not
just what the code does, but why), consistent naming conventions,
a brief header describing inputs/outputs/assumptions, and where
relevant, a short README for larger scripts or projects.`,
    difficulty: 'Advanced',
    tags: ['behavioral', 'section-32'],
  },
  {
    id: 382,
    section: 32,
    sectionTitle: 'Stakeholder Communication & Case Studies',
    category: 'Behavioral',
    question: `How would you explain the difference between correlation and
causation to a non-technical manager?`,
    answer: `Sample answer: "Correlation means two things tend to move
together — like ice cream sales and sunburns both rising in summer.
That doesn't mean one causes the other; a third factor, like hot
weather, is driving both. I'd want more evidence before saying one
thing truly causes another."`,
    difficulty: 'Advanced',
    tags: ['behavioral', 'section-32'],
  },
  {
    id: 383,
    section: 32,
    sectionTitle: 'Stakeholder Communication & Case Studies',
    category: 'Behavioral',
    question: `What would you do if two different departments report
conflicting numbers for the same metric?`,
    answer: `Sample approach: trace both numbers back to their source data and
definitions (are they measuring the exact same thing, same date range,
same filters?), identify where the discrepancy originates, and work
with both teams to agree on a single, documented definition going
forward (a "single source of truth").`,
    difficulty: 'Advanced',
    tags: ['behavioral', 'section-32'],
  },
  {
    id: 384,
    section: 32,
    sectionTitle: 'Stakeholder Communication & Case Studies',
    category: 'Behavioral',
    question: `How do you decide the right level of detail for different
audiences (execs vs analysts)?`,
    answer: `Sample answer: "Executives generally want the headline number,
the trend, and the 'so what' — not the methodology. Fellow analysts
often want to see the underlying logic, assumptions, and data sources
so they can validate or build on the work. I adjust depth and jargon
accordingly."`,
    difficulty: 'Advanced',
    tags: ['behavioral', 'section-32'],
  },
  {
    id: 385,
    section: 32,
    sectionTitle: 'Stakeholder Communication & Case Studies',
    category: 'Behavioral',
    question: `Describe a scenario where you had to say "the data doesn't
support that" to a stakeholder.`,
    answer: `Sample structure: describe a specific instance where a
stakeholder's assumption wasn't backed by the data, how you presented
the evidence respectfully and clearly, and how the conversation was
resolved (tailor to a real example where possible).`,
    difficulty: 'Advanced',
    tags: ['behavioral', 'section-32'],
  },
  {
    id: 386,
    section: 32,
    sectionTitle: 'Stakeholder Communication & Case Studies',
    category: 'Behavioral',
    question: `How would you approach building a report that leadership will
use weekly?`,
    answer: `Sample approach: confirm exactly which decisions it needs to
support, keep the metric set small and consistent week to week, design
for quick scanning, automate the data refresh so it's reliable without
manual work, and gather feedback after the first few weeks to refine
it.`,
    difficulty: 'Advanced',
    tags: ['behavioral', 'section-32'],
  },
  {
    id: 387,
    section: 32,
    sectionTitle: 'Stakeholder Communication & Case Studies',
    category: 'Behavioral',
    question: `What is your process for handling an ad hoc data request that
isn't clearly defined?`,
    answer: `Sample answer: "I ask a few quick clarifying questions — what
decision this supports, what time period/segment matters, and what
format is most useful — rather than guessing and potentially
delivering the wrong thing."`,
    difficulty: 'Advanced',
    tags: ['behavioral', 'section-32'],
  },
  {
    id: 388,
    section: 32,
    sectionTitle: 'Stakeholder Communication & Case Studies',
    category: 'Behavioral',
    question: `How do you make sure insights actually lead to action, not just
get filed away?`,
    answer: `Sample answer: "I try to pair every insight with a specific,
concrete recommendation and a named owner or next step, rather than
just presenting numbers and leaving interpretation entirely up to the
audience."`,
    difficulty: 'Advanced',
    tags: ['behavioral', 'section-32'],
  },
  {
    id: 389,
    section: 32,
    sectionTitle: 'Stakeholder Communication & Case Studies',
    category: 'Behavioral',
    question: `How would you explain a complicated SQL query's logic to
someone who doesn't know SQL?`,
    answer: `Sample answer: "I'd describe it in plain business terms — e.g.
'this finds every customer who bought something in the last 90 days
but hasn't ordered again since' — rather than walking through JOIN and
WHERE clauses, and use a small example table if it helps."`,
    difficulty: 'Advanced',
    tags: ['behavioral', 'section-32'],
  },
  {
    id: 390,
    section: 32,
    sectionTitle: 'Stakeholder Communication & Case Studies',
    category: 'Behavioral',
    question: `What is a "single source of truth," and why is it important in
reporting?`,
    answer: `A single, authoritative, agreed-upon data source/definition for a
given metric that everyone across the organization references —
important because it prevents conflicting numbers and wasted time
reconciling different reports that claim to measure the same thing.`,
    difficulty: 'Advanced',
    tags: ['behavioral', 'section-32'],
  },
  {
    id: 391,
    section: 33,
    sectionTitle: 'Final Case Study & Scenario Questions',
    category: 'General',
    question: `A company's website traffic is up but sales are down — how
would you investigate?`,
    answer: `Sample approach: check if the traffic increase is from a
relevant, high-intent source (or low-quality/bot traffic); look at
conversion rate specifically (not just traffic and sales in isolation);
check for site/checkout issues; compare by segment (device, channel,
geography) to isolate where the drop is concentrated; check pricing or
inventory/stock-out issues.`,
    difficulty: 'Advanced',
    tags: ['general', 'section-33'],
  },
  {
    id: 392,
    section: 33,
    sectionTitle: 'Final Case Study & Scenario Questions',
    category: 'General',
    question: `You're asked to reduce customer churn — what data would you look
at first?`,
    answer: `Sample approach: start with a cohort/retention analysis to see
WHEN churn happens (e.g. early vs late lifecycle), then compare
behavior/usage patterns of churned vs retained customers, look at
support ticket history, pricing/plan changes, and any drop in product
engagement before cancellation.`,
    difficulty: 'Advanced',
    tags: ['general', 'section-33'],
  },
  {
    id: 393,
    section: 33,
    sectionTitle: 'Final Case Study & Scenario Questions',
    category: 'General',
    question: `Marketing wants to know which channel drives the highest quality
leads — how would you approach this?`,
    answer: `Sample approach: define "quality" clearly (e.g. leads that
convert to paying customers, not just leads captured), then track
leads by channel through the full funnel to actual conversion/revenue,
using an attribution model rather than judging channels purely on
volume of leads generated.`,
    difficulty: 'Advanced',
    tags: ['general', 'section-33'],
  },
  {
    id: 394,
    section: 33,
    sectionTitle: 'Final Case Study & Scenario Questions',
    category: 'General',
    question: `A report has been showing the same number for three weeks
straight — what would you check?`,
    answer: `Sample approach: check whether the underlying data refresh/ETL
job is actually running (a stale/failed refresh is the most common
cause), verify the query/filter logic hasn't been accidentally
hardcoded to a fixed date, and confirm with the source system whether
the real-world number has plausibly been flat.`,
    difficulty: 'Advanced',
    tags: ['general', 'section-33'],
  },
  {
    id: 395,
    section: 33,
    sectionTitle: 'Final Case Study & Scenario Questions',
    category: 'General',
    question: 'How would you measure the success of a newly launched feature?',
    answer: `Sample approach: define success metrics before launch (adoption
rate, engagement, retention impact, or revenue impact depending on the
feature's goal), compare a cohort who used the feature against one who
didn't, and track results over a meaningful time window rather than
just the first few days.`,
    difficulty: 'Advanced',
    tags: ['general', 'section-33'],
  },
  {
    id: 396,
    section: 33,
    sectionTitle: 'Final Case Study & Scenario Questions',
    category: 'General',
    question: `You inherit a dashboard built by someone who left the company
with no documentation — what do you do?`,
    answer: `Sample approach: trace the data sources and logic behind each
visual, cross-check the numbers against source systems to confirm
they're still accurate, talk to the dashboard's actual users about
what they rely on it for, and document what you find as you go so this
doesn't happen again.`,
    difficulty: 'Advanced',
    tags: ['general', 'section-33'],
  },
  {
    id: 397,
    section: 33,
    sectionTitle: 'Final Case Study & Scenario Questions',
    category: 'General',
    question: `A stakeholder asks for "all the data" without a clear question —
how do you respond?`,
    answer: `Sample answer: "I'd ask what decision or question they're
ultimately trying to answer, since 'all the data' is rarely usable as-
is — understanding the underlying goal lets me deliver something
actually useful instead of an unfiltered data dump."`,
    difficulty: 'Advanced',
    tags: ['general', 'section-33'],
  },
  {
    id: 398,
    section: 33,
    sectionTitle: 'Final Case Study & Scenario Questions',
    category: 'General',
    question: `How would you identify which product to discontinue based on
sales data?`,
    answer: `Sample approach: look beyond raw sales volume — factor in profit
margin, sales trend direction (not just current level), inventory/
holding costs, and whether the product supports sales of other items
(a "loss leader") before recommending discontinuation.`,
    difficulty: 'Advanced',
    tags: ['general', 'section-33'],
  },
  {
    id: 399,
    section: 33,
    sectionTitle: 'Final Case Study & Scenario Questions',
    category: 'General',
    question: `You find that 20% of your data source's records have
inconsistent formatting — what's your plan?`,
    answer: `Sample approach: profile the inconsistencies to understand the
pattern (one source system vs many, one time period vs ongoing),
decide whether to fix at the source or in a transformation step,
standardize using rules/mapping tables, and flag the root cause to the
data owner so it doesn't keep recurring.`,
    difficulty: 'Advanced',
    tags: ['general', 'section-33'],
  },
  {
    id: 400,
    section: 33,
    sectionTitle: 'Final Case Study & Scenario Questions',
    category: 'General',
    question: `Walk through how you'd design an experiment to test whether a
price change increases revenue.`,
    answer: `Sample approach: define the hypothesis and success metric
(revenue, not just conversion, since price affects both); randomly
split a comparable audience into control (old price) and test (new
price) groups; run for long enough to reach statistical significance
and account for any weekly/seasonal patterns; then compare total
revenue per group, not just conversion rate, before rolling out
company-wide.  add this questions also but remove duplicates if i send it to you currently if it already we have website add those are not avalaible1
- DQL (Data Query Language)        -> SELECT
Example:
Example:`,
    sqlCode: `/-- ============================================

>
<-- SQL Interview Questions WITH ANSWERS (Data Analyst / MIS)

1
/-- ============================================



1
/-- ============================================


-- SECTION 1: SQL BASICS

1
/-- ============================================




-- Q1. What is SQL?

N
L-- A1. SQL (Structured Query Language) is a standard language used to store,

L
J-- retrieve, manipulate, and manage data in relational database management

@
>-- systems (RDBMS) like MySQL, SQL Server, Oracle, PostgreSQL.



6
4-- Q2. What are the different types of SQL commands?


-- A2.

E
C-- DDL (Data Definition Language)  -> CREATE, ALTER, DROP, TRUNCATE

?
=-- DML (Data Manipulation Language) -> INSERT, UPDATE, DELETE

6
4-- DCL (Data Control Language)      -> GRANT, REVOKE

F
D-- TCL (Transaction Control Language) -> COMMIT, ROLLBACK, SAVEPOINT

/



C
A-- Q3. What is the difference between DELETE, TRUNCATE, and DROP?


-- A3.

l
j-- DELETE  : DML, removes rows (can use WHERE), can be rolled back, slower (logs each row), triggers fire.

y
w-- TRUNCATE: DDL, removes all rows, cannot use WHERE, faster, resets identity, minimal logging, mostly cannot rollback.

F
D-- DROP    : DDL, removes entire table structure + data permanently.



0
.DELETE FROM Employees WHERE Department = 'HR';


TRUNCATE TABLE Employees;


DROP TABLE Employees;



9
7-- Q4. What is the difference between WHERE and HAVING?

[
Y-- A4. WHERE filters rows BEFORE grouping/aggregation and cannot use aggregate functions.

J
H-- HAVING filters groups AFTER GROUP BY and can use aggregate functions.



)
'SELECT Department, COUNT(*) AS EmpCount


FROM Employees


WHERE Status = 'Active'


GROUP BY Department


HAVING COUNT(*) > 5;




-- Q5. What is GROUP BY?

L
J-- A5. GROUP BY groups rows that have the same values in specified columns

U
S-- into summary rows, typically used with aggregate functions like SUM, COUNT, AVG.

/
-SELECT Department, SUM(Salary) AS TotalSalary


FROM Employees


GROUP BY Department;




-- Q6. What is ORDER BY?

N
L-- A6. ORDER BY sorts the result set by one or more columns, ascending (ASC,

#
!-- default) or descending (DESC).

:
8SELECT Name, Salary FROM Employees ORDER BY Salary DESC;




-- Q7. What is DISTINCT?

L
J-- A7. DISTINCT removes duplicate rows from the result set, returning only


-- unique values.

,
*SELECT DISTINCT Department FROM Employees;



9
7-- Q8. What is the difference between CHAR and VARCHAR?

M
K-- A8. CHAR is fixed-length (pads with spaces to defined length, faster for

L
J-- fixed-size data). VARCHAR is variable-length (stores only actual data +

<
:-- small overhead, saves space, better for variable text).



`,
    difficulty: 'Advanced',
    tags: ['general', 'section-33'],
  },
  {
    id: 401,
    section: 7,
    sectionTitle: 'Database Concepts',
    category: 'SQL',
    question: `What is the difference between a temp table (#temp) and a table
variable (@table) in SQL Server?`,
    answer: `A temp table behaves like a regular table (supports indexes,
statistics, larger datasets, and is logged in tempdb) and is better for
larger data volumes. A table variable has a smaller memory footprint,
less overhead for small datasets, but no statistics and generally
worse optimizer support for large data.`,
    sqlCode: `CREATE TABLE #TempEmployees (EmpID INT, Salary DECIMAL(10,2));
DECLARE @TempEmp TABLE (EmpID INT, Salary DECIMAL(10,2));`,
    difficulty: 'Intermediate',
    tags: ['sql', 'section-7'],
  },
  {
    id: 402,
    section: 6,
    sectionTitle: 'Advanced SQL',
    category: 'SQL',
    question: 'What is a recursive CTE, and when would you use one?',
    answer: `A CTE that references itself, used to work with hierarchical or
sequential data (e.g. an org chart, or generating a date series). It
has an "anchor" query (base case) and a "recursive" query that repeats
until no new rows are produced.`,
    sqlCode: `WITH OrgChart AS (
    SELECT EmpID, ManagerID, Name, 0 AS Level
    FROM Employees WHERE ManagerID IS NULL
    UNION ALL
    SELECT e.EmpID, e.ManagerID, e.Name, o.Level + 1
    FROM Employees e
    JOIN OrgChart o ON e.ManagerID = o.EmpID
)
SELECT * FROM OrgChart;`,
    difficulty: 'Advanced',
    tags: ['sql', 'section-6'],
  },
  {
    id: 403,
    section: 4,
    sectionTitle: 'Query Writing',
    category: 'SQL',
    question: 'Write a query to find employees who report to the same manager.',
    answer: 'Refer to the SQL implementation below for the solution query.',
    sqlCode: `SELECT ManagerID, COUNT(*) AS DirectReports, STRING_AGG(Name, ', ') AS Employees
FROM Employees
WHERE ManagerID IS NOT NULL
GROUP BY ManagerID
HAVING COUNT(*) > 1;`,
    difficulty: 'Intermediate',
    tags: ['sql', 'section-4'],
  },
  {
    id: 404,
    section: 6,
    sectionTitle: 'Advanced SQL',
    category: 'SQL',
    question: 'What is PIVOT / UNPIVOT in SQL?',
    answer: `PIVOT rotates unique values from one column into multiple columns
(rows to columns), commonly used for reporting. UNPIVOT does the
reverse — turning columns back into rows.`,
    sqlCode: `SELECT * FROM (
    SELECT Department, MonthName, Amount FROM Sales
) src
PIVOT (SUM(Amount) FOR MonthName IN ([Jan],[Feb],[Mar])) AS pvt;`,
    difficulty: 'Advanced',
    tags: ['sql', 'section-6'],
  },
  {
    id: 405,
    section: 4,
    sectionTitle: 'Query Writing',
    category: 'SQL',
    question: `Write a query that transposes rows into columns without using
PIVOT (for databases that don't support it, like MySQL).`,
    answer: 'Refer to the SQL implementation below for the solution query.',
    sqlCode: `SELECT
    Department,
    SUM(CASE WHEN MonthName = 'Jan' THEN Amount ELSE 0 END) AS Jan,
    SUM(CASE WHEN MonthName = 'Feb' THEN Amount ELSE 0 END) AS Feb,
    SUM(CASE WHEN MonthName = 'Mar' THEN Amount ELSE 0 END) AS Mar
FROM Sales
GROUP BY Department;`,
    difficulty: 'Intermediate',
    tags: ['sql', 'section-4'],
  },
  {
    id: 406,
    section: 2,
    sectionTitle: 'SQL Joins',
    category: 'SQL',
    question: 'What is the difference between joining with ON vs USING?',
    answer: `ON lets you specify any join condition, including columns with
different names on each side. USING is a shorthand that only works
when the join columns have the IDENTICAL name in both tables, and it
automatically removes the duplicate column from the result.
SELECT * FROM Orders JOIN Customers USING (CustomerID);  -- MySQL/Postgres`,
    difficulty: 'Beginner',
    tags: ['sql', 'section-2'],
  },
  {
    id: 407,
    section: 21,
    sectionTitle: 'SQL Window Functions & Query Optimization',
    category: 'SQL',
    question: `Write a query to find the longest streak of consecutive login days
for a user (a classic "gaps and islands" problem).`,
    answer: 'Refer to the SQL implementation below for the solution query.',
    sqlCode: `WITH Ranked AS (
    SELECT UserID, LoginDate,
           DATEADD(DAY, -ROW_NUMBER() OVER (PARTITION BY UserID ORDER BY LoginDate), LoginDate) AS GroupKey
    FROM UserLogins
)
SELECT UserID, MIN(LoginDate) AS StreakStart, MAX(LoginDate) AS StreakEnd, COUNT(*) AS StreakLength
FROM Ranked
GROUP BY UserID, GroupKey
ORDER BY StreakLength DESC;`,
    difficulty: 'Advanced',
    tags: ['sql', 'section-21'],
  },
  {
    id: 408,
    section: 7,
    sectionTitle: 'Database Concepts',
    category: 'SQL',
    question: `What is a Materialized View, and how does it differ from a
regular View?`,
    answer: `A regular View is just a stored query — it runs live every time
it's queried. A Materialized View physically stores the query's result
set on disk, refreshed periodically, giving much faster read
performance at the cost of potentially stale data between refreshes.`,
    difficulty: 'Intermediate',
    tags: ['sql', 'section-7'],
  },
  {
    id: 409,
    section: 21,
    sectionTitle: 'SQL Window Functions & Query Optimization',
    category: 'SQL',
    question: `Write a query to calculate the difference in Amount between each
order and the customer's previous order.`,
    answer: 'Refer to the SQL implementation below for the solution query.',
    sqlCode: `SELECT CustomerID, OrderDate, Amount,
       Amount - LAG(Amount) OVER (PARTITION BY CustomerID ORDER BY OrderDate) AS ChangeFromPrevious
FROM Orders;`,
    difficulty: 'Advanced',
    tags: ['sql', 'section-21'],
  },
  {
    id: 410,
    section: 7,
    sectionTitle: 'Database Concepts',
    category: 'SQL',
    question: `What is the difference between a Scalar function and a
Table-Valued function?`,
    answer: `A Scalar function returns a single value and can be used anywhere
an expression is valid (e.g. in a SELECT column). A Table-Valued
function returns a full result set (rows and columns) and can be used
in a FROM clause like a table.`,
    difficulty: 'Intermediate',
    tags: ['sql', 'section-7'],
  },
  {
    id: 411,
    section: 6,
    sectionTitle: 'Advanced SQL',
    category: 'SQL',
    question: `Write a query to return the 5th row of a result set without using
LIMIT/OFFSET/TOP.`,
    answer: 'Refer to the SQL implementation below for the solution query.',
    sqlCode: `SELECT * FROM Employees e1
WHERE (SELECT COUNT(*) FROM Employees e2 WHERE e2.Salary > e1.Salary) = 4
ORDER BY e1.Salary DESC;`,
    difficulty: 'Advanced',
    tags: ['sql', 'section-6'],
  },
  {
    id: 412,
    section: 21,
    sectionTitle: 'SQL Window Functions & Query Optimization',
    category: 'SQL',
    question: `What is SARGability, and why does it matter for query
performance?`,
    answer: `A "SARGable" (Search ARGument-able) predicate is one the database
can use an index to evaluate efficiently, e.g. WHERE Salary > 50000.
Wrapping a column in a function, like WHERE YEAR(OrderDate) = 2026,
makes it non-SARGable — the optimizer usually can't use an index and
must scan every row instead.
Non-SARGable: WHERE YEAR(OrderDate) = 2026
SARGable rewrite: WHERE OrderDate >= '2026-01-01' AND OrderDate < '2027-01-01'`,
    difficulty: 'Advanced',
    tags: ['sql', 'section-21'],
  },
  {
    id: 413,
    section: 7,
    sectionTitle: 'Database Concepts',
    category: 'SQL',
    question: `What is the difference between a Local temp table (#temp) and a
Global temp table (##temp) in SQL Server?`,
    answer: `A Local temp table (#temp) is only visible to the session/
connection that created it and is dropped when that session ends. A
Global temp table (##temp) is visible to ALL sessions and is dropped
only once the creating session ends AND no other session is
referencing it.`,
    difficulty: 'Intermediate',
    tags: ['sql', 'section-7'],
  },
  {
    id: 414,
    section: 21,
    sectionTitle: 'SQL Window Functions & Query Optimization',
    category: 'SQL',
    question: `Write a query using GROUPING SETS to get subtotals at multiple
levels in one result set.`,
    answer: 'Refer to the SQL implementation below for the solution query.',
    sqlCode: `SELECT Region, Department, SUM(Salary) AS TotalSalary
FROM Employees
GROUP BY GROUPING SETS ((Region, Department), (Region), ());`,
    difficulty: 'Advanced',
    tags: ['sql', 'section-21'],
  },
  {
    id: 415,
    section: 1,
    sectionTitle: 'SQL Basics',
    category: 'SQL',
    question: `What is the difference between DELETE with a WHERE clause and
DELETE without one?`,
    answer: `DELETE with WHERE removes only the rows matching the condition.
DELETE without WHERE removes ALL rows from the table (but keeps the
table structure), and — unlike TRUNCATE — still logs each row
deletion individually and can fire DELETE triggers.`,
    difficulty: 'Beginner',
    tags: ['sql', 'section-1'],
  },
  {
    id: 416,
    section: 4,
    sectionTitle: 'Query Writing',
    category: 'SQL',
    question: `Write a query to flag potentially duplicate transactions made by
the same customer within a 5-minute window.`,
    answer: 'Refer to the SQL implementation below for the solution query.',
    sqlCode: `SELECT t1.TransactionID, t2.TransactionID AS PossibleDuplicateOf
FROM Transactions t1
JOIN Transactions t2
    ON t1.CustomerID = t2.CustomerID
    AND t1.Amount = t2.Amount
    AND t1.TransactionID <> t2.TransactionID
    AND ABS(DATEDIFF(SECOND, t1.TransactionTime, t2.TransactionTime)) <= 300;`,
    difficulty: 'Intermediate',
    tags: ['sql', 'section-4'],
  },
  {
    id: 417,
    section: 1,
    sectionTitle: 'SQL Basics',
    category: 'SQL',
    question: `What is the difference between INTERSECT and EXCEPT (MINUS in
Oracle)?`,
    answer: `INTERSECT returns only the rows that appear in BOTH query results.
EXCEPT (MINUS in Oracle) returns rows that appear in the FIRST query's
results but NOT in the second.`,
    sqlCode: `SELECT CustomerID FROM Orders2025
INTERSECT
SELECT CustomerID FROM Orders2026;  -- customers who ordered in both years`,
    difficulty: 'Beginner',
    tags: ['sql', 'section-1'],
  },
  {
    id: 418,
    section: 4,
    sectionTitle: 'Query Writing',
    category: 'SQL',
    question: `Write a query to turn 12 rows of monthly sales into a single row
per year with 12 month columns.
...continue for remaining months`,
    answer: 'Refer to the SQL implementation below for the solution query.',
    sqlCode: `SELECT Year,
    SUM(CASE WHEN MonthNum=1 THEN Amount END) AS Jan,
    SUM(CASE WHEN MonthNum=2 THEN Amount END) AS Feb,
    SUM(CASE WHEN MonthNum=3 THEN Amount END) AS Mar
FROM MonthlySales
GROUP BY Year;`,
    difficulty: 'Intermediate',
    tags: ['sql', 'section-4'],
  },
  {
    id: 419,
    section: 6,
    sectionTitle: 'Advanced SQL',
    category: 'SQL',
    question: `Write a recursive CTE to generate a series of dates between two
given dates.`,
    answer: 'Refer to the SQL implementation below for the solution query.',
    sqlCode: `WITH DateSeries AS (
    SELECT CAST('2026-01-01' AS DATE) AS DateValue
    UNION ALL
    SELECT DATEADD(DAY, 1, DateValue)
    FROM DateSeries
    WHERE DateValue < '2026-01-31'
)
SELECT * FROM DateSeries OPTION (MAXRECURSION 100);`,
    difficulty: 'Advanced',
    tags: ['sql', 'section-6'],
  },
  {
    id: 420,
    section: 7,
    sectionTitle: 'Database Concepts',
    category: 'SQL',
    question: `What is the difference between Statistics and Indexes in query
optimization?`,
    answer: `An Index is a physical structure that speeds up data retrieval.
Statistics are metadata describing the distribution of values in a
column (used by the query optimizer to estimate row counts and choose
the best execution plan) — a table can have accurate indexes but
outdated statistics, still leading to poor query plans.`,
    difficulty: 'Intermediate',
    tags: ['sql', 'section-7'],
  },
  {
    id: 421,
    section: 21,
    sectionTitle: 'SQL Window Functions & Query Optimization',
    category: 'SQL',
    question: 'Write a query to find the median value of a numeric column.',
    answer: 'Refer to the SQL implementation below for the solution query.',
    sqlCode: `SELECT AVG(Salary) AS MedianSalary
FROM (
    SELECT Salary,
           ROW_NUMBER() OVER (ORDER BY Salary) AS rn,
           COUNT(*) OVER () AS cnt
    FROM Employees
) t
WHERE rn IN ((cnt+1)/2, (cnt+2)/2);`,
    difficulty: 'Advanced',
    tags: ['sql', 'section-21'],
  },
  {
    id: 422,
    section: 7,
    sectionTitle: 'Database Concepts',
    category: 'SQL',
    question: `What is the difference between ON DELETE CASCADE and ON DELETE
SET NULL for a foreign key constraint?`,
    answer: `ON DELETE CASCADE automatically deletes child rows when the
referenced parent row is deleted. ON DELETE SET NULL keeps the child
rows but sets their foreign key column to NULL instead of deleting
them.`,
    sqlCode: `ALTER TABLE Orders
ADD CONSTRAINT FK_Customer FOREIGN KEY (CustomerID)
REFERENCES Customers(CustomerID) ON DELETE CASCADE;`,
    difficulty: 'Intermediate',
    tags: ['sql', 'section-7'],
  },
  {
    id: 423,
    section: 4,
    sectionTitle: 'Query Writing',
    category: 'SQL',
    question: `Write a query to detect gaps in a sequence of IDs (e.g. missing
invoice numbers).`,
    answer: 'Refer to the SQL implementation below for the solution query.',
    sqlCode: `SELECT (t1.ID + 1) AS GapStart, (MIN(t2.ID) - 1) AS GapEnd
FROM Invoices t1
JOIN Invoices t2 ON t2.ID > t1.ID
WHERE NOT EXISTS (SELECT 1 FROM Invoices t3 WHERE t3.ID = t1.ID + 1)
GROUP BY t1.ID;`,
    difficulty: 'Intermediate',
    tags: ['sql', 'section-4'],
  },
  {
    id: 424,
    section: 3,
    sectionTitle: 'Aggregate Functions',
    category: 'SQL',
    question: `What is the STRING_AGG (or GROUP_CONCAT in MySQL) function used
for?`,
    answer: `It concatenates values from multiple rows within a group into a
single delimited string, useful for turning related row-level data
into a readable summary.`,
    sqlCode: `SELECT DeptID, STRING_AGG(Name, ', ') AS TeamMembers
FROM Employees
GROUP BY DeptID;`,
    difficulty: 'Beginner',
    tags: ['sql', 'section-3'],
  },
  {
    id: 425,
    section: 21,
    sectionTitle: 'SQL Window Functions & Query Optimization',
    category: 'SQL',
    question: `Write a query to calculate a running (cumulative) count of
distinct customers who had placed at least one order, by day.
Note: some databases don't support DISTINCT inside a window function directly;
an alternative is a correlated subquery counting distinct customers up to that date.`,
    answer: 'Refer to the SQL implementation below for the solution query.',
    sqlCode: `SELECT OrderDate,
       COUNT(DISTINCT CustomerID) OVER (ORDER BY OrderDate ROWS UNBOUNDED PRECEDING) AS RunningDistinctCustomers
FROM Orders;`,
    difficulty: 'Advanced',
    tags: ['sql', 'section-21'],
  },
  {
    id: 426,
    section: 10,
    sectionTitle: 'Excel for Data Analysts',
    category: 'Excel',
    question: 'What is the CHOOSE function used for?',
    answer: `CHOOSE returns a value from a list based on a given index number,
e.g. CHOOSE(2, "Low", "Medium", "High") returns "Medium" — useful for
mapping a numeric code to a label without a lookup table.`,
    difficulty: 'Beginner',
    tags: ['excel', 'section-10'],
  },
  {
    id: 427,
    section: 10,
    sectionTitle: 'Excel for Data Analysts',
    category: 'Excel',
    question: 'What is the difference between LARGE/SMALL functions and MAX/MIN?',
    answer: `MAX/MIN return only the single highest/lowest value in a range.
LARGE(range, k) and SMALL(range, k) return the k-th largest/smallest
value, letting you retrieve the 2nd, 3rd, or any ranked value, not just
the very top or bottom.`,
    sqlCode: '=LARGE(B2:B20, 2)  -- 2nd highest value',
    difficulty: 'Beginner',
    tags: ['excel', 'section-10'],
  },
  {
    id: 428,
    section: 10,
    sectionTitle: 'Excel for Data Analysts',
    category: 'Excel',
    question: 'What is the difference between RANK.EQ and RANK.AVG?',
    answer: `RANK.EQ assigns the same (top) rank to tied values, like SQL's
RANK() — leaving a gap afterward. RANK.AVG assigns tied values the
AVERAGE of the ranks they would have occupied.`,
    difficulty: 'Beginner',
    tags: ['excel', 'section-10'],
  },
  {
    id: 429,
    section: 19,
    sectionTitle: 'Advanced Excel Functions & Analysis',
    category: 'Excel',
    question: 'What is the SUMPRODUCT function used for?',
    answer: `SUMPRODUCT multiplies corresponding elements of two or more
arrays/ranges and returns the sum of those products — often used for
weighted calculations or as a flexible alternative to SUMIFS with
multiple complex conditions.`,
    sqlCode: '=SUMPRODUCT((A2:A100="Sales")*(B2:B100>50000)*C2:C100)',
    difficulty: 'Intermediate',
    tags: ['excel', 'section-19'],
  },
  {
    id: 430,
    section: 10,
    sectionTitle: 'Excel for Data Analysts',
    category: 'Excel',
    question: `What is the difference between match types 0, 1, and -1 in the
MATCH function?`,
    answer: `Match type 0 finds an EXACT match. Match type 1 (default) finds
the largest value ≤ the lookup value, requiring the range to be sorted
ascending. Match type -1 finds the smallest value ≥ the lookup value,
requiring the range to be sorted descending.`,
    difficulty: 'Beginner',
    tags: ['excel', 'section-10'],
  },
  {
    id: 431,
    section: 19,
    sectionTitle: 'Advanced Excel Functions & Analysis',
    category: 'Excel',
    question: `What is the AGGREGATE function, and how does it differ from
SUBTOTAL?`,
    answer: `Both can perform calculations while ignoring filtered/hidden rows
or errors. AGGREGATE supports more functions (19 vs SUBTOTAL's 11,
including LARGE, SMALL, PERCENTILE) and has explicit options to ignore
errors, hidden rows, or other AGGREGATE/SUBTOTAL results.`,
    difficulty: 'Intermediate',
    tags: ['excel', 'section-19'],
  },
  {
    id: 432,
    section: 10,
    sectionTitle: 'Excel for Data Analysts',
    category: 'Excel',
    question: 'What is the TRANSPOSE function used for?',
    answer: `TRANSPOSE flips a range's orientation — converting rows to
columns and vice versa — useful for reshaping data without manually
re-entering it.`,
    difficulty: 'Beginner',
    tags: ['excel', 'section-10'],
  },
  {
    id: 433,
    section: 10,
    sectionTitle: 'Excel for Data Analysts',
    category: 'Excel',
    question: 'What is a Waterfall chart, and how do you build one in Excel?',
    answer: `A chart showing how a starting value is increased or decreased by
a series of positive/negative changes to reach a final value (e.g.
Revenue → Costs → Net Profit). Modern Excel has a built-in Waterfall
chart type (Insert > Charts > Waterfall); older versions build it
manually using a stacked bar chart with an invisible "base" series.`,
    difficulty: 'Beginner',
    tags: ['excel', 'section-10'],
  },
  {
    id: 434,
    section: 10,
    sectionTitle: 'Excel for Data Analysts',
    category: 'Excel',
    question: 'What is the difference between AutoFilter and Advanced Filter?',
    answer: `AutoFilter provides simple, dropdown-based filtering on individual
columns. Advanced Filter allows complex, multi-condition criteria
(including OR logic across columns) defined in a separate criteria
range, and can extract filtered results to a new location.`,
    difficulty: 'Beginner',
    tags: ['excel', 'section-10'],
  },
  {
    id: 435,
    section: 19,
    sectionTitle: 'Advanced Excel Functions & Analysis',
    category: 'Excel',
    question: `What are the CUBE functions (CUBEVALUE, CUBEMEMBER, etc.) used
for?`,
    answer: `They retrieve specific data (values, members, sets) directly from
an OLAP cube data source (like SQL Server Analysis Services) into
Excel cells, without needing a Pivot Table — useful for building highly
custom-formatted reports from OLAP data.`,
    difficulty: 'Intermediate',
    tags: ['excel', 'section-19'],
  },
  {
    id: 436,
    section: 19,
    sectionTitle: 'Advanced Excel Functions & Analysis',
    category: 'Excel',
    question: `What are RANDARRAY and SEQUENCE dynamic array functions used
for?`,
    answer: `RANDARRAY generates an array of random numbers of a specified
size/range. SEQUENCE generates an array of sequential numbers (e.g.
1 through 12) — both "spill" automatically across multiple cells,
useful for generating test data or dynamic labels.`,
    sqlCode: '=SEQUENCE(12,1,1,1)  -- 1 to 12 down a column',
    difficulty: 'Intermediate',
    tags: ['excel', 'section-19'],
  },
  {
    id: 437,
    section: 10,
    sectionTitle: 'Excel for Data Analysts',
    category: 'Excel',
    question: 'What is a Sparkline?',
    answer: `A tiny chart embedded inside a single cell, showing a compact
visual trend (line, column, or win/loss) for a row of data — useful for
dashboards where full-size charts would take too much space.`,
    difficulty: 'Beginner',
    tags: ['excel', 'section-10'],
  },
  {
    id: 438,
    section: 10,
    sectionTitle: 'Excel for Data Analysts',
    category: 'Excel',
    question: `What is the difference between Paste Special "Values" and
"Formulas"?`,
    answer: `Paste Special > Values pastes only the calculated RESULT of a
formula, removing the underlying formula (freezing the number).
Paste Special > Formulas pastes the formula itself (adjusting relative
references as needed), without carrying over formatting.`,
    difficulty: 'Beginner',
    tags: ['excel', 'section-10'],
  },
  {
    id: 439,
    section: 10,
    sectionTitle: 'Excel for Data Analysts',
    category: 'Excel',
    question: 'What is the Camera tool in Excel?',
    answer: `A tool that inserts a live, linked picture of a range of cells —
if the source range's values change, the "photo" updates automatically
— useful for building a summary view that pulls from data scattered
across a workbook without repeating formulas.`,
    difficulty: 'Beginner',
    tags: ['excel', 'section-10'],
  },
  {
    id: 440,
    section: 19,
    sectionTitle: 'Advanced Excel Functions & Analysis',
    category: 'Excel',
    question: `What is the difference between Scenario Manager and a Data Table
in What-If Analysis?`,
    answer: `Scenario Manager lets you save and switch between several named
sets of input values (e.g. "Best Case", "Worst Case") affecting
multiple cells at once. A Data Table shows how a formula's result
changes across a RANGE of one or two input values automatically,
generating a full table of outcomes.`,
    difficulty: 'Intermediate',
    tags: ['excel', 'section-19'],
  },
  {
    id: 441,
    section: 10,
    sectionTitle: 'Excel for Data Analysts',
    category: 'Excel',
    question: 'What is the EOMONTH function used for?',
    answer: `EOMONTH returns the last day of the month, a specified number of
months before or after a given date — commonly used to calculate month-
end dates for reporting periods.`,
    sqlCode: `=EOMONTH(A2, 0)   -- last day of the month in A2
=EOMONTH(A2, -1)  -- last day of the PREVIOUS month`,
    difficulty: 'Beginner',
    tags: ['excel', 'section-10'],
  },
  {
    id: 442,
    section: 10,
    sectionTitle: 'Excel for Data Analysts',
    category: 'Excel',
    question: 'What is the EOMONTH function used for?',
    answer: `EOMONTH returns the last day of the month, a specified number of
months before or after a given date — commonly used to calculate month-
end dates for reporting periods.`,
    sqlCode: `=EOMONTH(A2, 0)   -- last day of the month in A2
=EOMONTH(A2, -1)  -- last day of the PREVIOUS month`,
    difficulty: 'Beginner',
    tags: ['excel', 'section-10'],
  },
  {
    id: 443,
    section: 10,
    sectionTitle: 'Excel for Data Analysts',
    category: 'Excel',
    question: `What is the difference between DATEDIF and simple date
subtraction?`,
    answer: `Simple subtraction (B1-A1) gives the number of days between two
dates. DATEDIF can return the difference in other units too — years,
months, or days — and can express things like "2 years, 3 months" that
plain subtraction cannot.`,
    sqlCode: '=DATEDIF(A2, B2, "y")  -- full years between two dates',
    difficulty: 'Beginner',
    tags: ['excel', 'section-10'],
  },
  {
    id: 444,
    section: 19,
    sectionTitle: 'Advanced Excel Functions & Analysis',
    category: 'Excel',
    question: `What is the difference between a legacy Array Formula
(Ctrl+Shift+Enter) and a modern Dynamic Array formula?`,
    answer: `Legacy array formulas (older Excel) required pressing Ctrl+Shift+
Enter and returned results only into the cells you'd pre-selected.
Modern Dynamic Array formulas (current Excel) automatically "spill"
results into as many cells as needed, entered like a normal formula
with no special keystroke.`,
    difficulty: 'Intermediate',
    tags: ['excel', 'section-19'],
  },
  {
    id: 445,
    section: 19,
    sectionTitle: 'Advanced Excel Functions & Analysis',
    category: 'Excel',
    question: 'What is the LET function used for?',
    answer: `LET lets you define named variables within a single formula,
assigning a calculation to a name and reusing it multiple times —
making complex formulas easier to read and improving performance by
avoiding repeated calculation of the same sub-expression.`,
    sqlCode: '=LET(x, A2*1.1, y, B2*0.9, x+y)',
    difficulty: 'Intermediate',
    tags: ['excel', 'section-19'],
  },
  {
    id: 446,
    section: 19,
    sectionTitle: 'Advanced Excel Functions & Analysis',
    category: 'Excel',
    question: 'What is the LAMBDA function used for?',
    answer: `LAMBDA lets you create your own custom, reusable functions
directly in Excel using a formula (without VBA), which can then be
named and called like any built-in function throughout the workbook.`,
    difficulty: 'Intermediate',
    tags: ['excel', 'section-19'],
  },
  {
    id: 447,
    section: 10,
    sectionTitle: 'Excel for Data Analysts',
    category: 'Excel',
    question: 'What are Custom Number Formats, and give an example.',
    answer: `Custom Number Formats control how a value is DISPLAYED without
changing its underlying value — e.g. formatting 1000000 to display as
"$1.0M" or showing negative numbers in red in parentheses.
Example format code: #,##0.0,,"M"  -- displays 1,500,000 as "1.5M"`,
    difficulty: 'Beginner',
    tags: ['excel', 'section-10'],
  },
  {
    id: 448,
    section: 19,
    sectionTitle: 'Advanced Excel Functions & Analysis',
    category: 'Excel',
    question: `What is the difference between a Linked Table and an Imported
Table in Excel's Power Query?`,
    answer: `An Imported (loaded) table brings a static copy of the
transformed data into the workbook, refreshed only on demand. A
connection-only / linked query keeps the transformation steps defined
but doesn't load data into a worksheet directly, often used as a
staging step feeding into other queries or the Data Model.`,
    difficulty: 'Intermediate',
    tags: ['excel', 'section-19'],
  },
  {
    id: 449,
    section: 10,
    sectionTitle: 'Excel for Data Analysts',
    category: 'Excel',
    question: 'What is the Watch Window used for in Excel?',
    answer: `A tool that lets you monitor the value of specific cells (even
ones on other sheets, off-screen) in a floating window, useful for
tracking key results while editing unrelated parts of a large
workbook.`,
    difficulty: 'Beginner',
    tags: ['excel', 'section-10'],
  },
  {
    id: 450,
    section: 19,
    sectionTitle: 'Advanced Excel Functions & Analysis',
    category: 'Excel',
    question: `What is a circular reference, and when might you intentionally
allow one using iterative calculation?`,
    answer: `A circular reference occurs when a formula refers back to its own
cell, directly or indirectly, normally causing an error. Enabling
Iterative Calculation (File > Options > Formulas) intentionally allows
this for specific cases, like circular interest calculations, where
Excel repeats the calculation a set number of times until the result
stabilizes.`,
    difficulty: 'Intermediate',
    tags: ['excel', 'section-19'],
  },
  {
    id: 451,
    section: 11,
    sectionTitle: 'Tableau / Data Visualization',
    category: 'Tableau',
    question: 'What is a Waterfall chart in Tableau, and when would you use it?',
    answer: `A chart showing how a value changes step by step through a series
of positive and negative contributions (e.g. Revenue → various cost
categories → Net Profit) — built in Tableau using a running total
table calculation on a Gantt-style bar mark.`,
    difficulty: 'Intermediate',
    tags: ['tableau', 'section-11'],
  },
  {
    id: 452,
    section: 11,
    sectionTitle: 'Tableau / Data Visualization',
    category: 'Tableau',
    question: 'What is a Bump Chart used for?',
    answer: `A line chart that tracks how RANKINGS (not raw values) of
categories change over time — e.g. how product sales rank shifts month
to month — typically built using the RANK() table calculation.`,
    difficulty: 'Intermediate',
    tags: ['tableau', 'section-11'],
  },
  {
    id: 453,
    section: 11,
    sectionTitle: 'Tableau / Data Visualization',
    category: 'Tableau',
    question: 'What is a Gantt chart in Tableau used for?',
    answer: `A chart showing the duration of tasks/events over time as
horizontal bars, commonly used for project timelines or scheduling —
built using the Gantt Bar mark type with a start date and a duration
measure.`,
    difficulty: 'Intermediate',
    tags: ['tableau', 'section-11'],
  },
  {
    id: 454,
    section: 11,
    sectionTitle: 'Tableau / Data Visualization',
    category: 'Tableau',
    question: `What is the difference between the Color, Size, Label, and Detail
shelves on the Marks card?`,
    answer: `Color encodes a field using color to distinguish categories or
show a gradient. Size scales marks by a measure's value. Label displays
text values directly on marks. Detail adds a field to control the
level of granularity shown WITHOUT visibly encoding it (no color/size/
label change).`,
    difficulty: 'Intermediate',
    tags: ['tableau', 'section-11'],
  },
  {
    id: 455,
    section: 11,
    sectionTitle: 'Tableau / Data Visualization',
    category: 'Tableau',
    question: 'What is a Highlight Table?',
    answer: `A crosstab (table) view where cell background color intensity
represents a measure's value, combining the precision of a table with
the visual pattern-spotting of a heat map.`,
    difficulty: 'Intermediate',
    tags: ['tableau', 'section-11'],
  },
  {
    id: 456,
    section: 11,
    sectionTitle: 'Tableau / Data Visualization',
    category: 'Tableau',
    question: `What is the difference between a Quick Filter and a
Parameter-driven filter?`,
    answer: `A Quick Filter directly restricts which data rows are shown and
is tied to a specific field's actual values. A Parameter is an
independent, user-controlled input value that can drive a calculated
field's logic (including custom filter behavior), and isn't limited to
the values of one specific field.`,
    difficulty: 'Intermediate',
    tags: ['tableau', 'section-11'],
  },
  {
    id: 457,
    section: 11,
    sectionTitle: 'Tableau / Data Visualization',
    category: 'Tableau',
    question: 'What is Tableau\'s Data Interpreter used for?',
    answer: `A feature that automatically detects and cleans up common issues
when connecting to messy Excel files — like removing extra header
rows, merged cells, or subtotal rows — before the data is loaded for
analysis.`,
    difficulty: 'Intermediate',
    tags: ['tableau', 'section-11'],
  },
  {
    id: 458,
    section: 11,
    sectionTitle: 'Tableau / Data Visualization',
    category: 'Tableau',
    question: 'What is a Hierarchy in Tableau, and how do you create one?',
    answer: `A Hierarchy groups related dimensions into a drill-down structure
(e.g. Country > State > City), letting users expand/collapse levels of
detail directly on a visualization. Created by dragging one dimension
onto another in the Data pane.`,
    difficulty: 'Intermediate',
    tags: ['tableau', 'section-11'],
  },
  {
    id: 459,
    section: 20,
    sectionTitle: 'Advanced Tableau',
    category: 'Tableau',
    question: `What is the difference between Drill Down and Drill Through in
Tableau?`,
    answer: `Drill Down means expanding a hierarchy to see more granular detail
within the SAME view (e.g. Country to City). Drill Through means
clicking a mark to NAVIGATE to a different, more detailed sheet or
dashboard, typically set up via a dashboard action.`,
    difficulty: 'Advanced',
    tags: ['tableau', 'section-20'],
  },
  {
    id: 460,
    section: 11,
    sectionTitle: 'Tableau / Data Visualization',
    category: 'Tableau',
    question: 'What is the difference between .twb and .twbx file formats?',
    answer: `A .twb file is a Tableau Workbook containing only the workbook's
structure/formatting and a reference to its data source(s), not the
data itself. A .twbx is a packaged workbook — a zipped file containing
the .twb plus any local data extracts/files — making it portable and
shareable without needing separate data files.`,
    difficulty: 'Intermediate',
    tags: ['tableau', 'section-11'],
  },
  {
    id: 461,
    section: 20,
    sectionTitle: 'Advanced Tableau',
    category: 'Tableau',
    question: 'What is Tableau\'s Explain Data feature?',
    answer: `An AI-assisted feature that analyzes a selected data point and
automatically suggests statistical explanations for why that value
might be unusual (e.g. correlated fields, outliers, or contributing
factors), helping speed up root-cause exploration.`,
    difficulty: 'Advanced',
    tags: ['tableau', 'section-20'],
  },
  {
    id: 462,
    section: 20,
    sectionTitle: 'Advanced Tableau',
    category: 'Tableau',
    question: 'Does Tableau support Spider/Radar charts natively?',
    answer: `Not as a built-in chart type — Tableau doesn't have a native radar
chart option, though one can be manually constructed using
trigonometric calculated fields (converting values to X/Y coordinates)
and polygon marks, which is fairly advanced.`,
    difficulty: 'Advanced',
    tags: ['tableau', 'section-20'],
  },
  {
    id: 463,
    section: 11,
    sectionTitle: 'Tableau / Data Visualization',
    category: 'Tableau',
    question: 'What is the INDEX() table calculation function used for?',
    answer: `INDEX() returns the current row's position number within the
partition of the table/view, often used to create ranking, numbering
rows, or building calculations like "highlight every 5th row."`,
    difficulty: 'Intermediate',
    tags: ['tableau', 'section-11'],
  },
  {
    id: 464,
    section: 20,
    sectionTitle: 'Advanced Tableau',
    category: 'Tableau',
    question: `What is the difference between WINDOW_SUM and a normal SUM
aggregation in Tableau?`,
    answer: `SUM() aggregates raw data rows into a single value per grouping.
WINDOW_SUM() is a table calculation that operates on the ALREADY
aggregated values currently shown in the view (e.g. summing values
across all visible rows/columns), which is computed differently and
can behave differently when filters or the view's structure change.`,
    difficulty: 'Advanced',
    tags: ['tableau', 'section-20'],
  },
  {
    id: 465,
    section: 11,
    sectionTitle: 'Tableau / Data Visualization',
    category: 'Tableau',
    question: `What is the Page Shelf used for (sometimes associated with
"motion charts")?`,
    answer: `Placing a field on the Pages shelf splits the view into a series
of "pages," one per value of that field, with playback controls — often
used to animate how a chart changes over time (e.g. quarter by
quarter).`,
    difficulty: 'Intermediate',
    tags: ['tableau', 'section-11'],
  },
  {
    id: 466,
    section: 11,
    sectionTitle: 'Tableau / Data Visualization',
    category: 'Tableau',
    question: `What is the ATTR() aggregation, and when does it show an
asterisk (*)?`,
    answer: `ATTR() returns a dimension's value if all rows in the current
aggregation share the SAME value, or displays an asterisk (*) if the
values are mixed — used internally by Tableau whenever a dimension is
placed somewhere expecting an aggregated value.`,
    difficulty: 'Intermediate',
    tags: ['tableau', 'section-11'],
  },
  {
    id: 467,
    section: 20,
    sectionTitle: 'Advanced Tableau',
    category: 'Tableau',
    question: 'What is Data Densification in Tableau?',
    answer: `A process where Tableau automatically generates additional "phantom"
data points to fill in missing combinations (e.g. dates or categories
with no underlying data rows), often needed to make line charts or
table calculations display continuously without visual gaps.`,
    difficulty: 'Advanced',
    tags: ['tableau', 'section-20'],
  },
  {
    id: 468,
    section: 11,
    sectionTitle: 'Tableau / Data Visualization',
    category: 'Tableau',
    question: `What is the difference between a Continuous and a Discrete date
field, specifically regarding the axis it creates?`,
    answer: `A Discrete date creates separate, distinct labeled headers (e.g.
individual months as blue pills), useful for exact groupings. A
Continuous date creates a true continuous axis (green pill) suitable
for trend lines, forecasting, and reference lines — since it's treated
as a measurable range rather than fixed categories.`,
    difficulty: 'Intermediate',
    tags: ['tableau', 'section-11'],
  },
  {
    id: 469,
    section: 20,
    sectionTitle: 'Advanced Tableau',
    category: 'Tableau',
    question: `What is a Custom SQL connection in Tableau, and when would you
use it?`,
    answer: `A way to connect Tableau to a data source using a hand-written SQL
query instead of Tableau's default table/join interface — used when
you need complex logic (custom joins, calculations, filtering) that's
easier to express directly in SQL, though it can be less performant
than native connections.`,
    difficulty: 'Advanced',
    tags: ['tableau', 'section-20'],
  },
  {
    id: 470,
    section: 11,
    sectionTitle: 'Tableau / Data Visualization',
    category: 'Tableau',
    question: `What is the difference between a Text Table (Crosstab) and a
Highlight Table?`,
    answer: `Both display data in a grid of rows and columns. A Text Table
shows only the raw numeric values. A Highlight Table adds background
color shading based on the measure's value, layering a heat-map effect
on top of the same tabular structure.`,
    difficulty: 'Intermediate',
    tags: ['tableau', 'section-11'],
  },
  {
    id: 471,
    section: 11,
    sectionTitle: 'Tableau / Data Visualization',
    category: 'Tableau',
    question: 'What are Tooltips in Tableau, and how can they be customized?',
    answer: `Tooltips are the pop-up details shown when hovering over a mark.
They can be customized with formatted text, additional fields, embedded
mini-charts ("Viz in Tooltip"), and even dashboard actions triggered
directly from within the tooltip.`,
    difficulty: 'Intermediate',
    tags: ['tableau', 'section-11'],
  },
  {
    id: 472,
    section: 11,
    sectionTitle: 'Tableau / Data Visualization',
    category: 'Tableau',
    question: 'What is the difference between a Filled Map and a Symbol Map?',
    answer: `A Filled Map shades entire geographic areas (e.g. states,
countries) based on a measure's value, like a choropleth map. A Symbol
Map places a marker/circle at specific geographic points, sized or
colored by a measure, without shading the underlying area.`,
    difficulty: 'Intermediate',
    tags: ['tableau', 'section-11'],
  },
  {
    id: 473,
    section: 20,
    sectionTitle: 'Advanced Tableau',
    category: 'Tableau',
    question: 'What is Tableau\'s Explain Data feature?',
    answer: `An AI-assisted feature that analyzes a selected data point and
automatically suggests statistical explanations for why that value
might be unusual (e.g. correlated fields, outliers, or contributing
factors), helping speed up root-cause exploration.`,
    difficulty: 'Advanced',
    tags: ['tableau', 'section-20'],
  },
  {
    id: 474,
    section: 20,
    sectionTitle: 'Advanced Tableau',
    category: 'Tableau',
    question: `What is the difference between FIXED, INCLUDE, and EXCLUDE LOD
expressions?`,
    answer: `FIXED computes at exactly the dimension(s) specified, ignoring
what's in the view entirely. INCLUDE computes at a finer grain than the
view by adding a dimension IN ADDITION to what's on the view. EXCLUDE
computes at a coarser grain by removing a dimension that IS on the
view — e.g. showing each order's amount alongside that customer's
overall total (FIXED), or order-level detail alongside a slightly more
granular sub-total (INCLUDE).`,
    difficulty: 'Advanced',
    tags: ['tableau', 'section-20'],
  },
  {
    id: 475,
    section: 11,
    sectionTitle: 'Tableau / Data Visualization',
    category: 'Tableau',
    question: `What changes when you Publish a workbook to Tableau Server versus
saving it locally?`,
    answer: `Publishing uploads the workbook (and optionally its data source or
extract) to a shared server where others can view/interact with it via
a browser without needing Tableau Desktop, with permissions, scheduled
refreshes, and version history managed centrally — a local save keeps
the file only on your machine, viewable only by someone with Tableau
Desktop/Reader and the file itself.`,
    difficulty: 'Intermediate',
    tags: ['tableau', 'section-11'],
  },
  {
    id: 476,
    section: 13,
    sectionTitle: 'Python for Data Analysis',
    category: 'Python',
    question: 'What is the difference between a Python module and a package?',
    answer: `A module is a single .py file containing Python code (functions,
classes, variables) that can be imported. A package is a directory of
multiple related modules, containing an __init__.py file, that can be
imported as a single namespace.`,
    difficulty: 'Beginner',
    tags: ['python', 'section-13'],
  },
  {
    id: 477,
    section: 13,
    sectionTitle: 'Python for Data Analysis',
    category: 'Python',
    question: 'What is the try/except/finally block used for?',
    answer: `Exception handling: code in \`try\` is attempted; if it raises an
error, the matching \`except\` block runs instead of crashing the
program; \`finally\` runs regardless of whether an error occurred,
commonly used for cleanup (like closing a file).`,
    pythonCode: `try:
    df = pd.read_csv("data.csv")
except FileNotFoundError:
    print("File not found — check the path")
finally:
    print("Done attempting to load data")`,
    difficulty: 'Beginner',
    tags: ['python', 'section-13'],
  },
  {
    id: 478,
    section: 13,
    sectionTitle: 'Python for Data Analysis',
    category: 'Python',
    question: 'What is the difference between *args and **kwargs?',
    answer: `*args lets a function accept any number of extra POSITIONAL
arguments, collected into a tuple. **kwargs lets a function accept any
number of extra KEYWORD arguments, collected into a dictionary.`,
    pythonCode: `def summarize(*args, **kwargs):
    print(args)     -- e.g. (1, 2, 3)
    print(kwargs)   -- e.g. {'label': 'Q1 Sales'}`,
    difficulty: 'Beginner',
    tags: ['python', 'section-13'],
  },
  {
    id: 479,
    section: 13,
    sectionTitle: 'Python for Data Analysis',
    category: 'Python',
    question: `What is the difference between a function and a method in
Python?`,
    answer: `A function is a standalone, independently callable block of code
(e.g. len(x)). A method is a function that belongs to and is called on
an object (e.g. df.head()), implicitly operating on that object's
data.`,
    difficulty: 'Beginner',
    tags: ['python', 'section-13'],
  },
  {
    id: 480,
    section: 13,
    sectionTitle: 'Python for Data Analysis',
    category: 'Python',
    question: `What are f-strings, and why are they generally preferred over
.format()?`,
    answer: `f-strings (formatted string literals, prefixed with f) let you
embed expressions directly inside a string using curly braces —
they're more readable and faster to execute than the older .format()
method or % formatting.`,
    pythonCode: `name, salary = "Bhagabata", 55000
print(f"{name} earns {salary:,.0f}")`,
    difficulty: 'Beginner',
    tags: ['python', 'section-13'],
  },
  {
    id: 481,
    section: 13,
    sectionTitle: 'Python for Data Analysis',
    category: 'Python',
    question: `What is the difference between Pandas .duplicated() and
.drop_duplicates()?`,
    answer: `.duplicated() returns a Boolean Series flagging which rows are
duplicates (True/False), useful for inspection. .drop_duplicates()
actually removes the duplicate rows and returns the cleaned DataFrame.`,
    pythonCode: `df[df.duplicated(subset="Email", keep=False)]  -- inspect all duplicate pairs
df.drop_duplicates(subset="Email", keep="first")  -- remove them`,
    difficulty: 'Beginner',
    tags: ['python', 'section-13'],
  },
  {
    id: 482,
    section: 13,
    sectionTitle: 'Python for Data Analysis',
    category: 'Python',
    question: `What is the difference between .query() and boolean indexing in
Pandas?`,
    answer: `Both filter rows based on a condition. .query() lets you write the
condition as a readable string expression (useful for long/complex
filters and referencing external variables with @). Boolean indexing
uses Python conditional syntax directly on the DataFrame — functionally
similar, mostly a readability/style choice.`,
    pythonCode: `df.query("Salary > 50000 and Department == 'Sales'")
df[(df["Salary"] > 50000) & (df["Department"] == "Sales")]`,
    difficulty: 'Beginner',
    tags: ['python', 'section-13'],
  },
  {
    id: 483,
    section: 13,
    sectionTitle: 'Python for Data Analysis',
    category: 'Python',
    question: `How do you convert a text column to a proper date type in
Pandas?`,
    answer: `Use pd.to_datetime(), which parses common date string formats
into Pandas' datetime64 dtype, enabling date arithmetic and time-based
operations.`,
    pythonCode: 'df["OrderDate"] = pd.to_datetime(df["OrderDate"], format="%d-%m-%Y")',
    difficulty: 'Beginner',
    tags: ['python', 'section-13'],
  },
  {
    id: 484,
    section: 13,
    sectionTitle: 'Python for Data Analysis',
    category: 'Python',
    question: `What is the difference between pd.to_datetime() and Python's
built-in datetime.strptime()?`,
    answer: `strptime() converts a single string to a single datetime object
and requires you to specify the exact format. pd.to_datetime() is
vectorized (works on an entire Series/column at once), can often infer
the format automatically, and integrates directly with Pandas'
datetime functionality.`,
    difficulty: 'Beginner',
    tags: ['python', 'section-13'],
  },
  {
    id: 485,
    section: 14,
    sectionTitle: 'Data Cleaning & EDA',
    category: 'Python',
    question: `What is the difference between .astype() and pd.to_numeric() for
converting data types?`,
    answer: `.astype() performs a direct type conversion and will raise an
error (or produce unexpected results) if a value can't be converted
cleanly. pd.to_numeric() is specifically built for numeric conversion
and has an \`errors="coerce"\` option to turn unconvertible values into
NaN instead of crashing — useful for messy real-world data.`,
    pythonCode: 'df["Salary"] = pd.to_numeric(df["Salary"], errors="coerce")',
    difficulty: 'Intermediate',
    tags: ['python', 'section-14'],
  },
  {
    id: 486,
    section: 13,
    sectionTitle: 'Python for Data Analysis',
    category: 'Python',
    question: `What is the difference between Matplotlib's plt.plot() and
plt.scatter()?`,
    answer: `plt.plot() draws connected lines between data points by default
(good for trends over a continuous axis like time). plt.scatter() plots
individual, unconnected points (good for showing relationships/
distribution between two variables without implying a sequence).`,
    difficulty: 'Beginner',
    tags: ['python', 'section-13'],
  },
  {
    id: 487,
    section: 13,
    sectionTitle: 'Python for Data Analysis',
    category: 'Python',
    question: 'What is Seaborn\'s sns.heatmap() used for?',
    answer: `It visualizes a matrix of values (commonly a correlation matrix)
as a grid of colored cells, making it easy to spot strong positive/
negative relationships between many variables at once.`,
    pythonCode: `import seaborn as sns
sns.heatmap(df.corr(numeric_only=True), annot=True, cmap="coolwarm")`,
    difficulty: 'Beginner',
    tags: ['python', 'section-13'],
  },
  {
    id: 488,
    section: 13,
    sectionTitle: 'Python for Data Analysis',
    category: 'Python',
    question: 'What is the difference between .corr() and .cov() in Pandas?',
    answer: `.corr() calculates the correlation coefficient (standardized,
always between -1 and 1) between columns, making strength of
relationship easy to compare across variables. .cov() calculates
covariance, which is NOT standardized and depends on the scale/units
of the variables, making it harder to interpret directly.`,
    difficulty: 'Beginner',
    tags: ['python', 'section-13'],
  },
  {
    id: 489,
    section: 13,
    sectionTitle: 'Python for Data Analysis',
    category: 'Python',
    question: `What is a Pandas crosstab, and how does it differ from
pivot_table?`,
    answer: `pd.crosstab() specifically builds a frequency table (counts, by
default) of the relationship between two or more categorical columns.
pivot_table() is more general-purpose, letting you choose the
aggregation function (sum, mean, etc.) and value columns explicitly.`,
    pythonCode: 'pd.crosstab(df["Region"], df["ProductCategory"])',
    difficulty: 'Beginner',
    tags: ['python', 'section-13'],
  },
  {
    id: 490,
    section: 13,
    sectionTitle: 'Python for Data Analysis',
    category: 'Python',
    question: `What is the difference between .rename() and .set_axis() in
Pandas?`,
    answer: `.rename() lets you rename SPECIFIC columns/index labels using a
dictionary mapping old names to new ones. .set_axis() replaces ALL of
the labels along an axis at once with a new complete list, in order.`,
    pythonCode: `df.rename(columns={"emp_name":"Name"})
df.set_axis(["Name","Dept","Salary"], axis=1)`,
    difficulty: 'Beginner',
    tags: ['python', 'section-13'],
  },
  {
    id: 491,
    section: 22,
    sectionTitle: 'Advanced Python for Data Analysis',
    category: 'Python',
    question: 'What is method chaining in Pandas, and why is it useful?',
    answer: `Method chaining links multiple Pandas operations together in a
single continuous statement (e.g. filter → groupby → sort), instead of
reassigning to intermediate variables at each step — often more
readable and avoids cluttering the namespace with temporary variables.`,
    pythonCode: `result = (df[df["Salary"] > 40000]
          .groupby("Department")["Salary"]
          .mean()
          .sort_values(ascending=False))`,
    difficulty: 'Advanced',
    tags: ['python', 'section-22'],
  },
  {
    id: 492,
    section: 13,
    sectionTitle: 'Python for Data Analysis',
    category: 'Python',
    question: `What is the difference between the default .join() behavior and
an explicit merge with how='outer'?`,
    answer: `.join() by default performs a LEFT join based on the DataFrame's
index. An explicit pd.merge(..., how='outer') keeps ALL rows from
BOTH DataFrames, filling in NaN where there's no match on either side —
the two aren't equivalent unless you explicitly set the join type.`,
    difficulty: 'Beginner',
    tags: ['python', 'section-13'],
  },
  {
    id: 493,
    section: 13,
    sectionTitle: 'Python for Data Analysis',
    category: 'Python',
    question: 'What is JSON normalization (pd.json_normalize) used for?',
    answer: `It flattens nested JSON data (e.g. from an API response, with
nested dictionaries/lists) into a flat, tabular Pandas DataFrame,
making semi-structured data usable for standard row/column analysis.`,
    pythonCode: `import pandas as pd
pd.json_normalize(api_response["results"])`,
    difficulty: 'Beginner',
    tags: ['python', 'section-13'],
  },
  {
    id: 494,
    section: 13,
    sectionTitle: 'Python for Data Analysis',
    category: 'Python',
    question: `What is the difference between reading a file with Python's
built-in open() versus pd.read_csv()?`,
    answer: `open() gives you raw, line-by-line text access to a file with no
automatic parsing — you'd need to manually split/parse each line.
pd.read_csv() automatically parses delimited data directly into a
structured DataFrame, handling headers, data types, and encoding
issues with far less code.`,
    difficulty: 'Beginner',
    tags: ['python', 'section-13'],
  },
  {
    id: 495,
    section: 13,
    sectionTitle: 'Python for Data Analysis',
    category: 'Python',
    question: `What is a good practice for exception handling when reading
external data files in a script?`,
    answer: `Wrap the read operation in a try/except block catching specific,
expected exceptions (FileNotFoundError, pd.errors.ParserError,
UnicodeDecodeError), log or print a clear message about what went
wrong, and avoid a bare \`except:\` that silently swallows unrelated
errors and makes debugging harder.`,
    difficulty: 'Beginner',
    tags: ['python', 'section-13'],
  },
  {
    id: 496,
    section: 22,
    sectionTitle: 'Advanced Python for Data Analysis',
    category: 'Python',
    question: `What is a Python set, and how does it differ from a list for
deduplication tasks?`,
    answer: `A set is an unordered collection of unique elements — converting a
list to a set automatically removes duplicates, and membership checks
(\`x in my_set\`) are much faster than in a list for large collections,
since sets use hashing internally.`,
    pythonCode: 'unique_ids = set(df["CustomerID"])',
    difficulty: 'Advanced',
    tags: ['python', 'section-22'],
  },
  {
    id: 497,
    section: 13,
    sectionTitle: 'Python for Data Analysis',
    category: 'Python',
    question: `What is the difference between == and .equals() when comparing
two Pandas DataFrames?`,
    answer: `df1 == df2 compares element-by-element and returns a DataFrame of
True/False values (and raises an error if shapes don't match).
df1.equals(df2) returns a single True/False indicating whether the two
DataFrames are identical in shape, values, AND dtypes, treating NaNs
in the same position as equal.`,
    difficulty: 'Beginner',
    tags: ['python', 'section-13'],
  },
  {
    id: 498,
    section: 13,
    sectionTitle: 'Python for Data Analysis',
    category: 'Python',
    question: `What is the difference between using inplace=True and
reassignment in Pandas operations?`,
    answer: `inplace=True modifies the original DataFrame directly and returns
None. Reassignment (df = df.dropna()) creates a new DataFrame object
with the change applied, leaving the option to keep the original
around — reassignment is generally the more predictable, recommended
style, since inplace can sometimes silently fail or behave
inconsistently depending on the operation.`,
    difficulty: 'Beginner',
    tags: ['python', 'section-13'],
  },
  {
    id: 499,
    section: 22,
    sectionTitle: 'Advanced Python for Data Analysis',
    category: 'Python',
    question: `What is the SettingWithCopyWarning in Pandas, and what typically
causes it?`,
    answer: `A warning Pandas raises when you try to modify a DataFrame that
might be a "view" (a reference) rather than an independent copy of the
original data — commonly caused by chained indexing like
df[df.A > 5]["B"] = 10. Fix it by using .loc explicitly, or by making
an intentional copy first with .copy().`,
    pythonCode: 'df.loc[df["A"] > 5, "B"] = 10  -- correct approach',
    difficulty: 'Advanced',
    tags: ['python', 'section-22'],
  },
  {
    id: 500,
    section: 13,
    sectionTitle: 'Python for Data Analysis',
    category: 'Python',
    question: 'What is the difference between NaN and None in Pandas?',
    answer: `None is Python's generic "no value" object and can appear in
object-dtype columns. NaN (Not a Number, from NumPy) is the standard
placeholder Pandas uses for missing NUMERIC data and supports
vectorized math/comparison operations that treat it consistently as
missing — Pandas often silently converts None to NaN in numeric
columns for this reason.`,
    difficulty: 'Beginner',
    tags: ['python', 'section-13'],
  },
];

// ============================================
// SECTIONS METADATA
// ============================================
export const sections = [
  { id: 1, title: 'SQL Basics', category: 'SQL', questionRange: [1, 417] },
  { id: 2, title: 'SQL Joins', category: 'SQL', questionRange: [11, 406] },
  { id: 3, title: 'Aggregate Functions', category: 'SQL', questionRange: [21, 424] },
  { id: 4, title: 'Query Writing', category: 'SQL', questionRange: [31, 423] },
  { id: 5, title: 'Scenario-Based SQL', category: 'SQL', questionRange: [41, 50] },
  { id: 6, title: 'Advanced SQL', category: 'SQL', questionRange: [51, 419] },
  { id: 7, title: 'Database Concepts', category: 'SQL', questionRange: [61, 422] },
  { id: 8, title: 'Data Analyst SQL', category: 'SQL', questionRange: [71, 80] },
  { id: 9, title: 'Interview Closing Questions', category: 'Behavioral', questionRange: [81, 90] },
  { id: 10, title: 'Excel for Data Analysts', category: 'Excel', questionRange: [91, 449] },
  { id: 11, title: 'Tableau / Data Visualization', category: 'Tableau', questionRange: [106, 475] },
  { id: 12, title: 'Statistics & Probability', category: 'Statistics', questionRange: [121, 135] },
  { id: 13, title: 'Python for Data Analysis', category: 'Python', questionRange: [136, 500] },
  { id: 14, title: 'Data Cleaning & EDA', category: 'Python', questionRange: [151, 485] },
  { id: 15, title: 'Data Governance & Data Quality', category: 'Data Governance', questionRange: [161, 170] },
  { id: 16, title: 'Power BI', category: 'Power BI', questionRange: [171, 180] },
  { id: 17, title: 'Business / Case / Behavioral Questions', category: 'Behavioral', questionRange: [181, 190] },
  { id: 18, title: 'General Data Analyst Concepts', category: 'General', questionRange: [191, 200] },
  { id: 19, title: 'Advanced Excel Functions & Analysis', category: 'Excel', questionRange: [201, 450] },
  { id: 20, title: 'Advanced Tableau', category: 'Tableau', questionRange: [216, 474] },
  { id: 21, title: 'SQL Window Functions & Query Optimization', category: 'SQL', questionRange: [231, 425] },
  { id: 22, title: 'Advanced Python for Data Analysis', category: 'Python', questionRange: [246, 499] },
  { id: 23, title: 'Advanced / Business Statistics', category: 'Statistics', questionRange: [261, 275] },
  { id: 24, title: 'Data Warehousing, ETL & Data Pipelines', category: 'Data Governance', questionRange: [276, 290] },
  { id: 25, title: 'Data Privacy, Compliance & Governance', category: 'Data Governance', questionRange: [291, 300] },
  { id: 26, title: 'Advanced Power BI & DAX', category: 'Power BI', questionRange: [301, 310] },
  { id: 27, title: 'Business Analytics & KPI Frameworks', category: 'General', questionRange: [311, 325] },
  { id: 28, title: 'Behavioral & Career Development Questions', category: 'Behavioral', questionRange: [326, 340] },
  { id: 29, title: 'Data Analyst Toolkit (Git, Jupyter, Google Sheets)', category: 'General', questionRange: [341, 350] },
  { id: 30, title: 'Machine Learning Fundamentals for Analysts', category: 'Machine Learning', questionRange: [351, 365] },
  { id: 31, title: 'Domain-Specific Analytics (Finance, Marketing, HR)', category: 'General', questionRange: [366, 375] },
  { id: 32, title: 'Stakeholder Communication & Case Studies', category: 'Behavioral', questionRange: [376, 390] },
  { id: 33, title: 'Final Case Study & Scenario Questions', category: 'General', questionRange: [391, 400] },
];
