# Updating from Upstream

This project is a rewrite of `iamcal/enchant-order`. Because the architecture changed, do NOT use `git merge upstream/main`.

## 1. Sync Languages

Merge new upstream translations into `public/languages/*.json`:

```bash
npm run sync:upstream
git diff public/languages/
```

## 2. Sync Logic & Styles

Upstream logic, styles, or HTML must be ported to React manually. To see all code changes (excluding language files) since last sync:

```bash
git fetch upstream
git log --patch --stat HEAD..upstream/main -- . ":(exclude)languages"
```
