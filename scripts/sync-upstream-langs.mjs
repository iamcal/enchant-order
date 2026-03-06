#!/usr/bin/env node

/**
 * sync-upstream-langs.mjs
 * 
 * Fetches the upstream repository (iamcal/enchant-order) and deep-merges 
 * updated translation keys from upstream into the local public/languages/ JSON files. 
 * Local custom keys are preserved.
 */


import {execSync} from 'node:child_process';
import {readFileSync, writeFileSync, existsSync} from 'node:fs';
import {join} from 'node:path';

const ROOT = new URL('..', import.meta.url).pathname.replace(/^\/([A-Z]:)/, '$1');
const LOCAL_DIR = join(ROOT, 'public', 'languages');

function deepMerge(local, upstream) {
    const result = {...local};
    for (const [key, upVal] of Object.entries(upstream)) {
        if (!(key in result)) {
            result[key] = upVal;
        } else if (
            typeof upVal === 'object' && upVal !== null && !Array.isArray(upVal) &&
            typeof result[key] === 'object' && result[key] !== null && !Array.isArray(result[key])
        ) {
            result[key] = deepMerge(result[key], upVal);
        }
    }
    return result;
}

console.log('Fetching upstream...');
execSync('git fetch upstream', {cwd: ROOT, stdio: 'inherit'});

const lsOutput = execSync('git ls-tree --name-only upstream/main languages/', {cwd: ROOT, encoding: 'utf-8'});
const files = lsOutput.trim().split('\n').filter(f => f.endsWith('.json'));

let added = 0, updated = 0, skipped = 0;

for (const upstreamPath of files) {
    const filename = upstreamPath.split('/').pop();
    const localPath = join(LOCAL_DIR, filename);

    const upstreamRaw = execSync(`git show upstream/main:${upstreamPath}`, {cwd: ROOT, encoding: 'utf-8'});
    const upstreamJson = JSON.parse(upstreamRaw);

    if (!existsSync(localPath)) {
        writeFileSync(localPath, JSON.stringify(upstreamJson, null, 4) + '\n', 'utf-8');
        console.log(`  + ${filename} (new)`);
        added++;
        continue;
    }

    const localRaw = readFileSync(localPath, 'utf-8');
    const localJson = JSON.parse(localRaw);
    const merged = deepMerge(localJson, upstreamJson);
    const mergedStr = JSON.stringify(merged, null, 4) + '\n';

    if (mergedStr !== localRaw) {
        writeFileSync(localPath, mergedStr, 'utf-8');
        console.log(`  ~ ${filename}`);
        updated++;
    } else {
        skipped++;
    }
}

console.log(`\nDone. ${added} added, ${updated} updated, ${skipped} unchanged.`);
