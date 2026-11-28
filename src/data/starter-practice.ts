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
  { id: 'actualites', title: 'Thảo luận tin tức', detail: 'Nêu lợi ích, giới hạn và đề xuất kiểm chứng' },
  { id: 'negociation', title: 'Đàm phán với nhà cung cấp', detail: 'Từ chối giá và chấp nhận có điều kiện' },
  { id: 'presentation', title: 'Thuyết trình kết quả khảo sát', detail: 'Dẫn dắt và nêu giới hạn của số liệu' },
  { id: 'subjonctif', title: 'Thống nhất việc cần làm', detail: 'Diễn đạt nghi ngờ và việc cần thiết' },
  { id: 'culture', title: 'Văn hóa công sở Pháp', detail: 'Giới hạn nhận xét và nói “còn tùy”' },
  { id: 'critique', title: 'Nhận xét một bộ phim', detail: 'Khen, chê nhẹ nhàng và có dẫn chứng' },
  { id: 'seminaire', title: 'Tranh luận học thuật', detail: 'Thận trọng hóa một kết luận nghiên cứu' },
  { id: 'idiomes', title: 'Kể chuyện bằng thành ngữ', detail: 'Dùng và đổi thành ngữ sang lời trung tính' },
  { id: 'essai', title: 'Bảo vệ luận điểm bài luận', detail: 'Nhượng bộ rồi bảo vệ lại luận điểm' },
  { id: 'registre', title: 'Đổi văn phong theo đối tượng', detail: 'Nhờ việc thân mật và trang trọng' },
  { id: 'synthese', title: 'Tổng hợp hai nguồn', detail: 'Nêu điểm chung và điểm khác biệt' },
  { id: 'mediation', title: 'Điều phối bất đồng', detail: 'Diễn giải lại và đề xuất phương án' },
  { id: 'nombres', title: 'Mua hàng và tính tiền', detail: 'Hỏi giá, gọi theo cân và tính tổng' },
  { id: 'metier', title: 'Nói về nghề nghiệp', detail: 'Nói nghề và nơi làm việc' },
  { id: 'meteo', title: 'Nói về thời tiết', detail: 'Mô tả thời tiết hiện tại và dự đoán' },
  { id: 'couleurs', title: 'Mô tả đồ vật bằng màu sắc', detail: 'Tìm đồ thất lạc qua màu sắc, vị trí' },
  { id: 'gouts', title: 'Nói sở thích ăn uống', detail: 'Nói món thích, không thích và so sánh' },
  { id: 'chambre', title: 'Mô tả phòng ở', detail: 'Nói có gì trong phòng và vị trí' },
  { id: 'telephone', title: 'Gọi điện để lại lời nhắn', detail: 'Xin nói chuyện và nhắn lại' },
  { id: 'corps', title: 'Nói triệu chứng nhẹ', detail: 'Nói đau ở đâu và nhận lời khuyên' },
  { id: 'bus', title: 'Mua vé xe buýt', detail: 'Chọn loại vé và hỏi giờ xe' },
  { id: 'semaine', title: 'Hẹn gặp trong tuần', detail: 'Nói ngày rảnh và chốt giờ' },
  { id: 'banque', title: 'Ở ngân hàng', detail: 'Đổi tiền và hỏi mở tài khoản' },
  { id: 'appartement_a1', title: 'Hỏi thuê căn hộ', detail: 'Diện tích, giá thuê và hẹn xem nhà' },
  { id: 'anniversaire', title: 'Mời dự sinh nhật', detail: 'Nói giờ và nhận lời giúp đỡ' },
  { id: 'etudes', title: 'Nói về việc học', detail: 'Môn học, thời gian và tần suất' },
  { id: 'animaux', title: 'Thú cưng', detail: 'Giới thiệu tên, ngoại hình, tính cách' },
  { id: 'quartier', title: 'Mô tả khu phố', detail: 'Không khí, phương tiện và nơi mua sắm' },
  { id: 'reservation', title: 'Đặt bàn nhà hàng', detail: 'Số người, ngày giờ và xác nhận' },
  { id: 'perdu', title: 'Báo mất đồ', detail: 'Mô tả bên trong và cách xử lý' },
  { id: 'projet_vacances', title: 'Dự định nghỉ hè', detail: 'Đi đâu, bao lâu và đã chuẩn bị gì' },
  { id: 'sport', title: 'Thể thao yêu thích', detail: 'Tần suất chơi và từ bao lâu' },
  { id: 'supermarche', title: 'Đi siêu thị', detail: 'Hỏi khu hàng và giờ đóng cửa' },
  { id: 'presenter', title: 'Giới thiệu người khác', detail: 'Tên, nghề nghiệp và cách quen nhau' },
  { id: 'heure_rdv', title: 'Đổi giờ hẹn', detail: 'Đề xuất giờ mới và xác nhận địa điểm' },
  { id: 'vetements', title: 'Mua quần áo & hỏi size', detail: 'Thử đồ theo cỡ và màu sắc khác' },
  { id: 'velo', title: 'Thuê xe đạp', detail: 'Thuê theo thời gian và báo sự cố' },
  { id: 'pharmacie', title: 'Ở hiệu thuốc', detail: 'Mô tả triệu chứng và hỏi liều dùng' },
  { id: 'valise', title: 'Báo mất hành lý', detail: 'Mô tả đặc điểm và hỏi thời gian tìm lại' },
  { id: 'restaurant_avis', title: 'Nhận xét món ăn', detail: 'Khen và nêu nhận xét nhẹ nhàng' },
  { id: 'excuse', title: 'Xin lỗi vì đến trễ', detail: 'Xin lỗi và giải thích lý do' },
  { id: 'apparence', title: 'Mô tả ngoại hình', detail: 'Mô tả chiều cao, tóc và trang phục' },
  { id: 'meteo_passe', title: 'Kể thời tiết đã qua', detail: 'Kể lại và so sánh với hiện tại' },
  { id: 'ville_comparaison', title: 'So sánh hai thành phố', detail: 'So sánh bằng plus/moins/meilleur' },
  { id: 'plainte_a2', title: 'Phàn nàn dịch vụ khách sạn', detail: 'Nêu vấn đề và nói thiếu gì' },
  { id: 'fete', title: 'Lên kế hoạch tổ chức tiệc', detail: 'Thống nhất và phân công việc' },
  { id: 'remise', title: 'Xin giảm giá', detail: 'Đề nghị lịch sự và thương lượng' },
  { id: 'trajet', title: 'Sự cố trên đường đi làm', detail: 'Giải thích lý do đến trễ' },
  { id: 'emprunt', title: 'Mượn đồ hàng xóm', detail: 'Xin mượn lịch sự và hứa trả lại' },
  { id: 'ecole_enfant', title: 'Việc học của con', detail: 'Điểm mạnh và điểm cần cải thiện' },
  { id: 'hobby', title: 'Sở thích chi tiết', detail: 'Bắt đầu, lý do và tần suất' },
  { id: 'recette', title: 'Hỏi công thức nấu ăn', detail: 'Các bước theo thứ tự' },
  { id: 'banque_a2', title: 'Mở tài khoản ngân hàng', detail: 'Loại tài khoản và giấy tờ cần nộp' },
  { id: 'objet_cadeau', title: 'Chọn quà tặng', detail: 'Gợi ý theo sở thích và ngân sách' },
  { id: 'internet', title: 'Sự cố wifi/máy tính', detail: 'Triệu chứng và điều đã thử' },
  { id: 'coiffeur', title: 'Cắt tóc', detail: 'Kiểu tóc muốn cắt và điều không đổi' },
  { id: 'demenagement', title: 'Báo chuyển nhà', detail: 'Báo chủ nhà và thống nhất bàn giao' },
  { id: 'abonnement', title: 'Hủy gói cước', detail: 'Xin hủy dịch vụ và nêu lý do' },
  { id: 'sante_a2', title: 'Hẹn khám chuyên khoa', detail: 'Đặt lịch hẹn và xác nhận giờ đến' },
  { id: 'souvenirs_enfance', title: 'Kỷ niệm thời thơ ấu', detail: 'Thói quen tuổi thơ bằng imparfait' },
  { id: 'reclamation', title: 'Phàn nàn về sản phẩm', detail: 'Mô tả vấn đề và đề xuất giải pháp' },
  { id: 'etudes_projet', title: 'Kế hoạch học tiếp', detail: 'Nói dự định và điều kiện để xảy ra' },
  { id: 'actualite_discussion', title: 'Bàn luận tin tức', detail: 'Nêu ý kiến và thừa nhận lo ngại' },
  { id: 'conseil_ami', title: 'Khuyên bạn bè', detail: 'Đưa lời khuyên nhẹ nhàng' },
  { id: 'hobby_approfondi', title: 'Kể chi tiết sở thích', detail: 'Kể thời gian và nhấn mạnh chi tiết' },
  { id: 'itineraire', title: 'Lên kế hoạch chuyến đi', detail: 'Nêu điều kiện và phương án dự phòng' },
  { id: 'environnement', title: 'Tái chế & môi trường', detail: 'Nói khó khăn và mẹo phân loại rác' },
  { id: 'habitudes_sante', title: 'Thói quen sức khỏe', detail: 'Ăn uống, giấc ngủ và dự định cải thiện' },
  { id: 'serie_tv', title: 'Giới thiệu phim/series', detail: 'Nội dung và góc nhìn kể chuyện' },
  { id: 'cause_effet', title: 'Giải thích nguyên nhân–kết quả', detail: 'À cause de và grâce à' },
  { id: 'debat_social', title: 'Tranh luận xã hội', detail: 'Phản biện và đề xuất phương án ôn hòa' },
  { id: 'email_formel', title: 'Email phàn nàn trang trọng', detail: 'Mở đầu trang trọng và nêu mong muốn' },
  { id: 'offre_emploi', title: 'Cân nhắc lời mời làm việc', detail: 'So sánh lợi/hại và tiếc nuối' },
  { id: 'statistiques', title: 'Phân tích số liệu', detail: 'Nêu mức thay đổi và giải thích thận trọng' },
  { id: 'dilemme_ethique', title: 'Tình huống đạo đức', detail: 'Bàn lựa chọn khó xử bằng câu điều kiện' },
  { id: 'feedback_constructif', title: 'Góp ý xây dựng', detail: 'Khen tổng quát rồi góp ý cụ thể' },
  { id: 'teletravail', title: 'Tranh luận chính sách làm từ xa', detail: 'Lợi ích, rủi ro và cách giảm rủi ro' },
  { id: 'politique_env', title: 'Tranh luận chính sách môi trường', detail: 'Thừa nhận lo ngại, nêu điều kiện' },
  { id: 'immigration_respect', title: 'Bàn chủ đề nhạy cảm tôn trọng', detail: 'Tôn trọng quan điểm khác biệt' },
  { id: 'publicite', title: 'Phân tích quảng cáo', detail: 'Kỹ thuật thuyết phục và hiệu quả' },
  { id: 'discours_formel', title: 'Phát biểu trang trọng', detail: 'Mở đầu, cảm ơn và chuyển ý' },
  { id: 'questions_hostiles', title: 'Xử lý câu hỏi gay gắt', detail: 'Thừa nhận rồi bổ sung bình tĩnh' },
  { id: 'resume_academique', title: 'Tóm tắt học thuật', detail: 'Chủ đề, phương pháp và kết luận' },
  { id: 'desaccord_nuance', title: 'Bất đồng tinh tế', detail: 'Nghi ngờ lịch sự, giữ thể diện' },
  { id: 'rhetorique_debat', title: 'Kỹ thuật tu từ tranh luận', detail: 'Trả lời bằng câu hỏi, nhấn mạnh nhân quả' },
  { id: 'conference_style', title: 'Thuyết trình kiểu TED', detail: 'Mở đầu và khép kín bài nói' },
  { id: 'mediation_juridique', title: 'Điều phối tranh chấp pháp lý', detail: 'Tìm điểm chung và trấn an quyền lợi' },
  { id: 'compromis_donnees', title: 'Đánh đổi chính sách theo số liệu', detail: 'Lợi ích thận trọng và cái giá' },
  { id: 'lettre_recommandation', title: 'Thư tiến cử', detail: 'Nhấn mạnh phẩm chất và ví dụ cụ thể' },
  { id: 'defis_traduction', title: 'Thách thức dịch thuật', detail: 'Đề xuất giải pháp và hạn chế' },
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
  actualites: [
    [
      // Leading `\b` doesn't work before an accented first letter — "à condition que" here
      // follows a comma, so `(?:^|\s)` still matches via the preceding space.
      { goal: 'Nêu lợi ích kèm điều kiện bằng à condition que', patterns: [/(?:^|\s)à condition que\b/], hint: 'Cela pourrait réduire l’usage de la voiture, à condition que les bus passent assez souvent.' },
    ],
    [
      { goal: 'Đề xuất thử nghiệm trước', patterns: [/\bd'où l'intérêt de\b/], hint: 'D’où l’intérêt de commencer par une expérimentation.' },
    ],
  ],
  negociation: [
    [
      { goal: 'Từ chối mức giá', patterns: [/\bnous ne pourrons pas\b/], hint: 'À ce tarif, nous ne pourrons pas donner suite.' },
    ],
    [
      { goal: 'Chấp nhận có điều kiện bằng sous réserve que', patterns: [/\bsous réserve que\b/], hint: 'Cela nous conviendrait, sous réserve que la date soit confirmée par écrit.' },
    ],
  ],
  presentation: [
    [
      { goal: 'Báo bước mở đầu bằng commencer par', patterns: [/\bje commencerai par\b/], hint: 'Je commencerai par présenter la méthode.' },
    ],
    [
      { goal: 'Dẫn kết quả khảo sát bằng il ressort de…que', patterns: [/\bil ressort de\b/], hint: 'Il ressort de l’enquête que les délais posent le plus de problèmes.' },
    ],
    [
      { goal: 'Nêu giới hạn và lý do thận trọng', patterns: [/\binterpréter avec prudence\b/], hint: 'Il faut les interpréter avec prudence : seuls cent clients ont répondu.' },
    ],
  ],
  subjonctif: [
    [
      { goal: 'Diễn đạt nghi ngờ bằng ne pas penser que + subjonctif', patterns: [/\bje ne pense pas qu'il soit\b/, /\bje ne pense pas que\b/], hint: 'Je ne pense pas qu’il soit prêt.' },
    ],
    [
      { goal: 'Nêu việc cần làm bằng il faut que + subjonctif', patterns: [/\bil faut que\b/], hint: 'Il faut que nous vérifiions les chiffres.' },
    ],
  ],
  culture: [
    [
      { goal: 'Giới hạn nhận xét theo một nhóm cụ thể', patterns: [/\bdans mon ancienne équipe\b/], hint: 'Dans mon ancienne équipe, on se saluait avant de commencer.' },
    ],
    [
      // Leading `\b` doesn't work before an accented first letter — "ça" starts with ç.
      { goal: 'Nói còn tùy bằng ça dépend de', patterns: [/(?:^|\s)ça dépend\b/], hint: 'Ça dépend du milieu et des personnes.' },
    ],
  ],
  critique: [
    [
      { goal: 'Nhấn mạnh điểm thích bằng ce qui…c’est', patterns: [/\bce qui m'a plu\b/], hint: 'Ce qui m’a plu, c’est le jeu des acteurs.' },
    ],
    [
      // Trailing `\b` doesn't work right after an accented last letter — "semblé" ends in é.
      { goal: 'Nhận xét nhẹ nhàng bằng m’a semblé', patterns: [/\bm'a semblé(?=\s|$)/], hint: 'Le dénouement m’a semblé un peu précipité.' },
    ],
  ],
  seminaire: [
    [
      { goal: 'Đề nghị diễn đạt thận trọng hơn bằng il convient de', patterns: [/\bil convient de\b/], hint: 'Il convient de la nuancer, dans la mesure où les participants se sont portés volontaires.' },
    ],
    [
      { goal: 'Nêu một yêu cầu còn phải đáp ứng bằng encore faut-il', patterns: [/\bencore faut-il\b/], hint: 'Encore faut-il distinguer la corrélation observée d’un effet causal.' },
    ],
  ],
  idiomes: [
    [
      // Trailing `\b` doesn't work right after an accented last letter — "joué" ends in é.
      { goal: 'Thừa nhận chậm tiến độ nhưng chưa ngã ngũ', patterns: [/\brien n'est joué(?=\s|$)/], hint: 'On a pris du retard, mais rien n’est joué.' },
    ],
    [
      { goal: 'Đề xuất đoàn kết bằng thành ngữ se serrer les coudes', patterns: [/\bse serrer? les coudes\b/], hint: 'On peut s’en sortir si on se serre les coudes.' },
    ],
  ],
  essai: [
    [
      // Leading `\b` doesn't work before an accented first letter — "élargit" starts with é.
      { goal: 'Nêu luận điểm chính', patterns: [/(?:^|\s)élargit l'accès\b/], hint: 'L’enseignement à distance élargit l’accès à la formation.' },
    ],
    [
      { goal: 'Nhượng bộ một giới hạn bằng certes', patterns: [/\bcertes\b/], hint: 'Certes, l’accès au matériel reste inégal.' },
    ],
    [
      { goal: 'Khẳng định lại luận điểm bằng il n’en demeure pas moins que', patterns: [/\bil n'en demeure pas moins que\b/], hint: 'Il n’en demeure pas moins que ce format aide les personnes qui vivent loin des centres de formation.' },
    ],
  ],
  registre: [
    [
      { goal: 'Nhờ việc một cách thân mật', patterns: [/\btu peux me passer\b/], hint: 'Tu peux me passer le doc quand tu as deux minutes ?' },
    ],
    [
      { goal: 'Nhờ việc một cách trang trọng', patterns: [/\bpourriez-vous me transmettre\b/], hint: 'Pourriez-vous me transmettre le document quand vous en aurez la possibilité ?' },
    ],
  ],
  synthese: [
    [
      { goal: 'Nêu điểm chung bằng toutes deux', patterns: [/\btoutes deux\b/], hint: 'Toutes deux relèvent une baisse du temps de trajet.' },
    ],
    [
      { goal: 'Nêu điểm khác nhau và giữ rõ nguồn bằng tandis que', patterns: [/\btandis que\b/], hint: 'La première souligne un gain d’autonomie, tandis que la seconde insiste sur l’isolement.' },
    ],
  ],
  mediation: [
    [
      { goal: 'Diễn giải lại để xác nhận bằng si je vous comprends bien', patterns: [/\bsi je vous comprends bien\b/], hint: 'Si je vous comprends bien, votre priorité est le délai.' },
    ],
    [
      { goal: 'Đề xuất phương án mở bằng pourrions-nous envisager', patterns: [/\bpourrions-nous envisager\b/], hint: 'Pourrions-nous envisager un lancement limité ?' },
    ],
  ],
  nombres: [
    [
      { goal: 'Gọi mua theo cân bằng je voudrais', patterns: [/\bje voudrais un kilo\b/], hint: 'D’accord, je voudrais un kilo, s’il vous plaît.' },
    ],
    [
      { goal: 'Gọi thêm món khác', patterns: [/\bje prends aussi\b/], hint: 'Je prends aussi un kilo de pommes.' },
    ],
    [
      { goal: 'Đưa tiền bằng voici', patterns: [/\bvoici\b/], hint: 'Voici dix euros.' },
    ],
    [
      { goal: 'Cảm ơn và chào tạm biệt', patterns: [/\bmerci\b/, /\bau revoir\b/], hint: 'Merci, au revoir !' },
    ],
  ],
  metier: [
    [
      { goal: 'Nói nghề nghiệp bằng je suis', patterns: [/\bje suis\b/], hint: 'Je suis infirmière. Et vous ?' },
    ],
    [
      { goal: 'Nói nơi làm việc bằng je travaille dans', patterns: [/\bje travaille dans\b/], hint: 'Je travaille dans un hôpital, près de la gare.' },
    ],
    [
      { goal: 'Nói mình thích công việc bằng j’aime', patterns: [/\bj'aime\b/], hint: 'Oui, j’aime beaucoup mon métier.' },
    ],
  ],
  meteo: [
    [
      { goal: 'Mô tả thời tiết hiện tại bằng il fait', patterns: [/\bil fait\b/], hint: 'Il fait beau, mais il fait un peu froid.' },
    ],
    [
      { goal: 'Nói việc sẽ làm do thời tiết', patterns: [/\balors\b/, /\bje prends\b/], hint: 'Alors je prends mon parapluie.' },
    ],
    [
      // Trailing `\b` doesn't work right after an accented last letter — "été" ends in é.
      { goal: 'Nói thời tiết theo mùa bằng en + mùa', patterns: [/\ben hiver\b/, /\ben été(?=\s|$)/], hint: 'Oui, et il neige beaucoup en hiver.' },
    ],
  ],
  couleurs: [
    [
      { goal: 'Mô tả vị trí đồ vật bằng il y a', patterns: [/\bil y a\b/], hint: 'Il y a un sac rouge là-bas, à côté de la porte.' },
    ],
    [
      { goal: 'Nhắc lại “cái khác” không lặp danh từ', patterns: [/\bil y en a un autre\b/], hint: 'Il y en a un autre, noir et blanc, sur la chaise.' },
    ],
  ],
  gouts: [
    [
      { goal: 'Nói thích và không thích', patterns: [/\bj'aime\b/, /\bje n'aime pas\b/], hint: 'J’aime beaucoup le poisson, mais je n’aime pas la viande rouge.' },
    ],
    [
      { goal: 'So sánh bằng préférer X à Y', patterns: [/\bje préfère\b/], hint: 'Je préfère le thé au café.' },
    ],
    [
      { goal: 'Trả lời mức độ bằng un peu', patterns: [/\bun peu\b/], hint: 'Un peu, mais pas trop épicé.' },
    ],
  ],
  chambre: [
    [
      { goal: 'Mô tả đặc điểm phòng', patterns: [/\belle est petite\b/], hint: 'Elle est petite, mais très lumineuse.' },
    ],
    [
      { goal: 'Nói có gì bằng il y a', patterns: [/\bil y a\b/], hint: 'Oui, il y a un bureau et une grande fenêtre.' },
    ],
    [
      // Leading `\b` doesn't work before an accented first letter — "à côté de" starts with à.
      { goal: 'Nói vị trí bằng à côté de', patterns: [/(?:^|\s)à côté de\b/], hint: 'Il est juste à côté de la fenêtre.' },
    ],
  ],
  telephone: [
    [
      // Trailing `\b` doesn't work right after an accented word — "à" ends this pattern.
      { goal: 'Xin nói chuyện bằng parler à', patterns: [/\bje voudrais parler à(?=\s|$)/], hint: 'Bonjour, je voudrais parler à Monsieur Petit, s’il vous plaît.' },
    ],
    [
      { goal: 'Để lại lời nhắn bằng lui dire que', patterns: [/\blui dire que\b/], hint: 'Oui, pouvez-vous lui dire que Linh a appelé ?' },
    ],
    [
      { goal: 'Mời gọi lại', patterns: [/\bil peut me rappeler\b/], hint: 'Oui, il peut me rappeler quand il veut.' },
    ],
  ],
  corps: [
    [
      { goal: 'Nói triệu chứng bằng avoir mal à', patterns: [/\bj'ai mal au\b/, /\bj'ai mal à\b/], hint: 'Pas vraiment, j’ai mal au dos depuis ce matin.' },
    ],
    [
      { goal: 'Nói thêm triệu chứng khác', patterns: [/\baussi mal\b/], hint: 'Oui, et j’ai aussi mal à la tête.' },
    ],
    [
      { goal: 'Từ chối và nói sẽ nghỉ ngơi', patterns: [/\bje vais juste\b/], hint: 'Non merci, je vais juste dormir.' },
    ],
  ],
  bus: [
    [
      { goal: 'Mua vé bằng je voudrais un billet', patterns: [/\bun billet pour\b/], hint: 'Je voudrais un billet pour le centre-ville, s’il vous plaît.' },
    ],
    [
      { goal: 'Chọn loại vé khứ hồi', patterns: [/\baller-retour\b/], hint: 'Aller-retour, c’est moins cher, non ?' },
    ],
    [
      { goal: 'Hỏi bến/ke', patterns: [/\bquel quai\b/], hint: 'Parfait, merci. C’est quel quai ?' },
    ],
  ],
  semaine: [
    [
      { goal: 'Nói ngày rảnh bằng je suis libre', patterns: [/\bje suis libre\b/], hint: 'Je suis libre mardi et jeudi.' },
    ],
    [
      // Leading `\b` doesn't work before an accented first letter — "ça" starts with ç.
      { goal: 'Đề xuất giờ và hỏi xác nhận bằng ça te va', patterns: [/(?:^|\s)ça te va\b/], hint: 'Oui, jeudi après-midi, ça te va ?' },
    ],
    [
      { goal: 'Chốt lịch hẹn', patterns: [/\bd'accord\b/], hint: 'D’accord, à jeudi alors !' },
    ],
  ],
  banque: [
    [
      { goal: 'Đổi tiền bằng changer X en Y', patterns: [/\bchanger des dollars en\b/], hint: 'Oui, je voudrais changer des dollars en euros.' },
    ],
    [
      { goal: 'Hỏi mở tài khoản', patterns: [/\bouvrir un compte\b/], hint: 'Cent dollars. Et je voudrais aussi ouvrir un compte.' },
    ],
    [
      { goal: 'Đưa giấy tờ tùy thân', patterns: [/\bvoici mon passeport\b/], hint: 'Voici mon passeport.' },
    ],
  ],
  appartement_a1: [
    [
      { goal: 'Hỏi diện tích', patterns: [/\bcombien de mètres carrés\b/], hint: 'Oui, il fait combien de mètres carrés ?' },
    ],
    [
      { goal: 'Hỏi giá thuê', patterns: [/\ble loyer est de combien\b/], hint: 'Le loyer est de combien par mois ?' },
    ],
    [
      { goal: 'Xin hẹn xem nhà', patterns: [/\bje voudrais visiter\b/], hint: 'Parfait, je voudrais visiter cette semaine si possible.' },
    ],
  ],
  anniversaire: [
    [
      { goal: 'Mời và hỏi rảnh', patterns: [/\btu es libre\b/], hint: 'Oui, samedi prochain. Tu es libre ?' },
    ],
    [
      // Leading `\b` doesn't work before an accented first letter — "à partir de" starts with à.
      { goal: 'Nói giờ bằng à partir de', patterns: [/(?:^|\s)à partir de\b/], hint: 'À partir de dix-neuf heures, chez moi.' },
    ],
    [
      { goal: 'Nhận lời đề nghị giúp đỡ', patterns: [/\bce serait gentil\b/], hint: 'Si tu veux, ce serait gentil !' },
    ],
  ],
  etudes: [
    [
      { goal: 'Nói thời gian học bằng depuis', patterns: [/\bj'étudie le français depuis\b/], hint: 'J’étudie le français depuis six mois.' },
    ],
    [
      { goal: 'Nói khó khăn và sở thích', patterns: [/\bj'aime beaucoup ça\b/], hint: 'Un peu, surtout la grammaire, mais j’aime beaucoup ça.' },
    ],
    [
      { goal: 'Nói tần suất cụ thể', patterns: [/\ble mardi et le jeudi\b/], hint: 'Deux fois, le mardi et le jeudi.' },
    ],
  ],
  animaux: [
    [
      { goal: 'Giới thiệu thú cưng bằng qui s’appelle', patterns: [/\bqui s'appelle\b/], hint: 'Oui, j’ai un chat qui s’appelle Mimi.' },
    ],
    [
      { goal: 'Mô tả ngoại hình và thói quen', patterns: [/\bil dort presque\b/], hint: 'Il est noir et blanc, et il dort presque toute la journée.' },
    ],
    [
      { goal: 'Nói thời gian sở hữu và tính cách', patterns: [/\bil est très calme\b/], hint: 'Depuis deux ans. Il est très calme.' },
    ],
  ],
  quartier: [
    [
      { goal: 'Mô tả khu phố bằng pas mal de', patterns: [/\bpas mal de\b/], hint: 'Il est plutôt calme, avec pas mal de petits commerces.' },
    ],
    [
      // Pattern đứng trước à (có dấu) nên dùng (?:^|\s) thay \b, tránh lỗi \b trước chữ có dấu.
      { goal: 'Nói khoảng cách bằng à + thời gian + à pied', patterns: [/(?:^|\s)à cinq minutes à pied(?=\s|$)/], hint: 'Oui, le métro est à cinq minutes à pied d’ici.' },
    ],
    [
      { goal: 'Nói nơi mua sắm bằng juste au coin de la rue', patterns: [/\bjuste au coin de la rue\b/], hint: 'Il y a un marché le dimanche matin, juste au coin de la rue.' },
    ],
  ],
  reservation: [
    [
      { goal: 'Đặt bàn cho số người bằng réserver une table pour', patterns: [/\bréserver une table pour\b/], hint: 'Bonjour, je voudrais réserver une table pour quatre personnes.' },
    ],
    [
      { goal: 'Nói giờ ước chừng bằng vers + giờ', patterns: [/\bvers vingt heures\b/], hint: 'Samedi soir, vers vingt heures si possible.' },
    ],
    [
      // Ça bắt đầu bằng ç (không thuộc \w) nên \b đứng trước sẽ không khớp — dùng (?:^|\s).
      { goal: 'Xác nhận sự phù hợp bằng ça nous convient', patterns: [/(?:^|\s)ça nous convient\b/], hint: 'C’est parfait, ça nous convient très bien.' },
    ],
  ],
  perdu: [
    [
      { goal: 'Báo mất đồ bằng j’ai perdu', patterns: [/\bj'ai perdu\b/], hint: 'J’ai perdu mon portefeuille, probablement dans le bus.' },
    ],
    [
      { goal: 'Liệt kê đồ mất bằng un peu d’argent liquide', patterns: [/\bun peu d'argent liquide\b/], hint: 'Ma carte bancaire, mon permis de conduire et un peu d’argent liquide.' },
    ],
    [
      { goal: 'Nói sẽ xử lý ngay bằng tout de suite', patterns: [/\btout de suite\b/], hint: 'Pas encore, je vais appeler la banque tout de suite.' },
    ],
  ],
  projet_vacances: [
    [
      { goal: 'Nói dự định bằng je vais partir', patterns: [/\bje vais partir\b/], hint: 'Oui, je vais partir en Italie avec ma sœur.' },
    ],
    [
      { goal: 'Nói dự định tham quan bằng on va visiter', patterns: [/\bon va visiter\b/], hint: 'Deux semaines. On va visiter Rome et Venise.' },
    ],
    [
      { goal: 'Nói chưa làm nhưng sẽ làm bằng pas encore mais', patterns: [/\bpas encore mais\b/], hint: 'Pas encore, mais on va le faire bientôt.' },
    ],
  ],
  sport: [
    [
      { goal: 'Nói tần suất chơi bằng deux fois par semaine', patterns: [/\bdeux fois par semaine\b/], hint: 'Oui, je fais de la natation deux fois par semaine.' },
    ],
    [
      { goal: 'So sánh bằng meilleur pour', patterns: [/\bmeilleur pour\b/], hint: 'Oui, c’est meilleur pour mon dos.' },
    ],
    [
      { goal: 'Nói thời gian bắt đầu bằng depuis', patterns: [/\bdepuis l'enfance\b/], hint: 'Depuis l’enfance, en fait.' },
    ],
  ],
  supermarche: [
    [
      { goal: 'Hỏi khu hàng bằng le rayon des', patterns: [/\ble rayon des\b/], hint: 'Oui, je cherche le rayon des produits laitiers.' },
    ],
    [
      { goal: 'Hỏi giờ đóng cửa bằng ferment à quelle heure', patterns: [/\bferment à quelle heure\b/], hint: 'Merci. Et les caisses, elles ferment à quelle heure ?' },
    ],
    [
      { goal: 'Nói có đủ thời gian bằng largement le temps', patterns: [/\blargement le temps\b/], hint: 'Parfait, j’ai largement le temps.' },
    ],
  ],
  presenter: [
    [
      { goal: 'Giới thiệu bạn bằng je te présente', patterns: [/\bje te présente\b/], hint: 'Oui, je te présente Marc, il est italien.' },
    ],
    [
      // "à" đứng cuối cụm (trước tên thành phố) — \b sau à không khớp vì à không thuộc \w, dùng (?=\s|$).
      { goal: 'Nói nghề nghiệp và nơi làm việc bằng il travaille à', patterns: [/\bil travaille à(?=\s|$)/], hint: 'Il est architecte, il travaille à Lyon.' },
    ],
    [
      { goal: 'Nói đã quen nhau ở đâu bằng on s’est rencontrés', patterns: [/\bon s'est rencontrés\b/], hint: 'Oui, on s’est rencontrés à l’université.' },
    ],
  ],
  heure_rdv: [
    [
      { goal: 'Đề nghị giờ khác bằng je préférerais', patterns: [/\bje préférerais\b/], hint: 'En fait, je préférerais un peu plus tard, si possible.' },
    ],
    [
      { goal: 'Xác nhận giờ mới bằng c’est parfait pour moi', patterns: [/\bc'est parfait pour moi\b/], hint: 'Oui, quinze heures, c’est parfait pour moi.' },
    ],
    [
      { goal: 'Xác nhận địa điểm bằng comme on avait dit', patterns: [/\bcomme on avait dit\b/], hint: 'Oui, devant la gare, comme on avait dit.' },
    ],
  ],
  vetements: [
    [
      { goal: 'Nói cỡ muốn thử bằng en taille', patterns: [/\ben taille\b/], hint: 'Oui, je voudrais essayer cette veste, en taille M.' },
    ],
    [
      { goal: 'Hỏi màu khác bằng vous l’avez aussi en', patterns: [/\bvous l'avez aussi en\b/], hint: 'Merci. Est-ce que vous l’avez aussi en bleu ?' },
    ],
    [
      { goal: 'Cảm ơn bằng merci beaucoup', patterns: [/\bmerci beaucoup\b/], hint: 'Super, merci beaucoup.' },
    ],
  ],
  apparence: [
    [
      { goal: 'Mô tả chiều cao và tóc', patterns: [/\belle est assez grande\b/], hint: 'Elle est assez grande, avec les cheveux longs et bouclés.' },
    ],
    [
      { goal: 'Mô tả trang phục hay mặc', patterns: [/\belle a souvent\b/], hint: 'Elle a souvent un manteau rouge et des lunettes.' },
    ],
    [
      { goal: 'Ước lượng tuổi', patterns: [/\bla trentaine\b/], hint: 'Elle a la trentaine, je dirais.' },
    ],
  ],
  meteo_passe: [
    [
      { goal: 'Kể sự kiện thời tiết bằng passé composé', patterns: [/\bil a plu\b/], hint: 'Au début, oui, mais après il a plu presque tous les jours.' },
    ],
    [
      { goal: 'Mô tả bối cảnh bằng imparfait', patterns: [/\bil faisait doux\b/], hint: 'Pas vraiment, il faisait doux, autour de quinze degrés.' },
    ],
    [
      { goal: 'So sánh với hiện tại', patterns: [/\bplus chaud\b/], hint: 'Il fait beaucoup plus chaud qu’à cette époque-là.' },
    ],
  ],
  ville_comparaison: [
    [
      { goal: 'So sánh hai nơi', patterns: [/\bplus calme\b/], hint: 'Ici, c’est plus calme, mais là-bas il y avait plus d’activités.' },
    ],
    [
      { goal: 'So sánh kém hơn bằng moins', patterns: [/\bmoins chers\b/], hint: 'Oui, et surtout moins chers qu’avant.' },
    ],
    [
      { goal: 'Khẳng định không hối tiếc', patterns: [/\bje ne regrette pas\b/], hint: 'Non, c’est différent, mais je ne regrette pas du tout.' },
    ],
  ],
  plainte_a2: [
    [
      { goal: 'Nêu vấn đề bằng pas très', patterns: [/\bpas très propre\b/], hint: 'En fait, non. La salle de bain n’est pas très propre.' },
    ],
    [
      { goal: 'Nói thiếu gì bằng il manque', patterns: [/\bil manque\b/], hint: 'Merci, et il manque aussi des serviettes.' },
    ],
    [
      // Trailing `\b` doesn't work right after an accented last letter — "réactivité" ends in é.
      { goal: 'Cảm ơn sự nhanh chóng', patterns: [/\bvotre réactivité(?=\s|$)/], hint: 'Parfait, merci beaucoup pour votre réactivité.' },
    ],
  ],
  fete: [
    [
      { goal: 'Đề xuất địa điểm bằng plutôt', patterns: [/\bplutôt chez moi\b/], hint: 'Plutôt chez moi, c’est plus grand.' },
    ],
    [
      { goal: 'Nói số lượng ước chừng', patterns: [/\bune quinzaine\b/], hint: 'Une quinzaine, je pense, pas plus.' },
    ],
    [
      { goal: 'Nhận lời giúp đỡ', patterns: [/\bavec plaisir\b/], hint: 'Avec plaisir, ce serait super si tu pouvais.' },
    ],
  ],
  remise: [
    [
      { goal: 'Xin giảm giá bằng vous pourriez faire une remise', patterns: [/\bvous pourriez faire une petite remise\b/], hint: 'C’est un peu cher pour moi. Vous pourriez faire une petite remise ?' },
    ],
    [
      { goal: 'Đề xuất điều kiện bằng ce serait possible de', patterns: [/\bce serait possible d'avoir plus\b/], hint: 'Et si je paie en espèces, ce serait possible d’avoir plus ?' },
    ],
    [
      // Ça bắt đầu bằng ç (không thuộc \w) nên \b đứng trước sẽ không khớp — dùng (?:^|\s).
      { goal: 'Xác nhận chốt giá bằng ça me convient', patterns: [/(?:^|\s)ça me convient\b/], hint: 'D’accord, ça me convient.' },
    ],
  ],
  trajet: [
    [
      { goal: 'Kể sự việc bằng il y a eu', patterns: [/\bil y a eu\b/], hint: 'Désolée, il y a eu un problème sur la ligne, le train s’est arrêté pendant vingt minutes.' },
    ],
    [
      { goal: 'Nói tần suất bằng de temps en temps', patterns: [/\bde temps en temps\b/], hint: 'De temps en temps, surtout aux heures de pointe.' },
    ],
    [
      // Pattern kết thúc bằng "sécurité" (chữ cuối é không thuộc \w) nên \b sau nó không khớp — dùng (?=\s|$).
      { goal: 'Nói sẽ phòng ngừa bằng une marge de sécurité', patterns: [/\bune marge de sécurité(?=\s|$)/], hint: 'Oui, je vais prévoir une marge de sécurité.' },
    ],
  ],
  emprunt: [
    [
      { goal: 'Xin mượn bằng je pourrais vous emprunter', patterns: [/\bje pourrais vous emprunter\b/], hint: 'Bonjour, est-ce que je pourrais vous emprunter une échelle ?' },
    ],
    [
      { goal: 'Nói lý do mượn bằng pour accrocher des rideaux', patterns: [/\bpour accrocher des rideaux\b/], hint: 'Pour accrocher des rideaux, ce ne sera pas long.' },
    ],
    [
      { goal: 'Hứa trả lại bằng je vous la rends', patterns: [/\bje vous la rends\b/], hint: 'Merci beaucoup, je vous la rends demain matin.' },
    ],
  ],
  ecole_enfant: [
    [
      { goal: 'Nói khó khăn bằng avoir un peu de mal en', patterns: [/\belle a un peu de mal en mathématiques\b/], hint: 'Plutôt bien, mais elle a un peu de mal en mathématiques.' },
    ],
    [
      { goal: 'Nói điểm mạnh bằng elle adore lire à voix haute', patterns: [/\belle adore lire à voix haute\b/], hint: 'Oui, elle adore lire à voix haute devant les autres.' },
    ],
    [
      // Ça bắt đầu bằng ç (không thuộc \w) nên \b đứng trước sẽ không khớp — dùng (?:^|\s).
      { goal: 'Nhận lời giúp đỡ bằng ça l’aiderait beaucoup', patterns: [/(?:^|\s)ça l'aiderait beaucoup\b/], hint: 'Avec plaisir, ça l’aiderait beaucoup.' },
    ],
  ],
  hobby: [
    [
      { goal: 'Nói thời gian bằng depuis environ un an', patterns: [/\bdepuis environ un an\b/], hint: 'Oui, je fais de la poterie depuis environ un an.' },
    ],
    [
      // Pattern kết thúc bằng "accroché" (chữ cuối é không thuộc \w) nên \b sau nó không khớp — dùng (?=\s|$).
      { goal: 'Nói đã thích ngay bằng j’ai tout de suite accroché', patterns: [/\bj'ai tout de suite accroché(?=\s|$)/], hint: 'Une amie m’a invitée à un atelier, et j’ai tout de suite accroché.' },
    ],
    [
      { goal: 'Nói tần suất bằng selon mon emploi du temps', patterns: [/\bselon mon emploi du temps\b/], hint: 'Deux ou trois fois, selon mon emploi du temps.' },
    ],
  ],
  recette: [
    [
      { goal: 'Xin công thức bằng tu pourrais me donner la recette', patterns: [/\btu pourrais me donner la recette\b/], hint: 'Énormément, tu pourrais me donner la recette ?' },
    ],
    [
      { goal: 'Hỏi bước tiếp theo bằng qu\'est-ce qu\'on ajoute', patterns: [/\bqu'est-ce qu'on ajoute\b/], hint: 'Et après, qu’est-ce qu’on ajoute ?' },
    ],
    [
      { goal: 'Nói sẽ thử làm bằng je vais essayer', patterns: [/\bje vais essayer ce week-end\b/], hint: 'D’accord, je vais essayer ce week-end.' },
    ],
  ],
  banque_a2: [
    [
      { goal: 'Nói loại tài khoản bằng un compte courant', patterns: [/\bun compte courant\b/], hint: 'Un compte courant, pour commencer.' },
    ],
    [
      { goal: 'Nói chưa có giấy tờ bằng pas encore de justificatif à mon nom', patterns: [/\bpas encore de justificatif à mon nom\b/], hint: 'J’ai mon passeport, mais pas encore de justificatif à mon nom.' },
    ],
    [
      { goal: 'Hứa mang đến bằng dès que possible', patterns: [/\bje vous l'apporte dès que possible\b/], hint: 'Parfait, je vous l’apporte dès que possible.' },
    ],
  ],
  objet_cadeau: [
    [
      { goal: 'Nói sở thích người nhận bằng elle aime beaucoup lire', patterns: [/\belle aime beaucoup lire\b/], hint: 'C’est pour l’anniversaire d’une amie, elle aime beaucoup lire.' },
    ],
    [
      { goal: 'Hỏi gợi ý khác bằng vous auriez quelque chose', patterns: [/\bvous auriez quelque chose\b/], hint: 'Il est joli. Vous auriez quelque chose d’un peu moins cher aussi ?' },
    ],
    [
      { goal: 'Chốt mua bằng je prends les deux', patterns: [/\bje prends les deux\b/], hint: 'Parfait, je prends les deux.' },
    ],
  ],
  internet: [
    [
      { goal: 'Báo sự cố bằng ne marche plus depuis ce matin', patterns: [/\bne marche plus depuis ce matin\b/], hint: 'Internet ne marche plus depuis ce matin, la box clignote en orange.' },
    ],
    [
      // Ça bắt đầu bằng ç (không thuộc \w) nên \b đứng trước sẽ không khớp — dùng (?:^|\s).
      { goal: 'Nói chưa khắc phục bằng ça ne change rien', patterns: [/(?:^|\s)ça ne change rien\b/], hint: 'Oui, deux fois, mais ça ne change rien.' },
    ],
    [
      { goal: 'Nhờ báo tin bằng tenez-moi au courant', patterns: [/\btenez-moi au courant\b/], hint: 'Merci, tenez-moi au courant dès que vous savez quelque chose.' },
    ],
  ],
  coiffeur: [
    [
      { goal: 'Nói không đổi độ dài bằng sans changer la longueur', patterns: [/\bsans changer la longueur\b/], hint: 'Juste une coupe d’entretien, sans changer la longueur.' },
    ],
    [
      { goal: 'Đồng ý nhẹ nhàng bằng pas trop court sur les côtés', patterns: [/\bpas trop court sur les côtés\b/], hint: 'Oui, pourquoi pas, mais pas trop court sur les côtés.' },
    ],
    [
      // Ça bắt đầu bằng ç (không thuộc \w) nên \b đứng trước sẽ không khớp — dùng (?:^|\s).
      { goal: 'Từ chối nhẹ nhàng bằng ça ira', patterns: [/(?:^|\s)ça ira\b/], hint: 'Non merci, ça ira, je suis pressée aujourd’hui.' },
    ],
  ],
  demenagement: [
    [
      { goal: 'Báo trước bằng je voulais vous prévenir à l’avance', patterns: [/\bje voulais vous prévenir à l'avance\b/], hint: 'Oui, je vais déménager à la fin du mois, je voulais vous prévenir à l’avance.' },
    ],
    [
      { goal: 'Hứa bàn giao bằng je vous laisserai les clés', patterns: [/\bje vous laisserai les clés\b/], hint: 'Je vous laisserai les clés le dernier jour.' },
    ],
    [
      { goal: 'Xác nhận linh hoạt bằng n’importe quel samedi', patterns: [/\bn'importe quel samedi me convient\b/], hint: 'Oui, n’importe quel samedi me convient.' },
    ],
  ],
  abonnement: [
    [
      { goal: 'Xin hủy bằng je voudrais résilier mon abonnement', patterns: [/\bje voudrais résilier mon abonnement\b/], hint: 'Je voudrais résilier mon abonnement, s’il vous plaît.' },
    ],
    [
      { goal: 'Nêu lý do bằng j’ai trouvé une offre moins chère ailleurs', patterns: [/\bj'ai trouvé une offre moins chère ailleurs\b/], hint: 'J’ai trouvé une offre moins chère ailleurs.' },
    ],
    [
      { goal: 'Xác nhận đã ghi nhận bằng c’est noté merci', patterns: [/\bc'est noté merci\b/], hint: 'D’accord, c’est noté, merci.' },
    ],
  ],
  sante_a2: [
    [
      { goal: 'Đặt hẹn bằng je voudrais prendre rendez-vous avec', patterns: [/\bje voudrais prendre rendez-vous avec un dermatologue\b/], hint: 'Bonjour, je voudrais prendre rendez-vous avec un dermatologue.' },
    ],
    [
      { goal: 'Nói lý do bằng mon médecin généraliste m’a conseillé', patterns: [/\bmon médecin généraliste m'a conseillé de venir\b/], hint: 'Non, c’est la première fois, mon médecin généraliste m’a conseillé de venir.' },
    ],
    [
      { goal: 'Xác nhận giờ đến bằng je viendrai un quart d’heure avant', patterns: [/\bje viendrai un quart d'heure avant\b/], hint: 'Très bien, je viendrai un quart d’heure avant.' },
    ],
  ],
  souvenirs_enfance: [
    [
      { goal: 'Kể hoàn cảnh bằng on n’avait pas beaucoup d’argent', patterns: [/\bon n'avait pas beaucoup d'argent\b/], hint: 'Très simple. On n’avait pas beaucoup d’argent, mais on était heureux.' },
    ],
    [
      { goal: 'Kể thói quen bằng tous les étés on allait chez mes grands-parents', patterns: [/\btous les étés on allait chez mes grands-parents\b/], hint: 'Dans un petit village, et tous les étés on allait chez mes grands-parents à la campagne.' },
    ],
    [
      // Pattern kết thúc bằng "tombée" (chữ cuối é không thuộc \w) nên \b sau nó không khớp — dùng (?=\s|$).
      { goal: 'Nói đến khi nào bằng jusqu’à la nuit tombée', patterns: [/\bjusqu'à la nuit tombée(?=\s|$)/], hint: 'Oui, on passait des heures à jouer dehors jusqu’à la nuit tombée.' },
    ],
  ],
  itineraire: [
    [
      { goal: 'Đề xuất giờ khởi hành bằng préférerais', patterns: [/\bje préférerais\b/], hint: 'Je préférerais partir vendredi soir, pour profiter de deux jours complets.' },
    ],
    [
      // Leading `\b` doesn't work before an accented first letter — "à condition de" starts with à.
      { goal: 'Nêu điều kiện bằng à condition de', patterns: [/(?:^|\s)à condition de\b/], hint: 'J’ai trouvé un gîte pas cher, à condition de réserver avant jeudi.' },
    ],
    [
      { goal: 'Đề xuất phương án dự phòng', patterns: [/\bon pourrait visiter\b/], hint: 'Oui, on pourrait visiter le musée local dans ce cas.' },
    ],
  ],
  environnement: [
    [
      // Trailing `\b` doesn't work right after an accented last letter — "compliqué" ends in é.
      { goal: 'Thừa nhận khó khăn', patterns: [/\bc'est parfois compliqué(?=\s|$)/], hint: 'J’essaie, mais c’est parfois compliqué de savoir quoi mettre où.' },
    ],
    [
      { goal: 'Nói nhầm lẫn cụ thể', patterns: [/\bje me trompe souvent\b/], hint: 'Oui, mais je me trompe souvent avec les emballages mélangés.' },
    ],
    [
      { goal: 'Nhấn mạnh tầm quan trọng', patterns: [/\bc'est important pour\b/], hint: 'J’espère, parce que c’est important pour l’environnement.' },
    ],
  ],
  habitudes_sante: [
    [
      { goal: 'Mô tả thói quen ăn uống', patterns: [/\bje mange souvent\b/], hint: 'Plutôt équilibrée, mais je mange souvent trop vite.' },
    ],
    [
      { goal: 'Mô tả giấc ngủ bằng ce qui', patterns: [/\bce qui n'est\b/], hint: 'Je dors environ six heures, ce qui n’est sans doute pas assez.' },
    ],
    [
      { goal: 'Nêu dự định cải thiện', patterns: [/\bje vais essayer de\b/], hint: 'Je vais essayer de me coucher plus tôt.' },
    ],
  ],
  serie_tv: [
    [
      { goal: 'Giới thiệu bằng celle que', patterns: [/\bcelle que je regarde\b/], hint: 'Celle que je regarde en ce moment est vraiment addictive.' },
    ],
    [
      { goal: 'Nêu góc nhìn kể chuyện', patterns: [/\bdu point de vue\b/], hint: 'D’une enquête policière, mais racontée du point de vue du suspect.' },
    ],
    [
      { goal: 'Nêu đặc điểm hấp dẫn', patterns: [/\bcoup de théâtre\b/], hint: 'Trois, et chacune se termine par un vrai coup de théâtre.' },
    ],
  ],
  cause_effet: [
    [
      // Leading `\b` doesn't work before an accented first letter — "à cause" starts with à.
      { goal: 'Nêu nguyên nhân tiêu cực bằng à cause de', patterns: [/(?:^|\s)à cause\b/], hint: 'À cause d’un problème technique, nous avons dû tout retester.' },
    ],
    [
      { goal: 'Nối kết quả bằng du coup', patterns: [/\bdu coup\b/], hint: 'Oui, du coup, nous avons dépassé le budget initial de dix pour cent.' },
    ],
    [
      // Trailing `\b` doesn't work right after an accented word — "à" ends this pattern.
      { goal: 'Nêu nguyên nhân tích cực bằng grâce à', patterns: [/\bgrâce à(?=\s|$)/], hint: 'Grâce à de meilleurs tests en amont, on pourrait l’éviter.' },
    ],
  ],
  feedback_constructif: [
    [
      { goal: 'Khen tổng quát bằng dans l’ensemble', patterns: [/\bdans l'ensemble\b/], hint: 'Dans l’ensemble, c’est solide. J’aurais juste une remarque sur la conclusion.' },
    ],
    [
      // Trailing `\b` doesn't work right after an accented word — "être" ends in e-circumflex.
      { goal: 'Góp ý nhẹ bằng pourrait être', patterns: [/\bpourrait être(?=\s|$)/], hint: 'Elle pourrait être un peu plus synthétique, à mon avis.' },
    ],
    [
      { goal: 'Khen phần còn lại', patterns: [/\ble reste est vraiment\b/], hint: 'Sinon, le reste est vraiment bien structuré.' },
    ],
  ],
  teletravail: [
    [
      // Leading `\b` doesn't work before an accented first letter — "ça" starts with ç.
      { goal: 'Nêu lợi ích và rủi ro bằng conditionnel', patterns: [/(?:^|\s)ça faciliterait\b/], hint: 'Ça faciliterait la vie de beaucoup de monde, mais il y aurait un risque d’isolement.' },
    ],
    [
      { goal: 'Đề xuất giải pháp bằng en + gérondif', patterns: [/\ben gardant\b/], hint: 'En gardant au moins une journée commune au bureau, par exemple.' },
    ],
    [
      { goal: 'Nêu ngoại lệ cho nhóm cụ thể', patterns: [/\bdevrait rester\b/], hint: 'Pour eux, je pense que la présence au bureau devrait rester plus fréquente au début.' },
    ],
  ],
  politique_env: [
    [
      { goal: 'Thừa nhận lo ngại rồi phản biện bằng sans…rien ne', patterns: [/\bsans incitation\b/], hint: 'Je comprends votre inquiétude, mais sans incitation, rien ne changera.' },
    ],
    [
      // Leading `\b` doesn't work before an accented first letter — "à condition que" starts with à.
      { goal: 'Chấp nhận có điều kiện', patterns: [/(?:^|\s)à condition que\b/], hint: 'C’est en effet envisageable, à condition que les objectifs restent clairs.' },
    ],
    [
      { goal: 'Đồng tình và nêu lợi ích', patterns: [/\btout à fait\b/], hint: 'Tout à fait, cela faciliterait l’adhésion des entreprises comme la vôtre.' },
    ],
  ],
  immigration_respect: [
    [
      { goal: 'Tôn trọng quan điểm khác', patterns: [/\bje respecte ton point de vue\b/], hint: 'Je respecte ton point de vue, même si je ne le partage pas entièrement.' },
    ],
    [
      { goal: 'Giải thích lý do, gắn với selon moi', patterns: [/\bselon moi\b/], hint: 'Parce que les études montrent des effets plutôt positifs sur l’économie, selon moi.' },
    ],
    [
      { goal: 'Đề nghị chia sẻ nguồn', patterns: [/\bje peux te les envoyer\b/], hint: 'Je peux te les envoyer, si ça t’intéresse.' },
    ],
  ],
  publicite: [
    [
      { goal: 'Phân tích kỹ thuật bằng jouer sur', patterns: [/\bjoue beaucoup sur\b/], hint: 'Elle joue beaucoup sur l’émotion, plus que sur les caractéristiques du produit.' },
    ],
    [
      // Leading `\b` doesn't work before an accented first letter — "ça" starts with ç.
      { goal: 'Đánh giá hiệu quả có điều kiện', patterns: [/(?:^|\s)ça dépend du public\b/], hint: 'Ça dépend du public visé, mais ici, ça me semble bien ciblé.' },
    ],
    [
      { goal: 'Giải thích chủ đích', patterns: [/\bc'est sans doute voulu\b/], hint: 'C’est vrai, mais c’est sans doute voulu pour marquer les esprits.' },
    ],
  ],
  velo: [
    [
      { goal: 'Nói thời gian thuê', patterns: [/\bpour toute la journée\b/], hint: 'Pour toute la journée, s’il vous plaît.' },
    ],
    [
      { goal: 'Xin đồ bảo hộ bằng mettez-moi', patterns: [/\bmettez-moi\b/], hint: 'Oui, mais mettez-moi un casque, je préfère être prudente.' },
    ],
    [
      { goal: 'Báo sự cố kỹ thuật', patterns: [/\ble frein\b/, /\bne marche pas\b/], hint: 'En fait, le frein arrière ne marche pas très bien.' },
    ],
    [
      { goal: 'Cảm ơn', patterns: [/\bmerci\b/], hint: 'Merci, c’est gentil.' },
    ],
  ],
  pharmacie: [
    [
      { goal: 'Mô tả triệu chứng bằng avoir mal à + depuis', patterns: [/\bj'ai mal\b/], hint: 'Oui, j’ai mal à la tête depuis ce matin.' },
    ],
    [
      { goal: 'Trả lời chưa làm gì bằng rien pour l’instant', patterns: [/\brien pour l'instant\b/], hint: 'Non, rien pour l’instant.' },
    ],
    [
      { goal: 'Hỏi cách dùng thuốc', patterns: [/\best-ce que je peux\b/], hint: 'Est-ce que je peux le prendre avec du café ?' },
    ],
  ],
  valise: [
    [
      { goal: 'Báo hành lý chưa tới', patterns: [/\bn'est pas arrivée\b/], hint: 'Oui, ma valise n’est pas arrivée.' },
    ],
    [
      // Leading `\b` doesn't work before an accented first letter — "étiquette" starts with é.
      { goal: 'Mô tả đặc điểm hành lý', patterns: [/\belle est noire\b/, /(?:^|\s)étiquette\b/], hint: 'Oui, le voici. Elle est noire, avec une étiquette rouge.' },
    ],
    [
      { goal: 'Hỏi thời gian bằng combien de temps', patterns: [/\bcombien de temps\b/], hint: 'Combien de temps ça prend, en général ?' },
    ],
  ],
  restaurant_avis: [
    [
      { goal: 'Khen và nhận xét nhẹ bằng trop', patterns: [/\bdélicieux\b/, /\btrop salé\b/], hint: 'Il est délicieux, mais un peu trop salé pour moi.' },
    ],
    [
      { goal: 'Nhận lời mời nếm thử', patterns: [/\bavec plaisir\b/], hint: 'Avec plaisir ! Hmm, c’est excellent.' },
    ],
    [
      { goal: 'Từ chối nhẹ bằng ne…plus', patterns: [/\bje n'ai plus\b/], hint: 'Peut-être, mais je n’ai plus très faim.' },
    ],
  ],
  excuse: [
    [
      { goal: 'Xin lỗi và giải thích bằng se tromper de', patterns: [/\bje me suis trompée\b/, /\bdésolée\b/], hint: 'Je suis vraiment désolée, je me suis trompée de route.' },
    ],
    [
      { goal: 'Bổ sung lý do bằng en plus', patterns: [/\ben plus\b/], hint: 'En plus, mon bus est arrivé en retard.' },
    ],
    [
      { goal: 'Xin lỗi lần nữa bằng encore', patterns: [/\bencore désolée\b/], hint: 'Oui, encore désolée pour l’attente.' },
    ],
  ],
  reclamation: [
    [
      { goal: 'Mô tả vấn đề bằng mệnh đề quan hệ qui', patterns: [/\bqui ne correspond pas\b/], hint: 'J’ai reçu un article qui ne correspond pas à ma commande.' },
    ],
    [
      // Trailing `\b` doesn't work right after an accented last letter — "commandé" ends in é.
      { goal: 'Mô tả sai lệch cụ thể bằng j’ai commandé', patterns: [/\bj'ai commandé(?=\s|$)/], hint: 'J’ai commandé une veste noire, mais j’ai reçu une veste grise.' },
    ],
    [
      { goal: 'Đề xuất giải pháp bằng conditionnel', patterns: [/\bje préférerais\b/], hint: 'Je préférerais un échange, si c’est possible rapidement.' },
    ],
    [
      { goal: 'Cảm ơn và bày tỏ mong muốn', patterns: [/\bj'espère que\b/], hint: 'Merci, j’espère que ça ne se reproduira pas.' },
    ],
  ],
  etudes_projet: [
    [
      { goal: 'Nói dự định bằng penser + nguyên mẫu', patterns: [/\bje pense m'inscrire\b/], hint: 'Oui, je pense m’inscrire à un master à l’étranger.' },
    ],
    [
      { goal: 'Nêu điều kiện bằng si + futur simple', patterns: [/\bsi je suis acceptée\b/], hint: 'En commerce international. Si je suis acceptée, je partirai en septembre.' },
    ],
    [
      { goal: 'Thừa nhận lo lắng bằng même si', patterns: [/\bmême si\b/], hint: 'Je crois que oui, même si ça me fait un peu peur.' },
    ],
  ],
  actualite_discussion: [
    [
      { goal: 'Nhận xét bằng plutôt', patterns: [/\bplutôt\b/], hint: 'Oui, j’ai trouvé ça plutôt positif pour le quartier.' },
    ],
    [
      { goal: 'Thừa nhận ý kiến trái chiều rồi bảo vệ bằng mais', patterns: [/\bmais ça créera\b/], hint: 'C’est possible, mais ça créera aussi des emplois.' },
    ],
    [
      { goal: 'Nói chưa chắc bằng on verra bien', patterns: [/\bon verra bien\b/], hint: 'Je n’en suis pas sûre, on verra bien.' },
    ],
  ],
  conseil_ami: [
    [
      // Leading `\b` doesn't work before an accented first letter — "à ta place" starts with à.
      { goal: 'Khuyên bằng à ta place', patterns: [/(?:^|\s)à ta place\b/], hint: 'À ta place, j’en parlerais directement avec lui.' },
    ],
    [
      { goal: 'Khuyên bằng tu devrais', patterns: [/\btu devrais\b/], hint: 'Tu devrais au moins essayer, poliment mais clairement.' },
    ],
    [
      { goal: 'Khuyến khích chia sẻ sau này', patterns: [/\bn'hésite pas\b/], hint: 'N’hésite pas à me dire comment ça se passe.' },
    ],
  ],
  hobby_approfondi: [
    [
      { goal: 'Nói thời gian bằng depuis', patterns: [/\bdepuis plus de\b/], hint: 'Je fais de la photographie depuis plus de cinq ans.' },
    ],
    [
      { goal: 'Nhấn mạnh chủ thể bằng c’est…qui', patterns: [/\bc'est mon grand-père qui\b/], hint: 'C’est mon grand-père qui m’a offert mon premier appareil.' },
    ],
    [
      { goal: 'Nói sự ưu tiên bằng préférer', patterns: [/\bje préfère\b/], hint: 'Je préfère les paysages, surtout au lever du soleil.' },
    ],
  ],
  debat_social: [
    [
      { goal: 'Thừa nhận rồi đề xuất bằng il faudrait', patterns: [/\bil faudrait\b/], hint: 'Je comprends, mais il faudrait quand même réduire la pollution.' },
    ],
    [
      { goal: 'Hỏi ý kiến cởi mở', patterns: [/\bproposerais-tu\b/], hint: 'Quelle alternative proposerais-tu, alors ?' },
    ],
    [
      // Leading `\b` doesn't work before an accented first letter — "ça" starts with ç.
      { goal: 'Đồng tình bằng ça me semble', patterns: [/(?:^|\s)ça me semble\b/], hint: 'Ça me semble plus raisonnable, en effet.' },
    ],
  ],
  email_formel: [
    [
      { goal: 'Mở đầu trang trọng bằng je me permets de', patterns: [/\bje me permets de\b/], hint: 'Je me permets de vous signaler un retard important dans la livraison.' },
    ],
    [
      { goal: 'Nêu mong muốn bằng j’aimerais que', patterns: [/\bj'aimerais que\b/], hint: 'J’aimerais que cette situation ne se reproduise plus à l’avenir.' },
    ],
    [
      { goal: 'Cảm ơn trang trọng', patterns: [/\bje vous remercie\b/], hint: 'Je vous remercie de votre compréhension.' },
    ],
  ],
  offre_emploi: [
    [
      { goal: 'So sánh lợi/hại bằng mais', patterns: [/\bmais\b/], hint: 'Le salaire est plus élevé, mais le trajet serait beaucoup plus long.' },
    ],
    [
      { goal: 'Diễn đạt tiếc nuối bằng si + plus-que-parfait', patterns: [/\bsi j'avais su\b/], hint: 'Exactement. Si j’avais su, j’aurais négocié le télétravail dès le départ.' },
    ],
    [
      // Leading `\b` doesn't work before an accented first letter — "ça" starts with ç.
      { goal: 'Chấp nhận thử bằng ça ne coûte rien', patterns: [/(?:^|\s)ça ne coûte rien\b/], hint: 'C’est vrai, ça ne coûte rien d’essayer.' },
    ],
  ],
  statistiques: [
    [
      { goal: 'Nêu mức thay đổi bằng augmenter de + %', patterns: [/\ba augmenté de\b/], hint: 'Il montre que la satisfaction a augmenté de dix pour cent en un an.' },
    ],
    [
      { goal: 'Giải thích thận trọng bằng cela pourrait s’expliquer par', patterns: [/\bcela pourrait s'expliquer par\b/], hint: 'Cela pourrait s’expliquer par le nouveau service client.' },
    ],
    [
      { goal: 'Thừa nhận chưa chắc chắn hoàn toàn', patterns: [/\bpas totalement\b/], hint: 'Pas totalement : d’autres facteurs ont pu jouer aussi.' },
    ],
  ],
  dilemme_ethique: [
    [
      { goal: 'Nói sẽ làm gì trước bằng si + imparfait, conditionnel', patterns: [/\bje lui en parlerais\b/], hint: 'Je lui en parlerais d’abord, avant de signaler quoi que ce soit.' },
    ],
    [
      { goal: 'Nêu bước tiếp theo bằng je devrais', patterns: [/\bje devrais\b/], hint: 'Dans ce cas, je devrais sans doute en informer mon responsable.' },
    ],
    [
      { goal: 'Thừa nhận khó khăn nhưng giữ quan điểm', patterns: [/\bce serait difficile\b/], hint: 'Ce serait difficile, mais je pense que ce serait nécessaire.' },
    ],
  ],
  discours_formel: [
    [
      { goal: 'Mở đầu trang trọng bằng c’est un honneur de', patterns: [/\bc'est un honneur de\b/], hint: 'Mesdames et messieurs, c’est un honneur de m’adresser à vous aujourd’hui.' },
    ],
    [
      { goal: 'Cảm ơn trang trọng bằng permettez-moi', patterns: [/\bpermettez-moi\b/], hint: 'Permettez-moi tout d’abord de remercier l’ensemble des équipes.' },
    ],
    [
      { goal: 'Chuyển ý bằng j’en viens à', patterns: [/\bj'en viens\b/], hint: 'J’en viens maintenant au bilan de cette année exceptionnelle.' },
    ],
  ],
  questions_hostiles: [
    [
      { goal: 'Thừa nhận câu hỏi bằng question légitime', patterns: [/\bquestion légitime\b/], hint: 'C’est une question légitime, et j’y viens justement.' },
    ],
    [
      { goal: 'Bổ sung bằng laissez-moi', patterns: [/\blaissez-moi\b/], hint: 'Je comprends vos doutes, mais laissez-moi apporter une précision.' },
    ],
    [
      // Trailing `\b` doesn't work right after an accented word — "à" ends this pattern.
      { goal: 'Khẳng định sắp trình bày', patterns: [/\bje m'apprête à(?=\s|$)/], hint: 'C’est précisément ce que je m’apprête à vous présenter.' },
    ],
  ],
  resume_academique: [
    [
      { goal: 'Giới thiệu chủ đề bằng l’étude porte sur', patterns: [/\bl'étude porte sur\b/], hint: 'L’étude porte sur l’impact du sommeil sur la mémoire à long terme.' },
    ],
    [
      { goal: 'Nêu phương pháp nghiên cứu', patterns: [/\bles auteurs ont suivi\b/], hint: 'Les auteurs ont suivi un échantillon de deux cents participants pendant six mois.' },
    ],
    [
      { goal: 'Nêu kết luận bằng ils concluent que', patterns: [/\bils concluent\b/], hint: 'Ils concluent qu’un sommeil insuffisant nuit significativement à la rétention d’information.' },
    ],
  ],
  desaccord_nuance: [
    [
      { goal: 'Nghi ngờ lịch sự bằng je ne suis pas certaine que', patterns: [/\bje ne suis pas certaine\b/], hint: 'Je ne suis pas certaine que ce soit le bon moment, si vous me permettez.' },
    ],
    [
      { goal: 'Mở đầu bất đồng bằng sans vouloir', patterns: [/\bsans vouloir\b/], hint: 'Sans vouloir remettre en cause votre analyse, le marché me semble encore instable.' },
    ],
    [
      { goal: 'Đề xuất nhẹ bằng pourrions-nous', patterns: [/\bpourrions-nous\b/], hint: 'Peut-être pourrions-nous simplement repousser de quelques semaines.' },
    ],
  ],
  rhetorique_debat: [
    [
      { goal: 'Trả lời bằng câu hỏi ngược', patterns: [/\bpar une question\b/], hint: 'Permettez-moi de répondre à cela par une question : qui perd réellement à ce changement ?' },
    ],
    [
      { goal: 'Nhấn mạnh nhân quả bằng c’est bien pourquoi', patterns: [/\bc'est bien pourquoi\b/], hint: 'Précisément. Et c’est bien pourquoi des mesures compensatoires sont prévues.' },
    ],
    [
      { goal: 'Nhấn mạnh trọng tâm bằng c’est tout l’enjeu', patterns: [/\bc'est tout l'enjeu\b/], hint: 'C’est tout l’enjeu du débat que nous menons aujourd’hui.' },
    ],
  ],
  conference_style: [
    [
      { goal: 'Mở đầu bằng en partant de', patterns: [/\ben partant d'une\b/], hint: 'En partant d’une anecdote personnelle plutôt que de statistiques.' },
    ],
    [
      { goal: 'Nêu kỹ thuật ngắt quãng', patterns: [/\bje ponctuerai\b/], hint: 'Je ponctuerai le discours de pauses, pour laisser respirer les idées fortes.' },
    ],
    [
      { goal: 'Kết thúc bằng boucler la boucle', patterns: [/\bboucler la boucle\b/], hint: 'Je reviendrai à mon anecdote de départ, pour boucler la boucle.' },
    ],
  ],
  mediation_juridique: [
    [
      { goal: 'Đề xuất tìm điểm chung', patterns: [/\bun terrain d'entente\b/], hint: 'Je vous propose plutôt de chercher un terrain d’entente avant d’aller plus loin.' },
    ],
    [
      // Leading `\b` doesn't work before an accented first letter — "étape" starts with é.
      { goal: 'Cam kết làm rõ từng bước', patterns: [/(?:^|\s)étape par étape\b/], hint: 'C’est précisément ce que nous allons clarifier ensemble, étape par étape.' },
    ],
    [
      // Trailing `\b` doesn't work right after an accented word — "à" ends this pattern.
      { goal: 'Trấn an bằng n’enlève rien à', patterns: [/\bn'enlève rien à(?=\s|$)/], hint: 'Bien entendu, la médiation n’enlève rien à vos droits.' },
    ],
  ],
  compromis_donnees: [
    [
      { goal: 'Nêu số liệu bằng les données suggèrent', patterns: [/\bles données suggèrent\b/], hint: 'Les données suggèrent une baisse de trente pour cent des accidents graves.' },
    ],
    [
      { goal: 'Nêu mức ước chừng bằng de l’ordre de', patterns: [/\bde l'ordre de\b/], hint: 'Une augmentation marginale, de l’ordre de deux minutes en moyenne.' },
    ],
    [
      { goal: 'Củng cố lập luận bằng d’autant que', patterns: [/\bd'autant que\b/], hint: 'D’autant que les bénéfices à long terme dépassent largement ce coût.' },
    ],
  ],
  lettre_recommandation: [
    [
      { goal: 'Nhấn mạnh bằng c’est avec plaisir que', patterns: [/\bc'est avec plaisir que\b/], hint: 'C’est avec plaisir que je le fais, tu le mérites amplement.' },
    ],
    [
      // Trailing `\b` doesn't work right after an accented last letter — "capacité" ends in é.
      { goal: 'Nêu phẩm chất bằng ainsi que', patterns: [/\bainsi que ta capacité(?=\s|$)/], hint: 'Je soulignerai ta rigueur ainsi que ta capacité à travailler en équipe.' },
    ],
    [
      { goal: 'Xác nhận sẽ dùng làm ví dụ', patterns: [/\bl'exemple central\b/], hint: 'Bien sûr, ce sera même l’exemple central de la lettre.' },
    ],
  ],
  defis_traduction: [
    [
      { goal: 'Đề xuất bằng mieux vaut', patterns: [/\bmieux vaut\b/], hint: 'Dans ce cas, mieux vaut trouver un équivalent qui garde l’esprit du texte.' },
    ],
    [
      { goal: 'Đề xuất giải pháp bằng d’où l’intérêt de', patterns: [/\bd'où l'intérêt d'ajouter\b/], hint: 'C’est vrai, d’où l’intérêt d’ajouter une note du traducteur, si besoin.' },
    ],
    [
      { goal: 'Ưu tiên bằng privilégier X plutôt que Y', patterns: [/\bprivilégier l'effet voulu\b/], hint: 'Là aussi, il faudra privilégier l’effet voulu plutôt que les mots exacts.' },
    ],
  ],
}
