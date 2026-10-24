export const CONSTITUTIONS = {
  BALANCED: {
    name: "Thể chất Bình Hòa (Khỏe mạnh)",
    items: [
      { id: 1, reverse: false }, { id: 2, reverse: true },
      { id: 7, reverse: true }, { id: 8, reverse: true },
      { id: 9, reverse: true }, { id: 22, reverse: true },
      { id: 53, reverse: false }, { id: 54, reverse: true },
    ],
    description: "Âm dương khí huyết điều hòa, sức khỏe dồi dào, ít bệnh tật.",
    advice: "Duy trì lối sống lành mạnh, ăn uống ngủ nghỉ điều độ, vận động vừa phải.",
  },
  QI_DEF: {
    name: "Thể chất Khí Hư (Hơi thở yếu)",
    items: [2, 3, 4, 5, 6, 7, 23, 27],
    description: "Nguyên khí bất túc, dễ mệt mỏi, hụt hơi, giọng nói nhỏ, dễ ốm vặt.",
    advice: "Ăn thực phẩm bổ khí. Tránh lao động quá sức, giữ ấm cơ thể.",
  },
  YANG_DEF: {
    name: "Thể chất Dương Hư (Tạng lạnh)",
    items: [18, 19, 20, 22, 23, 52, 55],
    description: "Dương khí bất túc, sợ lạnh, chân tay không ấm, thích ăn đồ nóng.",
    advice: "Giữ ấm cơ thể và hạn chế đồ lạnh.",
  },
  YIN_DEF: {
    name: "Thể chất Âm Hư (Tạng nóng)",
    items: [17, 21, 29, 35, 38, 44, 46, 57],
    description: "Âm dịch suy hư, miệng khô, lòng bàn tay chân nóng, người gầy.",
    advice: "Tránh thức khuya và hạn chế vận động ra mồ hôi quá nhiều.",
  },
  PHLEGM_DAMP: {
    name: "Thể chất Đàm Thấp (Dễ béo)",
    items: [14, 16, 28, 42, 49, 50, 51, 58],
    description: "Hình thể béo, bụng to, da mặt nhiều dầu, miệng dính, nhiều đờm.",
    advice: "Ăn thanh đạm, hạn chế đồ béo ngọt và tăng cường vận động.",
  },
  DAMP_HEAT: {
    name: "Thể chất Thấp Nhiệt (Nóng ẩm)",
    items: [39, 41, 48, 56, 59, 60],
    description: "Mặt bóng dầu, dễ mụn nhọt, miệng đắng, tiểu vàng, người nặng nề.",
    advice: "Ăn thanh đạm và hạn chế đồ cay nóng, dầu mỡ.",
  },
  BLOOD_STASIS: {
    name: "Thể chất Huyết Ứ (Máu lưu thông kém)",
    items: [8, 33, 36, 37, 40, 43, 45],
    description: "Sắc da tối sạm, dễ bị nám, môi tím, hay quên, dễ đau nhức.",
    advice: "Duy trì vận động thường xuyên và ngủ đủ giấc.",
  },
  QI_STAG: {
    name: "Thể chất Khí Uất (Hay u uất)",
    items: [9, 10, 11, 12, 13, 15, 47],
    description: "Tinh thần uất ức, hay lo âu, thở dài, nhạy cảm đa nghi.",
    advice: "Tăng hoạt động xã hội và tránh cô lập bản thân.",
  },
  SPECIAL: {
    name: "Thể chất Cơ địa (Dị ứng/Bẩm sinh)",
    items: [24, 25, 26, 30, 31, 32, 34],
    description: "Dễ dị ứng với thuốc, thức ăn, thời tiết hoặc có yếu tố bẩm sinh.",
    advice: "Chủ động tránh các tác nhân gây dị ứng đã biết.",
  },
};
