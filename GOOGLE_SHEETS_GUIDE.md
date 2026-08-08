# 📊 구글 스프레드시트 RSVP 자동 저장 연동 가이드

모바일 청첩장의 RSVP(참석 여부) 제출 데이터를 **구글 스프레드시트에 자동으로 기록**하는 방법입니다.

---

### 1단계: 구글 스프레드시트 생성
1. [구글 드라이브(Google Drive)](https://drive.google.com)로 이동하여 새로운 **구글 스프레드시트**를 만듭니다.
2. 첫 번째 행(1행)에 다음과 같이 열 헤더(제목)를 입력합니다:
   - `A1`: 제출 일시
   - `B1`: 구분 (신랑측/신부측)
   - `C1`: 성함
   - `D1`: 연락처
   - `E1`: 동석 인원
   - `F1`: 참석 여부
   - `G1`: 축하 메시지

---

### 2단계: 앱스 스크립트(Google Apps Script) 작성
1. 스프레드시트 상단 메뉴에서 **`확장 프로그램` > `Apps Script`**를 클릭합니다.
2. 기존 코드를 모두 지우고, 아래 코드를 복사하여 붙여넣습니다:

```javascript
function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);
    
    sheet.appendRow([
      data.timestamp || new Date().toLocaleString('ko-KR'),
      data.side || '',
      data.name || '',
      data.phone || '',
      data.count || '1',
      data.meal || '',
      data.message || ''
    ]);
    
    return ContentService.createTextOutput(JSON.stringify({ result: "success" }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ result: "error", error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

3. 상단의 💾 **저장(Ctrl + S)** 버튼을 누릅니다.

---

### 3단계: 웹 앱(Web App)으로 배포
1. 우측 상단의 **`배포` > `새 배포`**를 클릭합니다.
2. 톱니바퀴 아이콘(유형 선택)을 누르고 **`웹 앱`**을 선택합니다.
3. 설정값을 아래와 같이 지정합니다:
   - **설명**: RSVP 웹앱 (자유롭게 입력 가능)
   - **다음 사용자로 웹 앱 실행**: **`나(내 구글 계정)`**
   - **액세스 권한 있는 사용자**: **`모든 사용자` (Anyone)** ⚠️ *필수*
4. **`배포`** 버튼을 클릭합니다. (최초 배포 시 구글 계정 권한 승인 창이 뜸 → `권한 검토` > `고급` > `안전하지 않음으로 이동` 클릭 후 승인)
5. 배포 완료 화면에 나오는 **웹 앱 URL** (`https://script.google.com/macros/s/.../exec`)을 복사합니다.

---

### 4단계: 청첩장 코드에 URL 적용
1. `js/app.js` 파일을 엽니다.
2. 221번째 줄 근처의 `GOOGLE_SCRIPT_URL` 변수에 복사한 URL을 넣습니다:

```javascript
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec';
```

3. 저장 후 웹사이트에 반영하시면 모든 RSVP 제출 건이 구글 시트에 실시간으로 추가됩니다! 🎉

---

### 💡 참고 사항 (백업 기능)
- `GOOGLE_SCRIPT_URL`이 설정되어 있지 않더라도, 모든 RSVP 제출 내역은 하객 브라우저의 `localStorage` (키명: `wedding_rsvp_list`)에도 자동 보관됩니다.
