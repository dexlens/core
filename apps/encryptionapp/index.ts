import { decrypt, encrypt } from "@dexlens/core";

let string = "";
let password = "";

let encrypted = encrypt(string, password);
let decrypted = decrypt(encrypted, password);

Deno.writeTextFileSync("./out.json", JSON.stringify({
    decrypted,
    encrypted,
}, null, 2));