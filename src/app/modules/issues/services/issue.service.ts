import { Injectable, signal } from '@angular/core';
import {
  injectQuery,
  injectQueryClient,
} from '@tanstack/angular-query-experimental';
import { getIssuCommentsByNumber, getIssueByNumber } from '../actions';
import { GitHubIssue } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class IssueService {
  private issueNumber = signal<string | null>(null);
  private queryClient = injectQueryClient();

  public issueQuery = injectQuery(() => ({
    queryKey: ['issues', this.issueNumber()],
    queryFn: () => getIssueByNumber(this.issueNumber()!),
    enabled: this.issueNumber() !== null,
  }));

  // issueCommentsQuery
  // queryKey: issue, issueNumber, 'comments'
  public issueCommentsQuery = injectQuery(() => ({
    queryKey: ['issues', this.issueNumber(), 'comments'],
    queryFn: () => getIssuCommentsByNumber(this.issueNumber()!),
    enabled: this.issueNumber() !== null,
  }));

  setIssueNumber(issueId: string) {
    this.issueNumber.set(issueId);
  }

  prefetchIssue(issueId: string) {
    this.queryClient.prefetchQuery({
      queryKey: ['issues', issueId],
      queryFn: () => getIssueByNumber(issueId),
      staleTime: 1000 * 60 * 5,
    });
  }

  setIssueData(issue: GitHubIssue) {
    this.queryClient.setQueryData(['issues', issue.number.toString()], issue, {
      updatedAt: Date.now() + 100 * 60,
    });
  }
}
