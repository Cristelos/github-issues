import { sleep } from '@helpers/sleep';
import { GitHubIssue } from '../interfaces';
import { environment } from 'src/environments/environment';
import { secret } from 'src/environments/environment.secret';

const BASE_URL = environment.baseUrl;
const GITHUB_TOKEN = secret.gitHubToken;

export const getIssueByNumber = async (
  issueNumber: string
): Promise<GitHubIssue> => {
  try {
    const resp = await fetch(`${BASE_URL}/issues/${issueNumber}`, {
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
      },
    });

    if (!resp.ok) throw "Can't load issue";

    const issue: GitHubIssue = await resp.json();

    return issue;
  } catch (error) {
    throw `Can't load issue ${issueNumber}`;
  }
};
