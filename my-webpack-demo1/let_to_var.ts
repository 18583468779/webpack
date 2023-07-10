import { parse } from "@babel/parser";
import traverse from "@babel/traverse";
import generate from "@babel/generator";

const code = `let a = 'let' ; let b = 123123`;
//将code转换为ast
const ast = parse(code, { sourceType: "module" });
// console.log(ast);
//遍历ast,enter表示每进入一个节点就获取一个信息
traverse(ast, {
  enter: (item) => {
    if (item.node.type == "VariableDeclaration") {
      if (item.node.kind === "let") {
        item.node.kind = "var";
      }
    }
  },
});
//将ast转换为code
const result = generate(ast, {}, code);

console.log(result.code);
