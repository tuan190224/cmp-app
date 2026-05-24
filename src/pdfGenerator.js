import pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

// FIX LỖI VITE KHÔNG NHẬN DIỆN ĐƯỢC vfs_fonts
let vfs = {};
if (pdfFonts.pdfMake && pdfFonts.pdfMake.vfs) {
  vfs = pdfFonts.pdfMake.vfs;
} else if (pdfFonts.vfs) {
  vfs = pdfFonts.vfs;
} else if (pdfFonts.default) {
  vfs = pdfFonts.default.pdfMake ? pdfFonts.default.pdfMake.vfs : pdfFonts.default.vfs;
}
pdfMake.vfs = vfs;

export const generatePDF = (scores, gender, sortedResults) => {
  const today = new Date().toLocaleDateString('vi-VN', {
    year: 'numeric', month: 'long', day: 'numeric'
  });

  const mainConstitution = sortedResults.find(r => 
    !r.name.includes('Bình Hòa') && r.score >= 40
  );

  const docDefinition = {
    pageSize: 'A4',
    pageMargins: [40, 60, 40, 60],
    info: {
      title: 'Kết Quả Khảo Sát Thể Chất Đông Y (CCMQ)',
      author: 'CCMQ App',
      subject: 'Báo cáo thể chất',
    },
    header: {
      columns: [
        { text: 'CCMQ - Khảo sát Thể chất Đông y', style: 'headerLeft' },
        { text: today, style: 'headerRight' }
      ],
      margin: [40, 20, 40, 0]
    },
    footer: (currentPage, pageCount) => ({
      text: `Trang ${currentPage} / ${pageCount}`,
      alignment: 'center',
      style: 'footer'
    }),
    content: [
      { text: 'KẾT QUẢ KHẢO SÁT THỂ CHẤT', style: 'mainTitle' },
      { text: 'Theo bảng hỏi Constitution in Chinese Medicine Questionnaire (CCMQ)', style: 'subTitle' },
      { canvas: [{ type: 'line', x1: 0, y1: 5, x2: 515, y2: 5, lineWidth: 1, lineColor: '#10b981' }] },
      
      {
        margin: [0, 15, 0, 10],
        table: {
          widths: ['*', '*'],
          body: [
            [ { text: 'Giới tính:', style: 'infoLabel' }, { text: gender === 'male' ? 'Nam' : 'Nữ', style: 'infoValue' } ],
            [ { text: 'Ngày khảo sát:', style: 'infoLabel' }, { text: today, style: 'infoValue' } ],
            [ { text: 'Thể chất chủ đạo:', style: 'infoLabel' }, { text: mainConstitution ? mainConstitution.name : 'Cân bằng / Chưa xác định', style: 'infoValue', color: mainConstitution ? '#c2410c' : '#059669' } ]
          ]
        },
        layout: 'noBorders'
      },

      { text: 'Tổng quan kết quả', style: 'sectionTitle' },
      {
        text: 'Kết quả dưới đây được tính toán dựa trên câu trả lời của bạn trong khoảng thời gian một năm qua, theo công thức chuẩn hóa của CCMQ. Đây là thông tin tham khảo để hỗ trợ chăm sóc sức khỏe chủ động, không thay thế chẩn đoán y khoa.',
        style: 'bodyText',
        margin: [0, 0, 0, 15]
      },

      { text: 'Bảng điểm các thể chất', style: 'sectionTitle' },
      {
        table: {
          headerRows: 1,
          widths: ['*', 60, 80],
          body: [
            [
              { text: 'Thể chất', style: 'tableHeader' },
              { text: 'Điểm', style: 'tableHeader', alignment: 'center' },
              { text: 'Đánh giá', style: 'tableHeader', alignment: 'center' }
            ],
            ...sortedResults.map(item => {
              let status = 'Không';
              let statusColor = '#6b7280';
              if (item.name.includes('Bình Hòa')) {
                if (item.score >= 60) { status = 'Khỏe mạnh'; statusColor = '#059669'; }
                else { status = 'Chưa đạt'; statusColor = '#c2410c'; }
              } else {
                if (item.score >= 40) { status = 'Có'; statusColor = '#c2410c'; }
                else if (item.score >= 30) { status = 'Xu hướng'; statusColor = '#ca8a04'; }
              }
              return [
                { text: item.name, style: 'tableCell' },
                { text: item.score.toString(), style: 'tableCell', alignment: 'center', bold: true },
                { text: status, style: 'tableCell', alignment: 'center', color: statusColor, bold: true }
              ];
            })
          ]
        },
        layout: {
          fillColor: (rowIndex) => rowIndex === 0 ? '#10b981' : (rowIndex % 2 === 0 ? '#f9fafb' : null),
          hLineWidth: () => 0.5, vLineWidth: () => 0.5,
          hLineColor: () => '#e5e7eb', vLineColor: () => '#e5e7eb'
        },
        margin: [0, 5, 0, 20]
      },

      { text: 'Phân tích chi tiết', style: 'sectionTitle', pageBreak: 'before' },
      ...sortedResults.flatMap((item, idx) => [
        {
          columns: [
            { text: `${idx + 1}. ${item.name}`, style: 'constitutionTitle', width: '*' },
            { stack: [{ text: `${item.score} điểm`, style: 'scoreValue', alignment: 'right' }], width: 'auto' }
          ],
          margin: [0, 10, 0, 5]
        },
        {
          canvas: [
            { type: 'rect', x: 0, y: 0, w: 515, h: 8, color: '#f3f4f6' },
            { type: 'rect', x: 0, y: 0, w: Math.max(0, Math.min(515, (item.score / 100) * 515)), h: 8, color: item.score >= 40 ? '#fb923c' : '#10b981' }
          ],
          margin: [0, 0, 0, 10]
        },
        {
          text: [
            { text: 'Đặc điểm: ', bold: true, color: '#1f2937' },
            { text: item.desc || item.description, color: '#4b5563' }
          ],
          style: 'bodyText'
        },
        ...(item.score >= 30 ? [{
          margin: [10, 5, 0, 15],
          stack: [
            { text: 'Lời khuyên điều dưỡng:', bold: true, color: '#1e40af', margin: [0, 0, 0, 3] },
            { text: item.advice, color: '#1e40af' }
          ],
        }] : [{ text: '', margin: [0, 0, 0, 10] }]),
        { canvas: [{ type: 'line', x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 0.5, lineColor: '#e5e7eb' }] }
      ]),

      { margin: [0, 20, 0, 0], text: 'Lưu ý quan trọng', style: 'sectionTitle' },
      {
        ul: [
          'Kết quả chỉ mang tính tham khảo, không thay thế chẩn đoán của bác sĩ.',
          'Thể chất có thể thay đổi theo thời gian, lối sống và môi trường.',
          'Hãy tham khảo ý kiến chuyên gia Y học Cổ truyền để có phác đồ phù hợp.'
        ],
        style: 'bodyText',
        color: '#6b7280'
      }
    ],
    styles: {
      mainTitle: { fontSize: 22, bold: true, color: '#047857', alignment: 'center', margin: [0, 0, 0, 5] },
      subTitle: { fontSize: 11, color: '#6b7280', alignment: 'center', italics: true, margin: [0, 0, 0, 10] },
      sectionTitle: { fontSize: 14, bold: true, color: '#047857', margin: [0, 10, 0, 5] },
      constitutionTitle: { fontSize: 13, bold: true, color: '#1f2937' },
      scoreValue: { fontSize: 13, bold: true, color: '#c2410c' },
      bodyText: { fontSize: 10.5, color: '#374151', lineHeight: 1.5 },
      infoLabel: { fontSize: 10.5, bold: true, color: '#4b5563' },
      infoValue: { fontSize: 10.5, color: '#1f2937' },
      tableHeader: { bold: true, color: 'white', fontSize: 10.5, margin: [0, 5, 0, 5] },
      tableCell: { fontSize: 10, color: '#374151', margin: [0, 5, 0, 5] },
      headerLeft: { fontSize: 9, color: '#6b7280', italics: true },
      headerRight: { fontSize: 9, color: '#6b7280', alignment: 'right' },
      footer: { fontSize: 8, color: '#9ca3af' }
    },
    defaultStyle: { font: 'Roboto' }
  };

  pdfMake.createPdf(docDefinition).download(`Ket-Qua-The-Chat-CCMQ-${Date.now()}.pdf`);
};