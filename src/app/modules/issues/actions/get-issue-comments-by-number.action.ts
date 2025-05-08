import { sleep } from '@helpers/sleep';
import { GitHubIssue } from '../interfaces';
import { environment } from 'src/environments/environment';
import { secret } from 'src/environments/environment.secret';

const BASE_URL = environment.baseUrl;
const GITHUB_TOKEN = secret.gitHubToken;

export const getIssuCommentsByNumber = async (
  issueNumber: string
): Promise<GitHubIssue[]> => {
  await sleep(1500);

  try {
    const resp = await fetch(`${BASE_URL}/issues/${issueNumber}/comments`, {
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
      },
    });

    if (!resp.ok) throw "Can't load issue";

    const issueComment: GitHubIssue[] = await resp.json();

    return issueComment;
  } catch (error) {
    throw "Can't load issue comment";
  }
};
