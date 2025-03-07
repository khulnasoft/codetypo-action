import type { CodeTypoReporter } from 'codetypo';
import { type CodeTypoApplicationOptions, lint as codetypoAppLint } from 'codetypo';

export interface LintOptions {
    root: string;
    config?: string;
    /**
     * Check files and directories starting with `.`.
     * - `true` - glob searches will match against `.dot` files.
     * - `false` - `.dot` files will NOT be checked.
     * - `undefined` - glob patterns can match explicit `.dot` patterns.
     */
    checkDotFiles: boolean | undefined;
    files?: string[] | undefined;
    showSuggestions?: boolean;
}

/**
 * Spell check files.
 * @param globs - files or glob patterns to check
 * @param root - the root directory to scan
 * @param reporter - reporter to use.
 */
export async function lint(globs: string[], lintOptions: LintOptions, reporter: CodeTypoReporter): Promise<void> {
    const { root, config, checkDotFiles, files, showSuggestions } = lintOptions;
    // It is expected that `files` in the configuration will be used to filter the files.
    const mustFindFiles = !files;
    const options: CodeTypoApplicationOptions = {
        root,
        config,
        files,
        // filterFiles: files ? false : undefined,
        mustFindFiles,
        showSuggestions,
    };

    if (checkDotFiles) {
        options.dot = true;
    } else if (checkDotFiles === false) {
        options.dot = false;
    }
    // console.warn('lint: %o', { globs, lintOptions, options });
    await codetypoAppLint(globs, options, reporter);
}
