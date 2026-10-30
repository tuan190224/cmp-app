# Lịch nội dung màn chào

Sửa `welcomeMessages.json` để thay câu mặc định hoặc thêm câu theo khoảng thời gian.

- `defaultMessage.text` hiển thị khi không có lịch nào đang hoạt động.
- Thêm các mục vào `scheduledMessages` với `text`, `startsAt` và `endsAt`.
- Dùng thời gian ISO 8601 kèm múi giờ, ví dụ `2026-11-01T08:00:00+07:00`.
- Nếu các lịch bị trùng nhau, mục có `priority` cao hơn sẽ được chọn.

Ví dụ một mục lịch:

```json
{
  "id": "tet-message",
  "text": "Nội dung lời chào theo lịch",
  "startsAt": "2027-02-05T00:00:00+07:00",
  "endsAt": "2027-02-15T23:59:59+07:00",
  "priority": 1
}
```
