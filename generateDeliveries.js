const statuses = ["CREATED", "ACCEPTED", "IN_TRANSIT", "DELIVERED", "CANCELLED"];
const statusNames = {
  CREATED: "Создан",
  ACCEPTED: "Принят",
  IN_TRANSIT: "В пути",
  DELIVERED: "Доставлен",
  CANCELLED: "Отменен",
};

function generateUUID() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

function generateCdekNumber() {
  return `10${Math.floor(100000000 + Math.random() * 900000000)}`;
}

function generateDate(baseDate, offsetDays) {
  const date = new Date(baseDate);
  date.setDate(date.getDate() + offsetDays);
  return date.toISOString();
}

function generateDelivery(index) {
  const baseDate = "2025-02-14T08:02:36+0000";
  const statusCount = Math.floor(Math.random() * 5) + 1; // От 1 до 5 статусов
  const deliveryStatuses = [];
  
  for (let i = 0; i < statusCount; i++) {
    const statusCode = statuses[Math.min(i, statuses.length - 1)]; // Последовательность статусов
    deliveryStatuses.push({
      code: statusCode,
      name: statusNames[statusCode],
      date_time: generateDate(baseDate, i),
      city: "Офис СДЭК",
    });
  }

  return {
    entity: {
      uuid: generateUUID(),
      type: 1,
      is_return: false,
      is_reverse: false,
      cdek_number: generateCdekNumber(),
      number: generateUUID(),
      tariff_code: 137,
      comment: `Комментарий для заказа ${index + 1}`,
      shipment_point: "LFG1",
      delivery_point: "LFG1",
      items_cost_currency: "RUB",
      recipient_currency: "RUB",
      delivery_recipient_cost: {
        value: 0.0,
        vat_sum: 0.0,
      },
      sender: {
        company: "ООО \"Рога и копыта\"",
        name: "Иван Иванов",
        contragent_type: "LEGAL_ENTITY",
        passport_requirements_satisfied: false,
      },
      seller: {
        name: "Петр Петрович",
      },
      recipient: {
        company: "ООО \"Покупатель\"",
        name: "Семен Семенович",
        phones: [{ number: "70000000000" }],
        passport_requirements_satisfied: false,
      },
      from_location: {
        code: 1607,
        city_uuid: "6cf70ab9-b2d0-40e9-8269-8af1461ee16a",
        city: "Краснодар",
        country_code: "RU",
        country: "Россия",
        region: "Московская область",
        region_code: 7,
        longitude: 39.356765,
        latitude: 46.313532,
        address: "Россия, Московская область, Москва, ул. Станционная, 2",
        postal_code: "212345",
      },
      to_location: {
        code: 1607,
        city_uuid: "6cf70ab9-b2d0-40e9-8269-8af1461ee16a",
        city: "Краснодар",
        country_code: "RU",
        country: "Россия",
        region: "Краснодарский край",
        region_code: 7,
        longitude: 38.975312,
        latitude: 45.035471,
        address: "улица Тихая 7",
        postal_code: "545906",
      },
      services: [
        {
          code: "INSURANCE",
          parameter: "300.00",
          sum: 2.14,
          total_sum: 2.25,
          discount_percent: 0,
          discount_sum: 0.0,
          vat_rate: 5.0,
          vat_sum: 0.11,
        },
      ],
      packages: [
        {
          number: "1",
          barcode: `0005134782${index.toString().padStart(2, "0")}`,
          weight: 200,
          length: 20,
          width: 15,
          weight_volume: 60,
          weight_calc: 200,
          height: 1,
          comment: "приложена опись",
          items: [
            {
              name: "Книга",
              ware_key: "BOOK123",
              payment: {
                value: 300.0,
                vat_sum: 0.0,
              },
              weight: 200,
              weight_gross: 200,
              amount: 1,
              delivery_amount: 0,
              return_item_detail: {},
              excise: false,
              cost: 300.0,
            },
          ],
          package_id: generateUUID(),
        },
      ],
      statuses: deliveryStatuses,
      is_client_return: false,
      delivery_mode: "3",
      delivery_detail: {
        delivery_sum: 338.1,
        total_sum: 357.25,
        payment_info: [],
        delivery_vat_rate: 5.0,
        delivery_vat_sum: 16.9,
        delivery_discount_percent: 0,
        delivery_discount_sum: 0.0,
      },
      calls: {},
    },
    related_entities: [],
  };
}

const deliveries = Array.from({ length: 100 }, (_, index) => generateDelivery(index));


console.log(JSON.stringify(deliveries, null, 2));