import { environment } from 'src/environments/environment';
import { secret } from 'src/environments/environment.secret';
import { getIssuCommentsByNumber } from './get-issue-comments-by-number.action';

const BASE_URL = environment.baseUrl;
const GITHUB_TOKEN = secret.gitHubToken;

const issueNumber = '123';
const mockComments: any[] = [
  { id: 1, body: 'First comment', user: { login: 'user1' } },
  { id: 2, body: 'Second comment', user: { login: 'user2' } },
]

describe('GetIssueCommetsByNumber action', () => {

  it('should fetch issue comments succesfully', async () => {
    const requestURL = `${BASE_URL}/issues/${issueNumber}/comments`;
    const issueCommentsResponse = new Response(JSON.stringify(mockComments), {
      status: 200,
      statusText: 'OK',
    });

    spyOn(window, 'fetch').and.resolveTo(issueCommentsResponse);

    const issue = await getIssuCommentsByNumber(issueNumber);

    expect(window.fetch).toHaveBeenCalledWith(requestURL, {
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
      },
    });
  });

  it('should throw an error if the response is not', async () => {
    const requestURL = `${BASE_URL}/issues/${issueNumber}/comments`;
    const issueCommentsResponse = new Response(null, {
      status: 404,
      statusText: 'Not Found',
    });

    spyOn(window, 'fetch').and.resolveTo(issueCommentsResponse);

    try {
      const issue = await getIssuCommentsByNumber(issueNumber);
      expect(true).toBeFalse();
    } catch (error) {
      expect(error).toBe(`Can't load issue comment ${issueNumber}`);
    }
  });

});
