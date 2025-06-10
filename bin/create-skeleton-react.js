#!/usr/bin/env node
'use strict';

const chalk = require('chalk');
const inquirer = require('inquirer');
const ora = require('ora');
const path = require('path');
const fs = require('fs');
const { execSync } = require('child_process');

const AUTHOR_NAME = 'Gabriel Cirqueira';
const CLI_NAME = 'create-skeleton-react';
const NPM_USER = 'oldgabriel';

console.log(
  chalk.hex('#61DAFB').bold(`
   _____ _ _       _         _____        _       _     
  / ____| (_)     | |       / ____|      | |     | |    
 | (___ | |_  ___ | | ___  | |  __   ___ | |_ ___| |__  
  \\___ \\| | |/ _ \\| |/ _ \\ | | |_ | / _ \\| __/ __| '_ \\ 
  ____) | | | (_) | |  __/ | |__| || (_) | || (__| | | |
 |_____/|_|_|\\___/|_|\\___|  \\____(_)\\___/ \\__\\___|_| |_|
                                                        
             by OldGabriel                             
`)
);

console.log(chalk.hex('#FFA500')(`\n🚀 Bem-vindo ao Skeleton React by ${AUTHOR_NAME}\n`));

function copyFolderRecursiveSync(source, target) {
  if (!fs.existsSync(target)) fs.mkdirSync(target, { recursive: true });
  
  const files = fs.readdirSync(source);
  files.forEach(file => {
    const curSource = path.join(source, file);
    const curTarget = path.join(target, file);
    
    if (fs.lstatSync(curSource).isDirectory()) {
      copyFolderRecursiveSync(curSource, curTarget);
    } else {
      fs.copyFileSync(curSource, curTarget);
    }
  });
}

async function main() {
  try {
    const { projectName } = await inquirer.prompt({
      type: 'input',
      name: 'projectName',
      message: chalk.cyan('📛 Qual o nome do seu projeto?'),
      validate: input => input.trim() !== '' || 'Por favor, insira um nome válido'
    });

    const { version } = await inquirer.prompt({
      type: 'list',
      name: 'version',
      message: chalk.cyan('🌈 Qual versão do template você deseja usar?'),
      choices: [
        {
          name: chalk`{bold Versão 1} {gray (Chakra UI v2.10)}`,
          value: 'v1'
        },
        {
          name: chalk`{bold Versão 2} {gray (Chakra UI v3.20)}`,
          value: 'v2'
        }
      ]
    });

    const targetPath = path.resolve(process.cwd(), projectName);
    
    if (fs.existsSync(targetPath)) {
      console.log(chalk.red(`\n❌ A pasta "${projectName}" já existe!`));
      process.exit(1);
    }

    const spinner = ora(chalk`{blue ⏳ Criando projeto "${projectName}"...}`).start();

    copyFolderRecursiveSync(
      path.join(__dirname, '..', 'versions', version),
      targetPath
    );

    const packageJsonPath = path.join(targetPath, 'package.json');
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    packageJson.name = projectName.toLowerCase().replace(/\s+/g, '-');
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

    spinner.succeed(chalk.green(`✅ Projeto "${projectName}" criado com sucesso!`));

    const { installDeps } = await inquirer.prompt({
      type: 'confirm',
      name: 'installDeps',
      message: chalk.cyan('📦 Deseja instalar as dependências agora?'),
      default: true
    });

    if (installDeps) {
      const installSpinner = ora(chalk.blue('⏳ Instalando dependências...')).start();
      try {
        execSync('npm install', { cwd: targetPath, stdio: 'ignore' });
        installSpinner.succeed(chalk.green('✅ Dependências instaladas com sucesso!'));
      } catch (error) {
        installSpinner.fail(chalk.red('❌ Erro ao instalar dependências'));
        console.log(chalk`{gray Você pode instalá-las manualmente executando {bold npm install}}`);
      }
    }

    // Mensagem final
    console.log(chalk`\n🎉 {bold Pronto!} Seu projeto está configurado e pronto para uso!`);
    console.log(chalk`\n{bold Para começar:}`);
    console.log(chalk`  {bold cd ${projectName}}`);
    if (!installDeps) console.log(chalk`  {bold npm install}`);
    console.log(chalk`  {bold npm run dev}\n`);
    console.log(chalk`{gray Obrigado por usar meu skeleton para seu projeto React... by ${AUTHOR_NAME}! 👋\n}`);

  } catch (error) {
    console.error(chalk.red('\n❌ Ocorreu um erro durante a criação do projeto:'));
    console.error(error);
    process.exit(1);
  }
}

main();