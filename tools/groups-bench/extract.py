import re,sys
src=open('/home/claude/melo/github/src-tauri/src/library_db.rs',encoding='utf-8').read()
def fn_block(name, sig_prefix):
    i=src.index(sig_prefix)
    # include preceding doc comments/attributes? not needed
    j=src.index('{',i)
    depth=0;k=j
    in_str=False
    # brace matching that skips string/raw string/char literals crudely
    while True:
        c=src[k]
        if src.startswith('r#"',k):
            k=src.index('"#',k+3)+2; continue
        if c=='"':
            k+=1
            while src[k]!='"':
                if src[k]=='\\': k+=1
                k+=1
            k+=1; continue
        if c=="'" and src[k+2:k+3]=="'" : k+=3; continue
        if c=="'" and src[k+1]=='\\' : k=src.index("'",k+2)+1; continue
        if c=='{': depth+=1
        if c=='}':
            depth-=1
            if depth==0: return src[i:k+1]
        k+=1
parts=[]
parts.append("use rusqlite::{params, params_from_iter, Connection, OptionalExtension, ToSql};\nuse serde::Serialize;\n")
parts.append("#[derive(Debug, Serialize)]\n#[serde(rename_all = \"camelCase\")]\npub struct GroupRow {\n pub key: String, pub name: String, pub subtitle: String, pub count: i64, pub cover: Option<String>, pub artwork_track_id: Option<String>,\n}\n#[derive(Debug, Serialize)]\n#[serde(rename_all = \"camelCase\")]\npub struct Page<T> { pub items: Vec<T>, pub total: i64, pub limit: usize, pub offset: usize }\n")
for n,sig in [("like_escape","fn like_escape("),("search_pattern","fn search_pattern("),("table_has_column","fn table_has_column("),("init_schema","fn init_schema("),("query_groups","fn query_groups(")]:
    b=fn_block(n,sig)
    b=b.replace("fn ","pub fn ",1) if b.startswith("fn ") else b
    parts.append(b+"\n")
open('src/prod.rs','w',encoding='utf-8').write("\n".join(parts))
print("extracted", len("\n".join(parts)), "bytes")
