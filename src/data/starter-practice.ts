type Cue = { goal: string; patterns: RegExp[]; hint: string }

export const starterPractice = [
  { id: 'bonjour', title: 'Tự giới thiệu', detail: 'Nói tên và hỏi thăm' },
  { id: 'cafe', title: 'Gọi một món', detail: 'Gọi đồ uống và xin hóa đơn' },
  { id: 'chemin', title: 'Tìm đường tới ga', detail: 'Hỏi đường và hỏi khoảng cách' },
  { id: 'hotel', title: 'Đặt phòng khách sạn', detail: 'Đặt phòng và hỏi giờ nhận phòng' },
  { id: 'famille', title: 'Giới thiệu gia đình', detail: 'Giới thiệu người thân qua ảnh' },
  { id: 'routine', title: 'Kể thói quen hằng ngày', detail: 'Kể giờ giấc và cách đi lại' },
  { id: 'medecin', title: 'Khám bệnh', detail: 'Mô tả triệu chứng với bác sĩ' },
  { id: 'passe', title: 'Kể chuyện đã qua', detail: 'Kể một việc bất ngờ xảy ra' },
  { id: 'invitation', title: 'Rủ bạn đi chơi', detail: 'Mời, nhận lời và đổi giờ hẹn' },
  { id: 'emploi', title: 'Phỏng vấn xin việc', detail: 'Kể kinh nghiệm và bài học rút ra' },
  { id: 'courriel', title: 'Dời lịch họp qua email', detail: 'Đề xuất giờ mới và xác nhận' },
  { id: 'avis', title: 'Nêu ý kiến với bạn bè', detail: 'Đồng ý, phản biện và đề xuất' },
  { id: 'incident', title: 'Xử lý sự cố tàu xe', detail: 'Báo sự cố và xin đổi vé' },
  { id: 'projets', title: 'Lên kế hoạch tương lai', detail: 'Nói dự định và điều cần xong trước' },
  { id: 'logement', title: 'Tìm chỗ ở', detail: 'Hỏi chi phí và hẹn xem nhà' },
] as const

export const practiceCues: Record<string, Cue[][]> = {
  bonjour: [
    [
      { goal: 'Có lời chào', patterns: [/\b(?:bonjour|salut|bonsoir)\b/], hint: 'Bonjour !' },
      { goal: 'Có cụm mở đầu để nói tên', patterns: [/\bje m'appelle \S+/, /\bc'est \S+/, /\bje suis \S+/, /\bmon (?:prénom|nom) est \S+/], hint: 'Je m’appelle …' },
    ],
    [
      // Leading `\b` doesn't work before an accented first letter (JS `\b` only treats
      // [A-Za-z0-9_] as "word" characters), so "ça va" would never match with a plain `\b`.
      { goal: 'Nói bạn đang thế nào', patterns: [/(?:^|\s)(?:ça va|je vais|assez bien|très bien|pas mal)\b/], hint: 'Ça va bien, merci.' },
      { goal: 'Hỏi thăm lại', patterns: [/\b(?:et toi|et vous|comment ça va|comment vas-tu)\b/], hint: 'Et toi ?' },
    ],
  ],
  cafe: [
    [
      { goal: 'Gọi món bằng một cách lịch sự', patterns: [/\b(?:je voudrais|j'aimerais|je prendrai|pourrais-je avoir) (?:un|une|du|de la|de l'|des|le|la|l')/], hint: 'Je voudrais un café, s’il vous plaît.' },
      { goal: 'Nêu ít nhất một món', patterns: [/(?:je voudrais|j'aimerais|je prendrai|pourrais-je avoir) (?:un|une|du|de la|de l'|des|le|la|l')\s*(?:café|thé|croissant|chocolat|jus|sandwich|expresso|espresso|eau|lait|baguette|tartine)(?![\p{L}])/u], hint: 'un café et un croissant' },
    ],
    [
      { goal: 'Chọn ăn tại chỗ hoặc mang đi', patterns: [/(?:^|\s)(?:sur place|à emporter|pour emporter)\b/], hint: 'Sur place, merci.' },
    ],
    [
      { goal: 'Xin hóa đơn hoặc hỏi cách thanh toán', patterns: [/\b(?:l'addition|la note|payer|régler)\b/], hint: 'L’addition, s’il vous plaît.' },
    ],
  ],
  chemin: [
    [
      { goal: 'Hỏi đường hoặc vị trí', patterns: [/\bo[uù] est\b/, /\bo[uù] se trouve\b/, /\bcomment (?:aller|arriver|je vais)\b/, /\bindiqu(?:er|ez)\b/], hint: 'Où est la gare, s’il vous plaît ?' },
      { goal: 'Nói nơi bạn cần đến', patterns: [/\bgare\b/], hint: 'la gare' },
    ],
    [
      { goal: 'Hỏi xa không hoặc mất bao lâu', patterns: [/\b(?:loin|combien de temps|combien de minutes|à quelle distance)\b/], hint: 'C’est loin à pied ?' },
    ],
  ],
  hotel: [
    [
      { goal: 'Đặt phòng bằng cách lịch sự', patterns: [/\b(?:je voudrais|j'aimerais|je souhaiterais) réserver\b/], hint: 'Je voudrais réserver une chambre.' },
      { goal: 'Nêu số khách', patterns: [/\bpour deux personnes\b/, /\bdeux personnes\b/], hint: 'pour deux personnes' },
    ],
    [
      { goal: 'Hỏi giờ có thể đến nhận phòng', patterns: [/(?:^|\s)à quelle heure\b/], hint: 'À quelle heure peut-on arriver ?' },
    ],
  ],
  famille: [
    [
      { goal: 'Xác nhận quan hệ gia đình', patterns: [/\bc'est ma sœur\b/, /\bc'est mon frère\b/, /\bc'est ma soeur\b/], hint: 'C’est ma sœur.' },
      { goal: 'Nêu tuổi', patterns: [/\b(?:elle|il) a \S+ ans\b/], hint: 'Elle a vingt ans.' },
    ],
    [
      { goal: 'Nói thêm về người khác trong ảnh', patterns: [/\bnotre père\b/, /\bma mère\b/, /\bmon père\b/, /\bnotre mère\b/], hint: 'Notre père est derrière elle.' },
    ],
    [
      { goal: 'Trả lời có hay không', patterns: [/\bnon\b/, /\boui\b/], hint: 'Non,' },
      { goal: 'Nêu nơi người đó sống', patterns: [/\bhabite à \S+\b/], hint: 'elle habite à Lyon avec son compagnon' },
    ],
  ],
  routine: [
    [
      { goal: 'Nói giờ dậy ước chừng', patterns: [/\bje me lève vers\b/, /\bvers \S+ heures?\b/], hint: 'Je me lève vers six heures.' },
    ],
    [
      { goal: 'Nói phương tiện di chuyển', patterns: [/\ble bus\b/, /\ble métro\b/, /(?:^|\s)à pied\b/, /\ble vélo\b/], hint: 'le bus' },
      { goal: 'Nêu tần suất', patterns: [/\bsouvent\b/, /\btoujours\b/, /\btous les jours\b/], hint: 'souvent' },
    ],
    [
      { goal: 'Nói cách về nhà', patterns: [/\bje rentre\b/], hint: 'je rentre à pied' },
      { goal: 'Nêu điều kiện bằng quand', patterns: [/\bquand il fait beau\b/, /\bsi il fait beau\b/, /\bs'il fait beau\b/], hint: 'quand il fait beau' },
    ],
  ],
  medecin: [
    [
      // Trailing `\b` doesn't work right after an accented last letter (same reason as
      // above) — matters here because the "à" alternative ends on one.
      { goal: 'Diễn tả triệu chứng bằng avoir mal à', patterns: [/\bj'ai mal (?:à|au|aux)(?=\s|$)/], hint: 'J’ai mal à la gorge.' },
      { goal: 'Nêu khoảng thời gian bằng depuis', patterns: [/\bdepuis \S+\b/], hint: 'depuis deux jours' },
    ],
    [
      { goal: 'Trả lời có hay không về sốt', patterns: [/\bnon\b/, /\boui\b/], hint: 'Non.' },
      { goal: 'Nêu triệu chứng khác và thời điểm', patterns: [/\bje tousse\b/], hint: 'je tousse surtout le soir' },
    ],
  ],
  passe: [
    [
      { goal: 'Mô tả bối cảnh bằng imparfait', patterns: [/\bil faisait\b/, /\bc'était\b/, /\bje me promenais\b/, /\bon se promenait\b/], hint: 'Samedi, il faisait beau.' },
    ],
    [
      { goal: 'Mô tả hành động đang diễn ra bằng imparfait', patterns: [/\bon se promenait\b/, /\bje me promenais\b/], hint: 'On se promenait' },
      { goal: 'Kể sự kiện gây gián đoạn bằng passé composé', patterns: [/\ba commencé(?=\s|$)/, /\best arrivé(?=\s|$)/], hint: 'quand la pluie a commencé' },
    ],
    [
      { goal: 'Kể hành động đã hoàn tất bằng passé composé', patterns: [/\bon est rentrés?(?=\s|$)/, /\bje suis rentré/], hint: 'On est rentrés en courant.' },
    ],
  ],
  invitation: [
    [
      { goal: 'Nhận lời mời', patterns: [/\bavec plaisir\b/, /\bd'accord\b/, /\bvolontiers\b/], hint: 'Avec plaisir !' },
      { goal: 'Hỏi giờ hẹn', patterns: [/(?:^|\s)à quelle heure\b/], hint: 'À quelle heure ?' },
    ],
    [
      { goal: 'Từ chối giờ được đề xuất', patterns: [/\bje ne peux pas\b/], hint: 'Je ne peux pas à sept heures.' },
      { goal: 'Đề xuất giờ khác', patterns: [/\bplutôt vers\b/, /\bvers \S+ heures?\b/], hint: 'Plutôt vers huit heures ?' },
    ],
  ],
  emploi: [
    [
      { goal: 'Kể trách nhiệm trước đây bằng imparfait', patterns: [/\bje m'occupais\b/, /\bje travaillais\b/, /\bje répondais\b/], hint: 'Dans mon précédent poste, je m’occupais des demandes des clients.' },
    ],
    [
      { goal: 'Kể một sự việc cụ thể bằng passé composé', patterns: [/\ba signalé(?=\s|$)/, /\bj'ai vérifié(?=\s|$)/], hint: 'Un jour, un client a signalé une erreur.' },
      { goal: 'Nêu hành động giải quyết', patterns: [/\bj'ai proposé(?=\s|$)/, /\bje lui ai proposé(?=\s|$)/], hint: 'je lui ai proposé une solution' },
    ],
    [
      { goal: 'Nêu bài học rút ra bằng j\'ai appris à', patterns: [/\bj'ai appris à(?=\s|$)/], hint: 'J’ai appris à rester calme.' },
    ],
  ],
  courriel: [
    [
      { goal: 'Đề xuất dời lịch bằng pourrions-nous', patterns: [/\bpourrions-nous\b/], hint: 'Pourrions-nous reporter notre réunion à vendredi ?' },
    ],
    [
      { goal: 'Xác nhận khung giờ bằng văn bản', patterns: [/\bje vous confirme\b/, /\bpar écrit\b/], hint: 'Je vous confirme le créneau par écrit.' },
    ],
  ],
  avis: [
    [
      { goal: 'Đồng ý về nguyên tắc', patterns: [/\bd'accord sur le principe\b/, /\bje suis d'accord\b/], hint: 'Je suis d’accord sur le principe.' },
    ],
    [
      { goal: 'Thừa nhận ý kiến đối phương', patterns: [/\bje vois ce que tu veux dire\b/], hint: 'Je vois ce que tu veux dire.' },
      { goal: 'Nêu lý do phản bác bằng mais', patterns: [/\bmais\b/], hint: 'mais le dernier train part tôt' },
    ],
  ],
  incident: [
    [
      { goal: 'Báo sự cố bằng a été annulé', patterns: [/\ba été annulé(?=\s|$)/, /\best annulé(?=\s|$)/], hint: 'Mon train pour Lyon a été annulé.' },
    ],
    [
      // Leading `\b` doesn't work before an accented first letter — "échanger" starts with é.
      { goal: 'Hỏi xin đổi vé', patterns: [/(?:^|\s)échanger\b/], hint: 'Est-ce que je peux échanger mon billet ?' },
    ],
  ],
  projets: [
    [
      { goal: 'Nói dự định bằng je vais + nguyên mẫu', patterns: [/\bje vais organiser\b/, /\bje vais \S+/], hint: 'Je vais organiser un atelier de français.' },
    ],
    [
      { goal: 'Dùng futur simple để nói việc sẽ làm', patterns: [/\bje confirmerai\b/], hint: 'Je confirmerai la date.' },
      { goal: 'Dùng futur antérieur cho việc hoàn tất trước', patterns: [/\bj'aurai réservé(?=\s|$)/, /\bquand j'aurai\b/], hint: 'quand j’aurai réservé la salle' },
    ],
  ],
  logement: [
    [
      { goal: 'Hỏi phí dịch vụ có gồm trong tiền thuê không', patterns: [/\bcomprises? dans le loyer\b/, /\bcharges\b/], hint: 'Les charges sont-elles comprises dans le loyer ?' },
    ],
    [
      { goal: 'Hỏi xin đến xem nhà', patterns: [/\bvisiter\b/], hint: 'Est-ce qu’on peut visiter samedi ?' },
      { goal: 'Đề xuất ngày cụ thể', patterns: [/\bsamedi\b/], hint: 'samedi' },
    ],
  ],
}
