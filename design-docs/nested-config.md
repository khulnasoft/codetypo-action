The nearest configuration file should be responsible for excluding local files.
The principle is that the configuration deeper in the directory tree has
more knowledge than higher up in the tree.

A deeper configuration can be used to exclude more files than are excluded
by the global configuration. But a deeper configuration can add more files
for checking.

In this nested example

Directory Tree

```
root
├── codetypo.json
└── folder
    ├── codetypo.json
    ├── dist
    │   └── code.js
    └── src
        └── code.ts
```

**codetypo.json**

```
{
    "ignorePaths": []
}
```

**folder/codetypo.json**

```
{
    "ignorePaths": ["dist"]
}
```

| checked | file                  |
| ------- | --------------------- |
| ✅      | `folder/src/code.ts`  |
| ❌      | `folder/dist/code.js` |
