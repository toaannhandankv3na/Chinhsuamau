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
  <button class="category-trigger" type="button" aria-expanded="false" aria-controls="${id}"><span class="cat-no">03</span><span class="cat-icon">${item.icon}</span><span class="cat-copy"><b>${item.name}</b><small>${item.desc}</small></span><span class="chevron" aria-hidden="true">⌄</span></button>
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
