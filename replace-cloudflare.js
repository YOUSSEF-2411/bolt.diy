import fs from 'fs';
import path from 'path';

const ROOT_DIR = process.cwd(); // جذر المشروع
const EXTENSIONS = ['.ts', '.tsx', '.js', '.jsx', '.json']; // أنواع الملفات اللي هيتعدل فيها

function replaceImports(dir) {
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const fullPath = path.join(dir, file);
    const stats = fs.statSync(fullPath);

    if (stats.isDirectory()) {
      replaceImports(fullPath); // يدخل على كل المجلدات
    } else if (EXTENSIONS.includes(path.extname(file))) {
      let content = fs.readFileSync(fullPath, 'utf-8');
      const newContent = content
        .replace(/@remix-run\/cloudflare/g, '@remix-run/node')
        .replace(/@remix-run\/cloudflare-pages/g, '@remix-run/node');
      if (newContent !== content) {
        fs.writeFileSync(fullPath, newContent, 'utf-8');
        console.log(`✅ Updated: ${fullPath}`);
      }
    }
  });
}

replaceImports(ROOT_DIR);
console.log('🎉 All done!');
