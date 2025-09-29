import { NextResponse } from 'next/server';
import { exec } from 'child_process';

export async function GET() {
    return new Promise((resolve) => {
        exec('git log -1 --format=%H', (error, stdout, stderr) => {
            if (error) {
                console.error(`exec error: ${error}`);
                return resolve(NextResponse.json({ error: 'Failed to get commit ID' }, { status: 500 }));
            }
            if (stderr) {
                console.error(`stderr: ${stderr}`);
                return resolve(NextResponse.json({ error: 'Failed to get commit ID' }, { status: 500 }));
            }
            const commitId = stdout.trim();
            resolve(NextResponse.json({ commitId }));
        });
    });
}
