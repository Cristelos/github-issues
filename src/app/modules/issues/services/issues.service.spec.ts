import { TestBed } from '@angular/core/testing';
import {
  provideQueryClient,
  QueryClient,
} from '@tanstack/angular-query-experimental';
import { issuesService } from './issues.service';
import { State } from '../interfaces';

describe('IssuesService', () => {
  let service: issuesService;
  const queryClient = new QueryClient();

  beforeEach(() => {
    TestBed.configureTestingModule({
      teardown: {
        destroyAfterEach: false,
      },
      providers: [provideQueryClient(queryClient)],
    });
    service = TestBed.inject(issuesService);
  });

  it('should be create', () => {
    expect(service).toBeTruthy();
  });

  it('should load labels', async () => {
    // console.log(service.labelsQuery.data());
    const { data } = await service.labelsQuery.refetch();
    expect(data?.length).toBe(30);

    const [label] = data!;

    expect(typeof label.color).toBe('string');
    expect(typeof label.default).toBe('boolean');
    expect(typeof label.description).toBe('string');
    expect(typeof label.id).toBe('number');
    expect(typeof label.name).toBe('string');
    expect(typeof label.node_id).toBe('string');
    expect(typeof label.url).toBe('string');
  });

  it('should set selected state, OPEN, CLOSED, ALL', async () => {
    service.showIssuesByState(State.Closed);
    expect(service.selectedState()).toBe(State.Closed);

    const { data } = await service.issuesQuery.refetch();

    data?.forEach((issue) => {
      expect(issue.state).toBe(State.Closed);
    });

    service.showIssuesByState(State.Open);
    const { data: dataOpen } = await service.issuesQuery.refetch();

    dataOpen?.forEach((issue) => {
      expect(issue.state).toBe(State.Open);
    });
  });

  it('should set selectedLabels', async () => {
    service.toggleLabel('Accesibility');

    expect(service.selectedLabels().has('Accesibility')).toBeTrue();
  });

  it('should set selectedLabels and get issues by label', async () => {
    const label = 'Accesibility';
    service.toggleLabel(label);
    expect(service.selectedLabels().has(label)).toBeTrue();

    const { data } = await service.issuesQuery.refetch();

    data?.forEach((issue) => {
      const hasLabel = issue.labels.some((l) => l.name === label);
      expect(hasLabel).toBeTrue();
    });
  });
});
