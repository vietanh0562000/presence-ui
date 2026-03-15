// src/data/questions.js
// Each variant stores { question, hint, chips } for both 'en' and 'vi'.
// pickQuestions() returns bilingual objects so components can switch language at render time.

const QUESTION_POOL = [
  {
    sense: { en: 'Air & Wind', vi: 'Không khí & Gió' },
    icon: '🌬',
    variants: [
      {
        en: {
          question: 'What does the air feel like on your skin right now?',
          hint: 'Is it warm or cool? Still or moving? Does wind touch your face, your arms?',
          chips: ['Cool & still', 'Warm & humid', 'Gentle breeze', 'Cold & sharp', 'Stuffy', 'Fresh'],
        },
        vi: {
          question: 'Không khí cảm thấy thế nào trên da bạn lúc này?',
          hint: 'Ấm hay mát? Tĩnh lặng hay có gió? Gió có chạm vào mặt, cánh tay bạn không?',
          chips: ['Mát & tĩnh lặng', 'Ấm & ẩm', 'Gió nhẹ', 'Lạnh & sắc', 'Ngột ngạt', 'Trong lành'],
        },
      },
      {
        en: {
          question: 'Is there any movement in the air where you are?',
          hint: 'A draft from a vent? A breeze through a window? Or perfectly still?',
          chips: ['Completely still', 'Slight draft', 'Gentle breeze', 'Windy', 'Air conditioning', 'Fresh outside air'],
        },
        vi: {
          question: 'Không khí nơi bạn đang ở có chuyển động không?',
          hint: 'Gió từ máy lạnh? Gió qua cửa sổ? Hay hoàn toàn tĩnh lặng?',
          chips: ['Hoàn toàn tĩnh lặng', 'Gió nhẹ nhẹ', 'Gió nhẹ nhàng', 'Có gió', 'Máy lạnh', 'Không khí tươi ngoài trời'],
        },
      },
      {
        en: {
          question: 'Take a slow breath. How does the air feel entering your lungs?',
          hint: 'Cool or warm? Dry or moist?',
          chips: ['Cool & clean', 'Warm & heavy', 'Dry', 'Humid', 'Fresh', 'Stale'],
        },
        vi: {
          question: 'Hít thở chậm rãi. Không khí cảm thấy thế nào khi vào phổi bạn?',
          hint: 'Mát hay ấm? Khô hay ẩm?',
          chips: ['Mát & trong sạch', 'Ấm & nặng', 'Khô', 'Ẩm', 'Trong lành', 'Bí'],
        },
      },
    ],
  },
  {
    sense: { en: 'Sound', vi: 'Âm thanh' },
    icon: '👂',
    variants: [
      {
        en: {
          question: 'Close your eyes. What is the farthest sound you can hear?',
          hint: 'Cars? Birds? Wind in trees? Someone\'s voice? A hum of a machine?',
          chips: ['Traffic', 'Birds', 'Wind', 'Voices', 'Silence', 'Music', 'Rain', 'My own breath'],
        },
        vi: {
          question: 'Nhắm mắt lại. Âm thanh xa nhất bạn có thể nghe là gì?',
          hint: 'Xe cộ? Chim hót? Gió trong cây? Giọng nói ai đó? Tiếng ồn của máy móc?',
          chips: ['Xe cộ', 'Chim hót', 'Gió', 'Giọng nói', 'Yên lặng', 'Âm nhạc', 'Mưa', 'Hơi thở của tôi'],
        },
      },
      {
        en: {
          question: 'What sound is closest to you right now?',
          hint: 'Your own breathing? A device? The rustle of your clothes?',
          chips: ['My breath', 'A device hum', 'My own movement', 'Someone nearby', 'Almost nothing'],
        },
        vi: {
          question: 'Âm thanh gần bạn nhất lúc này là gì?',
          hint: 'Hơi thở của bạn? Thiết bị nào đó? Tiếng sột soạt của quần áo?',
          chips: ['Hơi thở của tôi', 'Tiếng máy móc', 'Chuyển động của tôi', 'Ai đó gần đây', 'Gần như yên lặng'],
        },
      },
      {
        en: {
          question: 'If you had to name the mood of all the sounds around you — what word comes to mind?',
          hint: 'Busy? Quiet? Tense? Peaceful?',
          chips: ['Peaceful', 'Busy', 'Lonely', 'Cozy', 'Tense', 'Neutral', 'Wild'],
        },
        vi: {
          question: 'Nếu phải đặt tên cho cảm xúc của tất cả âm thanh xung quanh — từ nào hiện ra?',
          hint: 'Ồn ào? Yên tĩnh? Căng thẳng? Bình yên?',
          chips: ['Bình yên', 'Ồn ào', 'Cô đơn', 'Ấm cúng', 'Căng thẳng', 'Trung tính', 'Hoang dã'],
        },
      },
    ],
  },
  {
    sense: { en: 'Smell', vi: 'Mùi hương' },
    icon: '🌿',
    variants: [
      {
        en: {
          question: 'What does the air smell like right now?',
          hint: 'Take a slow breath through your nose. Food? Earth? Rain? Nothing at all?',
          chips: ['Fresh air', 'Food nearby', 'Petrichor', 'Flowers', 'Smoke', 'Coffee', 'Nothing'],
        },
        vi: {
          question: 'Không khí có mùi gì lúc này?',
          hint: 'Hít thở chậm qua mũi. Thức ăn? Đất? Mưa? Hay không có gì?',
          chips: ['Không khí trong lành', 'Thức ăn gần đây', 'Mùi đất sau mưa', 'Hoa', 'Khói', 'Cà phê', 'Không có gì'],
        },
      },
      {
        en: {
          question: 'Breathe in slowly. What is the first scent that arrives?',
          hint: 'Don\'t search — just notice what your nose catches first.',
          chips: ['Clean air', 'Something cooking', 'Earth', 'Soap or laundry', 'Coffee', 'Nothing clear'],
        },
        vi: {
          question: 'Hít vào chậm rãi. Mùi hương đầu tiên đến là gì?',
          hint: 'Đừng tìm kiếm — chỉ cần nhận ra điều mà mũi bạn bắt được đầu tiên.',
          chips: ['Không khí trong sạch', 'Thứ gì đó đang nấu', 'Đất', 'Xà phòng hoặc quần áo', 'Cà phê', 'Không rõ ràng'],
        },
      },
      {
        en: {
          question: 'Is there a smell here that feels familiar or comforting?',
          hint: 'Home, food, nature — does anything here smell like something?',
          chips: ['Feels like home', 'Like outside', 'Like food', 'Like someone I know', 'Unfamiliar', 'No smell'],
        },
        vi: {
          question: 'Có mùi hương nào ở đây cảm thấy quen thuộc hay dễ chịu không?',
          hint: 'Nhà, thức ăn, thiên nhiên — có gì ở đây có mùi như điều gì đó không?',
          chips: ['Cảm giác như nhà', 'Như bên ngoài', 'Như thức ăn', 'Như ai đó tôi biết', 'Xa lạ', 'Không có mùi'],
        },
      },
    ],
  },
  {
    sense: { en: 'Body', vi: 'Cơ thể' },
    icon: '🫀',
    variants: [
      {
        en: {
          question: 'Where in your body do you feel your heartbeat?',
          hint: 'Place a hand on your chest. Can you feel it? In your throat? Temples? Fingertips?',
          chips: ['Chest', 'Throat', 'Fingertips', 'Temples', 'Stomach', 'Wrists'],
        },
        vi: {
          question: 'Bạn cảm nhận nhịp tim ở đâu trong cơ thể?',
          hint: 'Đặt tay lên ngực. Bạn có cảm nhận được không? Ở cổ họng? Thái dương? Đầu ngón tay?',
          chips: ['Ngực', 'Cổ họng', 'Đầu ngón tay', 'Thái dương', 'Bụng', 'Cổ tay'],
        },
      },
      {
        en: {
          question: 'Where does your body feel heavy right now?',
          hint: 'Shoulders? Lower back? Behind your eyes?',
          chips: ['Shoulders', 'Lower back', 'Eyes', 'Chest', 'Legs', 'Nowhere — I feel light'],
        },
        vi: {
          question: 'Cơ thể bạn cảm thấy nặng nhất ở đâu lúc này?',
          hint: 'Vai? Lưng dưới? Sau mắt?',
          chips: ['Vai', 'Lưng dưới', 'Mắt', 'Ngực', 'Chân', 'Không đâu — tôi cảm thấy nhẹ nhàng'],
        },
      },
      {
        en: {
          question: 'Take one slow breath. What part of your body moves most?',
          hint: 'Chest, belly, shoulders? Feel the rise and fall.',
          chips: ['Belly', 'Chest', 'Shoulders', 'All of me', 'Hard to tell'],
        },
        vi: {
          question: 'Hít thở chậm một lần. Phần nào của cơ thể chuyển động nhiều nhất?',
          hint: 'Ngực, bụng, vai? Cảm nhận sự nâng lên và hạ xuống.',
          chips: ['Bụng', 'Ngực', 'Vai', 'Toàn thân', 'Khó nhận ra'],
        },
      },
    ],
  },
  {
    sense: { en: 'Light', vi: 'Ánh sáng' },
    icon: '☀️',
    variants: [
      {
        en: {
          question: 'Describe the light around you right now.',
          hint: 'Is it bright or dim? Natural or artificial? What color does it cast on things near you?',
          chips: ['Golden sunlight', 'Grey & soft', 'Harsh white', 'Warm lamp', 'Blue screen', 'Dark'],
        },
        vi: {
          question: 'Mô tả ánh sáng xung quanh bạn lúc này.',
          hint: 'Sáng hay tối? Tự nhiên hay nhân tạo? Nó đổ màu gì lên những thứ gần bạn?',
          chips: ['Ánh nắng vàng', 'Xám & nhẹ nhàng', 'Trắng chói', 'Đèn ấm', 'Màn hình xanh', 'Tối'],
        },
      },
      {
        en: {
          question: 'What is the brightest thing in your field of vision?',
          hint: 'A window, a screen, a light source? Let your eyes settle on it.',
          chips: ['The sky', 'A screen', 'A lamp', 'A window', 'Sunlight', 'Nothing stands out'],
        },
        vi: {
          question: 'Thứ sáng nhất trong tầm mắt của bạn là gì?',
          hint: 'Cửa sổ, màn hình, nguồn sáng? Hãy để mắt bạn dừng lại ở đó.',
          chips: ['Bầu trời', 'Màn hình', 'Đèn', 'Cửa sổ', 'Ánh nắng', 'Không có gì nổi bật'],
        },
      },
      {
        en: {
          question: 'Does the light here feel harsh, soft, or somewhere in between?',
          hint: 'Notice how it lands on things near you.',
          chips: ['Soft & diffused', 'Bright & sharp', 'Warm & dim', 'Cool & flat', 'Natural', 'Artificial'],
        },
        vi: {
          question: 'Ánh sáng ở đây cảm thấy chói, nhẹ nhàng, hay ở đâu đó giữa hai thái cực?',
          hint: 'Chú ý cách nó chiếu lên những thứ gần bạn.',
          chips: ['Nhẹ & khuếch tán', 'Sáng & sắc nét', 'Ấm & mờ', 'Lạnh & phẳng', 'Tự nhiên', 'Nhân tạo'],
        },
      },
    ],
  },
  {
    sense: { en: 'Ground', vi: 'Mặt đất' },
    icon: '🪨',
    variants: [
      {
        en: {
          question: 'What do your feet and body touch right now?',
          hint: 'Feel the chair, the floor, your clothes. Are you supported? What textures?',
          chips: ['Solid floor', 'Soft chair', 'Grass / ground', 'Bed', 'Rough surface', 'Smooth & cool'],
        },
        vi: {
          question: 'Bàn chân và cơ thể bạn đang chạm vào gì lúc này?',
          hint: 'Cảm nhận chiếc ghế, sàn nhà, quần áo. Bạn có được đỡ không? Kết cấu như thế nào?',
          chips: ['Sàn cứng', 'Ghế mềm', 'Cỏ / đất', 'Giường', 'Bề mặt thô', 'Trơn & mát'],
        },
      },
      {
        en: {
          question: 'Feel the surface beneath you. Is it firm or giving?',
          hint: 'Press your weight down slightly. Does it push back? Hold you steadily?',
          chips: ['Firm & solid', 'Soft & sinking', 'Cool & hard', 'Warm & padded', 'Uneven', 'Steady'],
        },
        vi: {
          question: 'Cảm nhận bề mặt bên dưới bạn. Nó cứng hay mềm?',
          hint: 'Ấn nhẹ xuống. Nó có đẩy lại không? Có giữ bạn vững không?',
          chips: ['Cứng & chắc', 'Mềm & lún', 'Mát & cứng', 'Ấm & đệm', 'Gồ ghề', 'Ổn định'],
        },
      },
      {
        en: {
          question: 'What textures can you feel without moving your hands?',
          hint: 'Clothing against skin, a seat, a floor. What is most noticeable?',
          chips: ['Smooth fabric', 'Rough surface', 'Soft cushion', 'Hard & cool', 'Warm wood', 'Textured floor'],
        },
        vi: {
          question: 'Bạn có thể cảm nhận kết cấu nào mà không cần di chuyển tay?',
          hint: 'Quần áo chạm da, ghế, sàn. Điều gì nổi bật nhất?',
          chips: ['Vải trơn', 'Bề mặt thô', 'Đệm mềm', 'Cứng & mát', 'Gỗ ấm', 'Sàn có kết cấu'],
        },
      },
    ],
  },
  {
    sense: { en: 'Aliveness', vi: 'Sự sống' },
    icon: '✨',
    variants: [
      {
        en: {
          question: 'What is one thing that makes you feel you are here — alive — in this exact moment?',
          hint: 'It can be tiny. A smell, a sound, the weight of your own body. What anchors you to now?',
          chips: [],
        },
        vi: {
          question: 'Một điều gì khiến bạn cảm thấy mình đang ở đây — đang sống — trong khoảnh khắc này?',
          hint: 'Có thể rất nhỏ. Một mùi hương, một âm thanh, trọng lượng của chính cơ thể bạn. Điều gì neo bạn vào hiện tại?',
          chips: [],
        },
      },
    ],
  },
]

// QUESTIONS is exported for .length checks (= number of senses = 7)
export const QUESTIONS = QUESTION_POOL

export function pickQuestions() {
  return QUESTION_POOL.map(({ sense, icon, variants }) => ({
    sense,
    icon,
    ...variants[Math.floor(Math.random() * variants.length)],
  }))
}

export const MOODS = {
  en: ['🌊 Calm', '🌱 Grounded', '✨ Alive', '💭 Reflective', '🌫 Foggy', '🔥 Restless', '🕊 Peaceful', '🌧 Heavy'],
  vi: ['🌊 Bình yên', '🌱 Vững vàng', '✨ Sống động', '💭 Suy tư', '🌫 Mơ màng', '🔥 Bồn chồn', '🕊 Thanh thản', '🌧 Nặng nề'],
}
