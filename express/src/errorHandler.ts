import { writeFileSync } from "fs";

const logPath = './log/'
interface IReason{
  message:string;
}
process.on('unhandledRejection', (reason:IReason) => {
  writeFileSync(`${logPath}error.log`, `\nUnhandled rejection detected: ${reason.message}`, {flag: 'a'})
  console.error(`Unhandled rejection detected: ${reason.message}`);
});

process.on('uncaughtException', (error:Error) => {
  writeFileSync(`${logPath}error.log`, `\nCaptured error: ${error.message}`, {flag: 'a'})
  console.error(`Captured error: ${error.message}`);
  process.exit(1);
});
