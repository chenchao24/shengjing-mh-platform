(function () {
  const data = window.demoData;

  document.addEventListener("DOMContentLoaded", () => {
    const page = document.body.dataset.page;
    if (page === "patient") {
      renderPatientPage();
    }
    if (page === "admin") {
      renderAdminPage();
    }
    bindSharedDrawers();
  });

  function renderPatientPage() {
    const filterRoot = document.getElementById("articleFilters");
    const articleRoot = document.getElementById("articleList");
    const bookingNotes = document.getElementById("bookingNotes");
    const visitNotes = document.getElementById("visitNotes");
    const doctorRoot = document.getElementById("doctorList");
    const searchInput = document.getElementById("articleSearch");
    const scrollButton = document.getElementById("scrollToDoctors");
    let currentCategory = "全部";

    data.categories.forEach((category) => {
      const button = document.createElement("button");
      button.className = `chip ${category === currentCategory ? "active" : ""}`;
      button.textContent = category;
      button.addEventListener("click", () => {
        currentCategory = category;
        renderFilters();
        renderArticles();
      });
      filterRoot.appendChild(button);
    });

    function renderFilters() {
      [...filterRoot.children].forEach((node) => {
        node.classList.toggle("active", node.textContent === currentCategory);
      });
    }

    function renderArticles() {
      const keyword = searchInput.value.trim();
      const list = data.articles.filter((article) => {
        const matchCategory = currentCategory === "全部" || article.category === currentCategory;
        const matchKeyword = !keyword || `${article.title}${article.summary}${article.category}`.includes(keyword);
        return matchCategory && matchKeyword;
      });

      articleRoot.innerHTML = list
        .map(
          (article) => `
            <article class="article-card">
              <div class="article-visual">${article.image}</div>
              <div class="article-copy">
                <div class="meta-row">
                  <span class="pill">${article.category}</span>
                  <span>${article.reads.toLocaleString()} 次阅读</span>
                </div>
                <h3>${article.title}</h3>
                <p>${article.summary}</p>
                <div class="meta-row">
                  <span>${article.author}</span>
                  <button class="text-button" data-article-id="${article.id}">查看详情</button>
                </div>
              </div>
            </article>
          `
        )
        .join("");

      articleRoot.querySelectorAll("[data-article-id]").forEach((button) => {
        button.addEventListener("click", () => openArticleDetail(Number(button.dataset.articleId)));
      });
    }

    bookingNotes.innerHTML = data.bookingNotes.map((item) => `<li>${item}</li>`).join("");
    visitNotes.innerHTML = data.visitNotes.map((item) => `<li>${item}</li>`).join("");

    doctorRoot.innerHTML = data.doctors
      .map(
        (doctor) => `
          <article class="doctor-card ${doctor.status !== "接诊中" ? "muted" : ""}">
            <div class="doctor-avatar">${doctor.name[0]}</div>
            <div>
              <div class="meta-row">
                <h3>${doctor.name}</h3>
                <span class="pill neutral">${doctor.title}</span>
              </div>
              <p class="doctor-hospital">${doctor.hospital}</p>
              <div class="tag-list">${doctor.specialty.map((tag) => `<span class="tag">${tag}</span>`).join("")}</div>
              <p>${doctor.bio}</p>
              <div class="meta-row">
                <span>已接诊 ${doctor.visits.toLocaleString()} 人次</span>
                <button class="primary-button" ${doctor.status !== "接诊中" ? "disabled" : ""} data-doctor-id="${doctor.id}">
                  ${doctor.status === "接诊中" ? "立即预约" : "暂停接诊"}
                </button>
              </div>
            </div>
          </article>
        `
      )
      .join("");

    doctorRoot.querySelectorAll("[data-doctor-id]").forEach((button) => {
      button.addEventListener("click", () => openBookingFlow(Number(button.dataset.doctorId)));
    });

    searchInput.addEventListener("input", renderArticles);
    scrollButton.addEventListener("click", () => {
      document.getElementById("doctorSection").scrollIntoView({ behavior: "smooth", block: "start" });
    });
    renderArticles();
  }

  function openArticleDetail(articleId) {
    const article = data.articles.find((item) => item.id === articleId);
    const detail = document.getElementById("articleDetail");
    detail.innerHTML = `
      <article class="detail-article">
        <p class="section-tag">${article.category}</p>
        <h2>${article.title}</h2>
        <div class="meta-row detail-meta">
          <span>${article.author}</span>
          <span>${article.date}</span>
          <span>${article.reads.toLocaleString()} 次阅读</span>
        </div>
        <div class="detail-cover">${article.image}</div>
        ${article.content.map((paragraph) => `<p>${paragraph}</p>`).join("")}
        <section class="warning-box">
          <h3>紧急援助</h3>
          <p>阅读过程中如触发明显不适、惊恐或自伤想法，请立即联系家属并拨打 400-161-9995。</p>
        </section>
      </article>
    `;
    openDrawer("articleDrawer");
  }

  function openBookingFlow(doctorId) {
    const doctor = data.doctors.find((item) => item.id === doctorId);
    const root = document.getElementById("bookingFlow");
    const defaultSlot = doctor.slots[0];
    root.innerHTML = `
      <section class="booking-stepper">
        <div class="step-row">
          <span class="step active">1 选择时间</span>
          <span class="step active">2 填写信息</span>
          <span class="step active">3 确认预约</span>
        </div>
        <article class="notice-card">
          <h2>${doctor.name} ${doctor.title}</h2>
          <p>${doctor.hospital}</p>
          <p>擅长方向：${doctor.specialty.join(" / ")}</p>
        </article>
        <form id="bookingForm" class="booking-form">
          <label>
            <span>选择就诊时间</span>
            <select name="slot">
              ${doctor.slots.map((slot) => `<option value="${slot}">${slot}</option>`).join("")}
            </select>
          </label>
          <label>
            <span>就诊人姓名</span>
            <input name="name" type="text" placeholder="请输入真实姓名" required />
          </label>
          <label>
            <span>手机号码</span>
            <input name="phone" type="tel" placeholder="请输入联系电话" required />
          </label>
          <label>
            <span>就诊原因简述</span>
            <textarea name="reason" rows="4" placeholder="例如：持续焦虑失眠 2 个月"></textarea>
          </label>
          <div class="booking-summary">
            <p>隐私说明：演示版本不保存真实数据，仅展示预约流程。</p>
            <button class="primary-button" type="submit">提交预约</button>
          </div>
        </form>
        <div class="success-card hidden" id="bookingSuccess">
          <h3>预约提交成功</h3>
          <p>预约编号：YY2026051408</p>
          <p>已预约：${defaultSlot}</p>
          <p>请携带身份证、医保卡与转诊单按时就诊。</p>
        </div>
      </section>
    `;

    const form = document.getElementById("bookingForm");
    const success = document.getElementById("bookingSuccess");
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const formData = new FormData(form);
      success.classList.remove("hidden");
      success.querySelectorAll("p")[1].textContent = `已预约：${formData.get("slot")}`;
      form.reset();
    });
    openDrawer("bookingDrawer");
  }

  function renderAdminPage() {
    document.getElementById("metricCards").innerHTML = data.metrics
      .map(
        (metric) => `
          <article class="metric-card ${metric.warning ? "warning" : ""}">
            <p>${metric.label}</p>
            <h3>${metric.value}</h3>
            <span>${metric.delta}</span>
          </article>
        `
      )
      .join("");

    document.getElementById("trendChart").innerHTML = data.trend
      .map((value, index) => {
        const height = Math.max(24, value * 2.2);
        return `
          <div class="bar-item">
            <div class="bar" style="height:${height}px"></div>
            <span>D${index + 1}</span>
          </div>
        `;
      })
      .join("");

    document.getElementById("categoryStats").innerHTML = data.categoryStats
      .map(
        (item) => `
          <div class="donut-row">
            <div>
              <strong>${item.label}</strong>
              <p>${item.value}%</p>
            </div>
            <div class="progress-track"><span style="width:${item.value}%"></span></div>
          </div>
        `
      )
      .join("");

    document.getElementById("articleTable").innerHTML = data.articles
      .map(
        (article) => `
          <tr>
            <td>${article.title}</td>
            <td>${article.category}</td>
            <td>${article.author}</td>
            <td>${article.reads.toLocaleString()}</td>
            <td><span class="status-badge ${article.status === "已发布" ? "success" : "muted"}">${article.status}</span></td>
            <td><a href="#">编辑</a> <a href="#">预览</a></td>
          </tr>
        `
      )
      .join("");

    document.getElementById("topArticles").innerHTML = [...data.articles]
      .sort((left, right) => right.reads - left.reads)
      .slice(0, 5)
      .map(
        (article, index) => `
          <div class="rank-item">
            <span class="rank-index">${index + 1}</span>
            <div>
              <strong>${article.title}</strong>
              <p>${article.reads.toLocaleString()} 次阅读</p>
            </div>
          </div>
        `
      )
      .join("");

    document.getElementById("doctorAdminCards").innerHTML = data.doctors
      .map(
        (doctor) => `
          <article class="doctor-admin-card ${doctor.status !== "接诊中" ? "muted" : ""}">
            <div class="meta-row">
              <h4>${doctor.name}</h4>
              <span class="status-badge ${doctor.status === "接诊中" ? "success" : "muted"}">${doctor.status}</span>
            </div>
            <p>${doctor.title} · ${doctor.hospital}</p>
            <p>擅长：${doctor.specialty.join(" / ")}</p>
            <p>历史接诊量：${doctor.visits.toLocaleString()}</p>
            <div class="meta-row">
              <a href="#schedule">排班</a>
              <a href="#">编辑</a>
            </div>
          </article>
        `
      )
      .join("");

    document.getElementById("scheduleList").innerHTML = data.schedules
      .map(
        (item) => `
          <article class="schedule-item">
            <strong>${item.doctor}</strong>
            <p>${item.day}</p>
            <span>${item.detail}</span>
          </article>
        `
      )
      .join("");

    document.getElementById("orderTable").innerHTML = data.orders
      .map(
        (order) => `
          <tr>
            <td>${order.id}</td>
            <td>${order.patient}</td>
            <td>${order.doctor}</td>
            <td>${order.time}</td>
            <td><span class="status-badge ${statusClass(order.status)}">${order.status}</span></td>
            <td><a href="#">查看详情</a> <a href="#">处理</a></td>
          </tr>
        `
      )
      .join("");
  }

  function statusClass(status) {
    if (status === "已完成" || status === "接诊中") {
      return "success";
    }
    if (status === "待就诊") {
      return "pending";
    }
    if (status === "改期中") {
      return "warning";
    }
    return "muted";
  }

  function bindSharedDrawers() {
    document.querySelectorAll("[data-close-drawer]").forEach((button) => {
      button.addEventListener("click", () => closeDrawer(button.dataset.closeDrawer));
    });
  }

  function openDrawer(id) {
    const drawer = document.getElementById(id);
    drawer.setAttribute("aria-hidden", "false");
  }

  function closeDrawer(id) {
    const drawer = document.getElementById(id);
    drawer.setAttribute("aria-hidden", "true");
  }
})();