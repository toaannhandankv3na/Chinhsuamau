const drive = {
  "Hình sự": "https://drive.google.com/drive/folders/1ifkMb_gB2QrRU71NDGwy7Ra3rtsOktMa?usp=drive_link",
  "Hành chính": "https://drive.google.com/drive/folders/1ZkgSfR0yjmug0hGpDU95JBLky71y3Jzc?usp=drive_link",
  "Việc Dân sự": "https://drive.google.com/drive/folders/1FoGvNZJY9SD-SYAHABJXaHRrdCgr7fD3?usp=drive_link",
  "Vụ án Dân sự": "https://drive.google.com/drive/folders/1AmKIP80XgfBWVPRl2YL5pX12LxHXvI9M?usp=drive_link",
  "Vụ việc Hôn nhân và gia đình": "https://drive.google.com/drive/folders/1934MlzOeBkORECw0W50dBmbPuWlyU6Hl?usp=drive_link",
  "Vụ án Lao động": "https://drive.google.com/drive/folders/1GUpNNeBeZh_UYyv8Lwol1GqOidkvyrNT?usp=drive_link",
  "Đơn xin miễn tạm ứng án phí, án phí": "https://drive.google.com/drive/folders/1MvQSaTH51iEYWmAn1AffLUzp_f5kIWyv?usp=drive_link",
  "Các biểu mẫu khác": "https://drive.google.com/drive/folders/11ll2Bssc6P7MJYn-bPW0mw8oY4qMQdLP?usp=drive_link"
};
const categories = [
 {name:"Hình sự", desc:"Biểu mẫu tố tụng hình sự", icon:"⚖", type:"link", url:drive["Hình sự"]},
 {name:"Hành chính", desc:"Biểu mẫu tố tụng hành chính", icon:"▤", type:"link", url:drive["Hành chính"]},
 {name:"Dân sự", desc:"Việc dân sự, vụ án dân sự, hôn nhân, lao động và án phí", icon:"§", type:"group", children:[
  {name:"Việc Dân sự", desc:"Biểu mẫu giải quyết việc dân sự", url:drive["Việc Dân sự"]},
  {name:"Vụ án Dân sự", desc:"Biểu mẫu giải quyết vụ án dân sự", url:drive["Vụ án Dân sự"]},
  {name:"Vụ việc Hôn nhân và gia đình", desc:"Biểu mẫu hôn nhân và gia đình", url:drive["Vụ việc Hôn nhân và gia đình"]},
  {name:"Vụ án Lao động", desc:"Biểu mẫu vụ án lao động", url:drive["Vụ án Lao động"]},
  {name:"Đơn xin miễn tạm ứng án phí, án phí", desc:"Đơn đề nghị miễn tạm ứng án phí, án phí", url:drive["Đơn xin miễn tạm ứng án phí, án phí"]}
 ]},
 {name:"Các biểu mẫu khác", desc:"Các biểu mẫu và loại đơn khác", icon:"▧", type:"link", url:drive["Các biểu mẫu khác"]}
];
const grid = document.getElementById('categoryGrid');
const search = document.getElementById('searchInput');
const esc = s => s.replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function card(item, index, child=false) {
 const id = `sub-${index}`;
 if (item.type === 'group') return `<article class="category category-group" data-search="${esc((item.name+' '+item.desc+' '+item.children.map(c=>c.name).join(' ')).toLowerCase())}">
  <button class="category-trigger" type="button" aria-expanded="false" aria-controls="${id}"><span class="cat-no">03</span><span class="cat-icon">${item.icon}</span><span class="cat-copy"><b>${item.name}</b><small>${item.desc}</small><strong class="drive-label">Nhấn để chọn lĩnh vực ↗</strong></span><span class="chevron" aria-hidden="true">⌄</span></button>
  <div class="subcategories" id="${id}" hidden>${item.children.map((c,i)=>`<a class="sub-link" href="${c.url}" target="_blank" rel="noopener noreferrer" data-search="${esc((c.name+' '+c.desc).toLowerCase())}"><span><b>${c.name}</b><small>${c.desc}</small></span><span class="open-arrow" aria-hidden="true">↗</span></a>`).join('')}</div></article>`;
 return `<a class="category category-link" href="${item.url}" target="_blank" rel="noopener noreferrer" data-search="${esc((item.name+' '+item.desc).toLowerCase())}"><span class="cat-no">${String(index+1).padStart(2,'0')}</span><span class="cat-icon">${item.icon}</span><span class="cat-copy"><b>${item.name}</b><small>${item.desc}</small><strong class="drive-label">Mở thư mục Drive ↗</strong></span><span class="chevron" aria-hidden="true">→</span></a>`;
}
function render(query='') {
 const q=query.trim().toLocaleLowerCase('vi');
 const html = categories.map((item,i)=>{
  if(item.type==='group') {
   const matchedChildren=item.children.filter(c=>!q||(c.name+' '+c.desc).toLocaleLowerCase('vi').includes(q));
   const matches=!q||(item.name+' '+item.desc).toLocaleLowerCase('vi').includes(q)||matchedChildren.length>0;
   if(!matches)return '';
   const view={...item,children:matchedChildren};
   return card(view,i);
  }
  return !q||(item.name+' '+item.desc).toLocaleLowerCase('vi').includes(q)?card(item,i):'';
 }).join('');
 grid.innerHTML=html || '<p class="no-results">Không tìm thấy lĩnh vực phù hợp. Vui lòng thử từ khóa khác.</p>';
 grid.querySelectorAll('.category-trigger').forEach(btn=>btn.addEventListener('click',()=>{
   const open=btn.getAttribute('aria-expanded')==='true';
   btn.setAttribute('aria-expanded',String(!open));
   const panel=document.getElementById(btn.getAttribute('aria-controls'));
   panel.hidden=open;
   btn.closest('.category-group').classList.toggle('expanded',!open);
 }));
 if(q) grid.querySelectorAll('.category-group').forEach(group=>{group.classList.add('expanded');const b=group.querySelector('.category-trigger');const p=group.querySelector('.subcategories');b.setAttribute('aria-expanded','true');p.hidden=false;});
}
search.addEventListener('input',e=>render(e.target.value));
render();

/* =========================================
   LIQUID GLASS MAGNIFIER
   Kính lúp phóng đại nội dung dưới con trỏ
   ========================================= */

(() => {
  function initLiquidGlassLens() {
    // Tránh khởi tạo nhiều kính lúp nếu script được nạp lại
    if (document.getElementById("liquid-glass-lens")) return;

    const lens = document.createElement("div");
    lens.id = "liquid-glass-lens";
    lens.setAttribute("aria-hidden", "true");

    const content = document.createElement("div");
    content.className = "lens-content";
    lens.appendChild(content);

    document.body.appendChild(lens);

    const isTouchDevice = window.matchMedia(
      "(hover: none), (pointer: coarse)"
    ).matches;

    const magnification = isTouchDevice ? 1.35 : 1.4;

    let lensPage = null;
    let lastX = 0;
    let lastY = 0;
    let isPointerActive = false;
    let rebuildFrame = 0;

    function buildLensPage() {
      if (lensPage) {
        lensPage.remove();
      }

      // Sao chép nội dung trang để tạo vùng phóng đại
      const clone = document.body.cloneNode(true);

      // Loại bỏ kính lúp khỏi bản sao để tránh lồng kính vô hạn
      clone.querySelectorAll("#liquid-glass-lens").forEach(el => el.remove());

      // Không để JavaScript trong bản sao được thực thi
      clone.querySelectorAll("script").forEach(el => el.remove());

      // Không sao chép các thành phần dễ gây chồng lớp
      clone.querySelectorAll("[popover]").forEach(el => {
        el.removeAttribute("popover");
      });

      clone.classList.add("lens-page");

      const pageWidth = document.documentElement.clientWidth;
      const pageHeight = Math.max(
        document.documentElement.scrollHeight,
        window.innerHeight
      );

      Object.assign(clone.style, {
        position: "absolute",
        left: "0",
        top: "0",
        display: "block",
        width: pageWidth + "px",
        height: pageHeight + "px",
        minHeight: pageHeight + "px",
        maxWidth: "none",
        margin: "0",
        padding: "0",
        overflow: "visible",
        transformOrigin: "top left",
        pointerEvents: "none",
        zIndex: "1"
      });

      // Đồng bộ trạng thái các ô nhập liệu nếu có
      const originals = document.body.querySelectorAll(
        "input, textarea, select"
      );
      const copies = clone.querySelectorAll(
        "input, textarea, select"
      );

      originals.forEach((original, index) => {
        const copy = copies[index];
        if (!copy) return;

        if (original instanceof HTMLInputElement) {
          copy.value = original.value;
          copy.checked = original.checked;
        } else if (original instanceof HTMLTextAreaElement) {
          copy.value = original.value;
          copy.textContent = original.value;
        } else if (original instanceof HTMLSelectElement) {
          copy.value = original.value;
        }
      });

      content.appendChild(clone);
      lensPage = clone;
    }

    function getLensSize() {
      return lens.getBoundingClientRect().width || 150;
    }

    
function updateLens(x, y) {
  if (!lensPage) return;

  lastX = x;
  lastY = y;

  const size = getLensSize();
  const half = size / 2;
  const scale = magnification;

  lens.style.left = x + "px";
  lens.style.top = y + "px";

  // Dùng vị trí cuộn hiện tại để tính tọa độ nội dung
  const pageX = x + window.scrollX;
  const pageY = y + window.scrollY;

  lensPage.style.transform =
    `translate(${half - pageX * scale}px, ` +
    `${half - pageY * scale}px) scale(${scale})`;
}

    function showLens(x, y) {
      updateLens(x, y);
      lens.classList.add("is-visible");
    }

    function hideLens() {
      lens.classList.remove("is-visible");
    }

    function handlePointerMove(event) {
      if (event.pointerType === "touch") {
        if (isPointerActive) {
          showLens(event.clientX, event.clientY);
        }
        return;
      }

      // Desktop: theo chuột hoặc bút cảm ứng
      showLens(event.clientX, event.clientY);
    }

    function handlePointerDown(event) {
      if (event.pointerType === "touch") {
        isPointerActive = true;
        showLens(event.clientX, event.clientY);
      }
    }

    function handlePointerUp(event) {
      if (event.pointerType === "touch") {
        isPointerActive = false;
        hideLens();
      }
    }

    function rebuild() {
      if (rebuildFrame) cancelAnimationFrame(rebuildFrame);

      rebuildFrame = requestAnimationFrame(() => {
        buildLensPage();
        updateLens(lastX, lastY);
        rebuildFrame = 0;
      });
    }

    buildLensPage();
    
  // Theo dõi thay đổi bố cục, ví dụ khi mở rộng danh mục Dân sự
  let layoutTimer;

  const layoutObserver = new MutationObserver(() => {
    clearTimeout(layoutTimer);

    layoutTimer = setTimeout(() => {
      buildLensPage();
      updateLens(lastX, lastY);
    }, 100);
  });

  layoutObserver.observe(document.getElementById("categoryGrid") || document.body, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ["class", "hidden", "aria-expanded"]
  });

    // Desktop và bút cảm ứng
    document.addEventListener("pointermove", handlePointerMove, {
      passive: true
    });

    // Điện thoại / máy tính bảng
    document.addEventListener("pointerdown", handlePointerDown, {
      passive: true
    });

    document.addEventListener("pointerup", handlePointerUp, {
      passive: true
    });

    document.addEventListener("pointercancel", handlePointerUp, {
      passive: true
    });

    // Ẩn kính khi chuột rời khỏi cửa sổ trình duyệt
    document.addEventListener("pointerout", event => {
      if (
        event.pointerType !== "touch" &&
        !event.relatedTarget
      ) {
        hideLens();
      }
    });

    // Cập nhật tọa độ khi trang cuộn
    window.addEventListener("scroll", () => {
      if (!isTouchDevice || isPointerActive) {
        updateLens(lastX, lastY);
      }
    }, { passive: true });

    // Tạo lại bản sao khi đổi kích thước cửa sổ hoặc xoay điện thoại
    window.addEventListener("resize", rebuild, { passive: true });

    // Ẩn kính khi chuyển sang tab khác
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) hideLens();
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener(
      "DOMContentLoaded",
      initLiquidGlassLens,
      { once: true }
    );
  } else {
    initLiquidGlassLens();
  }
})();
