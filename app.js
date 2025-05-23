// const math = require('./math');
// import math from './math.js';

// const result1 = math.add(1, 5);
// const result2 = math.subtract(10, 5);

// console.log(result1, result2);


// === 使用 Callback 方式 ===

// const fs = require('fs');

// fs.readFile('example.txt', 'utf8', (err, data) => {
//   if (err) {
//     console.error('讀檔錯誤：', err);
//     return;
//   }
//   console.log('實際內容：', data);
// });

// 練習1:

// const fs = require('fs');

// console.log('開始讀取檔案...');
// console.time('總執行時間');

// fs.readFile('file1.txt', 'utf8', (err, data1) => {
//   if (err) {
//     console.error('讀檔錯誤：', err);
//     return;
//   }
//   console.log('讀取 file1.txt 完成');

//   fs.readFile('file2.txt', 'utf8', (err, data2) => {
//     if (err) {
//       console.error('讀檔錯誤：', err);
//       return;
//     }
//     console.log('讀取 file2.txt 完成');

//     fs.readFile('file3.txt', 'utf8', (err, data3) => {
//       if (err) {
//         console.error('讀檔錯誤：', err);
//         return;
//       }
// 			console.log('讀取 file3.txt 完成');

// 			console.timeEnd('總執行時間')
//     });
//   });
// });


// === 使用 Promise 方式 ===

// const fs = require('fs').promises;

// async function demo() {
//   try {
//     const data = await fs.readFile('example.txt', 'utf8');
//     console.log('實際內容：', data);
//   } catch (err) {
//     console.error('讀檔錯誤：', err);
//   }
// }

// demo();
// console.log('測試 async/await')

// 練習2:
// const fs = require('fs').promises;

// console.log('開始讀取檔案...');
// console.time('總執行時間'); // 開始計時

// fs.readFile('file1.txt', 'utf8')
//   .then(data1 => {
//     console.log('讀取 file1.txt 完成');
//     return fs.readFile('file2.txt', 'utf8');
//   })
//   .then(data2 => {
//     console.log('讀取 file2.txt 完成');
//     return fs.readFile('file3.txt', 'utf8');
//   })
//   .then(data3 => {
//     console.log('讀取 file3.txt 完成');
//     console.timeEnd('總執行時間'); // 結束計時
//   })
//   .catch(err => {
//     console.error('讀檔錯誤：', err);
//     console.timeEnd('總執行時間'); // 確保錯誤時也結束計時
//   });

// 同步範例

// const fsSync = require('fs');

// try {
//   const data = fsSync.readFileSync('example.txt', 'utf8');
//   console.log('同步讀取內容：', data);
// } catch (err) {
//   console.error('同步讀檔錯誤：', err);
// }
// console.log('測試同步')


// 練習3:
// const fs = require('fs');

// console.log('開始讀取檔案...');
// console.time('總執行時間'); // 開始計時

// try {
//   const data1 = fs.readFileSync('file1.txt', 'utf8');
//   console.log('讀取 file1.txt 完成');

//   const data2 = fs.readFileSync('file2.txt', 'utf8');
//   console.log('讀取 file2.txt 完成');

//   const data3 = fs.readFileSync('file3.txt', 'utf8');
//   console.log('讀取 file3.txt 完成');

// } catch (err) {
//   console.error('讀檔錯誤：', err);
// }

// console.timeEnd('總執行時間'); // 結束計時

// === 使用 async/await 方式 ===


// const fs = require('fs').promises;

// 第一種

// async function readFiles() {
//   try {
//     const data1 = await fs.readFile('file1.txt', 'utf8');
//     console.log('第一個檔案：', data1);

//     const data2 = await fs.readFile('file2.txt', 'utf8');
//     console.log('第二個檔案：', data2);

//     const data3 = await fs.readFile('file3.txt', 'utf8');
//     console.log('第三個檔案：', data3);
//   } catch (err) {
//     console.error('讀檔錯誤：', err);
//   }
// }

// readFiles();


// 練習4:

// const fs = require('fs').promises;


// async function readFiles() {
// 	console.log('開始讀取檔案...');
//  console.time('總執行時間'); // 開始計時

//   try {
//     const data1 = await fs.readFile('file1.txt', 'utf8');
//     console.log('讀取 file1.txt 完成');

//     const data2 = await fs.readFile('file2.txt', 'utf8');
//     console.log('讀取 file2.txt 完成');

// 		const data3 = await fs.readFile('file3.txt', 'utf8');
//     console.log('讀取 file3.txt 完成');
//   } catch (err) {
//     console.error('讀檔錯誤：', err);
//   }
// 	console.timeEnd('總執行時間'); // 結束計時
// }

// readFiles();

// 第二種

// async function readFilesParallel() {
//   try {
//     const [file1, file2] = await Promise.all([
//       fs.readFile('file1.txt', 'utf8'),
//       fs.readFile('file2.txt', 'utf8')
//     ]);
//     console.log('file1：', file1);
//     console.log('file2：', file2);
//   } catch (err) {
//     console.error('讀檔錯誤：', err);
//   }
// }

// readFilesParallel();

// 練習5:

// const fs = require('fs').promises;


// async function readFilesParallel() {
// 	console.log('開始讀取檔案...');
//   console.time('總執行時間'); // 開始計時
//   try {
//     const [file1, file2, file3] = await Promise.all([
//       fs.readFile('file1.txt', 'utf8'),
//       fs.readFile('file2.txt', 'utf8'),
// 			fs.readFile('file3.txt', 'utf8')
//     ]);
//     console.log('讀取 file1.txt 完成');
//     console.log('讀取 file2.txt 完成');
// 		console.log('讀取 file3.txt 完成');
//   } catch (err) {
//     console.error('讀檔錯誤：', err);
//   }
// 	console.timeEnd('總執行時間'); // 結束計時
// }

// readFilesParallel();