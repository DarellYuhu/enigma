export class FacebookGraphResponseDto {
  data: {
    id: string;
    title: string;
    name: string;
    description: string;
    period: string;
    values: { value: number; end_time?: Date }[];
  }[];
  paging: { nest: string; previous: string };
}
