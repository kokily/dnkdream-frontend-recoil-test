interface NoticeType {
  id: string;
  title: string;
  body: string;
  thumbnail?: string;
  tags: string[];
  created_at: Date;
  updated_at: Date;
}
