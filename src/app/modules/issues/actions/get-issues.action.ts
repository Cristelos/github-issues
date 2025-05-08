import { sleep } from '@helpers/sleep';
import { GitHubIssue } from '../interfaces';
import { environment } from 'src/environments/environment';
import { secret } from 'src/environments/environment.secret';

const BASE_URL = environment.baseUrl;
const GITHUB_TOKEN = secret.gitHubToken;

export const getIssues = async (): Promise<GitHubIssue[]> => {
  await sleep(1500);

  try {
    const resp = await fetch(`${BASE_URL}/issues`, {
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
      },
    });

    if (!resp.ok) throw "Can't load issues";

    const issues: GitHubIssue[] = await resp.json();

    return issues;
  } catch (error) {
    throw "Can't load issues";
  }
};
