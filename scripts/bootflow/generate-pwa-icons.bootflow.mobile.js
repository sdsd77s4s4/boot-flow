/**
 * Script para gerar ícones PWA
 * Execute: node scripts/bootflow/generate-pwa-icons.bootflow.mobile.js
 */

const fs = require('fs');
const path = require('path');

const sizes = [192, 512];
const outputDir = path.join(__dirname, '../../public/icons');

// Criar diretório se não existir
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

console.log('📱 Gerando ícones PWA...');
console.log('');
console.log('⚠️  ATENÇÃO: Este script cria arquivos placeholder.');
console.log('   Substitua os arquivos gerados por ícones reais do Boot Flow.');
console.log('');

// Criar SVGs placeholder (substituir por ícones reais)
sizes.forEach((size) => {
  const svg = `
<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${size}" height="${size}" fill="#0B0B0F"/>
  <text x="50%" y="50%" font-family="Arial" font-size="${size / 4}" fill="#7e22ce" text-anchor="middle" dominant-baseline="middle">BF</text>
</svg>
  `.trim();

  const svgPath = path.join(outputDir, `bootflow-${size}-maskable.svg`);
  fs.writeFileSync(svgPath, svg);
  console.log(`✅ Criado: ${svgPath}`);
});

console.log('');
console.log('📝 Próximos passos:');
console.log('   1. Substitua os SVGs por ícones reais do Boot Flow');
console.log('   2. Converta para PNG usando ferramentas como ImageMagick ou online converters');
console.log('   3. Certifique-se de que os ícones são "maskable" (com padding de 20%)');
console.log('   4. Coloque os PNGs em public/icons/');
console.log('');

