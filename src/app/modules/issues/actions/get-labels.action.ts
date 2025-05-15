import { sleep } from '@helpers/sleep';
import { GitHubLabel } from '../interfaces';
import { environment } from 'src/environments/environment';
import { secret } from 'src/environments/environment.secret';

const BASE_URL = environment.baseUrl;
const GITHUB_TOKEN = secret.gitHubToken ;

export const getLabels = async (): Promise<GitHubLabel[]> => {


  try {
    const resp = await fetch(`${BASE_URL}/labels`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
      },
    });

    if (!resp.ok) throw "Can't load labels";

    const labels: GitHubLabel[] = await resp.json();

    return labels;
  } catch (error) {
    throw "Can't load labels";
  }
};
