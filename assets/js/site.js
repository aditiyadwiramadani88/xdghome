/* Brivon — free HTML template. Minimal vanilla JS: mobile drawer + scroll-reveal. */
(function () {
  'use strict';

  // Page Preloader with XDG Logo and 2-Second Determinate Progress
  const preloader = document.getElementById('preloader');
  if (preloader) {
    const progressBar = preloader.querySelector('.preloader-progress');
    const percentEl = preloader.querySelector('.preloader-percent');
    const duration = 2000; // 2 seconds
    let startTime = null;

    function stepLoader(timestamp) {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const percentage = Math.floor(progress * 100);

      if (progressBar) {
        progressBar.style.width = percentage + '%';
      }
      if (percentEl) {
        percentEl.textContent = percentage + '%';
      }

      if (progress < 1) {
        requestAnimationFrame(stepLoader);
      } else {
        setTimeout(function () {
          preloader.classList.add('fade-out');
          setTimeout(function () {
            if (preloader.parentNode) {
              preloader.parentNode.removeChild(preloader);
            }
          }, 450);
        }, 150);
      }
    }

    requestAnimationFrame(stepLoader);
  }

  // Mobile drawer
  const toggle = document.querySelector('.nav-toggle');
  const drawer = document.getElementById('mobile-drawer');
  const closeBtn = drawer && drawer.querySelector('.drawer-close');

  function openDrawer() {
    if (!drawer) return;
    drawer.classList.add('open');
    drawer.setAttribute('aria-hidden', 'false');
    if (toggle) toggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }
  function closeDrawer() {
    if (!drawer) return;
    drawer.classList.remove('open');
    drawer.setAttribute('aria-hidden', 'true');
    if (toggle) toggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }
  if (toggle) toggle.addEventListener('click', openDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  if (drawer) {
    drawer.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', closeDrawer);
    });
  }
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && drawer && drawer.classList.contains('open')) closeDrawer();
  });

  // Reveal on intersect (respects prefers-reduced-motion)
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reduced && 'IntersectionObserver' in window) {
    const els = document.querySelectorAll('.reveal');
    if (els.length) {
      els.forEach(function (el) {
        el.style.opacity = '0';
        el.style.transform = 'translateY(16px)';
        el.style.transition = 'opacity 600ms cubic-bezier(0.16, 1, 0.3, 1), transform 600ms cubic-bezier(0.16, 1, 0.3, 1)';
      });
      const io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            io.unobserve(entry.target);
          }
        });
      }, { threshold: 0.18, rootMargin: '0px 0px -10% 0px' });
      els.forEach(function (el) { io.observe(el); });
    }
  }

  // Sticky header subtle shadow on scroll
  const header = document.querySelector('.site-header');
  if (header) {
    let last = 0;
    window.addEventListener('scroll', function () {
      const y = window.scrollY;
      if (y > 4 && last <= 4) header.style.boxShadow = '0 8px 24px -16px rgba(0,0,0,0.6)';
      if (y <= 4 && last > 4) header.style.boxShadow = 'none';
      last = y;
    }, { passive: true });
  }

  // Project Gallery Modal Data & Interactions
  const projectData = {
    bales: {
      title: 'Bales.ai',
      tag: 'Agentic AI / B2B SaaS / Marketing Automation',
      desc: 'An Agentic AI platform that helps businesses automate customer conversations, lead engagement, and follow-ups across multiple channels. Bales.ai combines intelligent AI agents, real-time automation, and business integrations to engage customers 24/7, take action autonomously, and turn more conversations into sales',
      images: [
        { src: 'assets/img/projects/balesiaja/User/Dashboards-Bales-ai.png', alt: 'Real-Time Operations & Live Metrics Dashboard' },
        { src: 'assets/img/projects/balesiaja/User/AI-Agents.png', alt: 'AI Agents Directory & Autonomous Engagement Workflows' },
        { src: 'assets/img/projects/balesiaja/User/Agent-Settings-Bales-ai.png', alt: 'AI Agent Configuration & Knowledge Base Settings' },
        { src: 'assets/img/projects/balesiaja/User/Broadcasts-Bales.png', alt: 'Multi-Channel Broadcast Campaigns & Audience Segmentation' },
        { src: 'assets/img/projects/balesiaja/User/Follow-Ups-Bales-ai-11-09-2025_05_22_AM.png', alt: 'Automated Lead Follow-Up Sequences & Pipelines' },
        { src: 'assets/img/projects/balesiaja/User/Auto-Replies-Bales-ai-11-11-2025_08_0322_AM.png', alt: 'Instant Auto-Replies & AI Trigger Engine' },
        { src: 'assets/img/projects/balesiaja/User/Welcome-Messages-Bales-ai-11-11-2025_08_06_AM.png', alt: 'Interactive Welcome Messages & Customer Onboarding' },
        { src: 'assets/img/projects/balesiaja/User/Orders-Bales-ai-11-09-2025_05_31_AM.png', alt: 'Conversational Order Management & Pipeline' },
        { src: 'assets/img/projects/balesiaja/User/Product-Bales-ai-11-09-2025_05_25_AM.png', alt: 'Product Catalog & Dynamic Inventory Synchronizer' },
        { src: 'assets/img/projects/balesiaja/User/Rest-API-Integration-Bales-ai-11-09-2025_05_24_AM.png', alt: 'REST API & Webhook Integration Interface' },
        { src: 'assets/img/projects/balesiaja/User/Teams-Bales-ai-11-11-2025_08_08_AM.png', alt: 'Multi-Seat Team Roles & Agent Access Management' },
        { src: 'assets/img/projects/balesiaja/User/AI-Agents-Bales-invoice.png', alt: 'AI Credits Usage, Invoicing & Billing Dashboard' },
        { src: 'assets/img/projects/balesiaja/User/Pricing-Bales-ai.png', alt: 'Subscription Plans & Tier Management' },
        { src: 'assets/img/projects/balesiaja/User/Affiliate-Statistics-Bales-ai-.png', alt: 'Partner & Affiliate Growth Analytics' }
      ]
    },
    erp: {
      title: 'Integrated Business Operations Platform',
      tag: 'ERP / Web Application / Automation',
      desc: 'A custom ERP environment designed to connect business processes, operational data, attendance, sales, finance, and reporting into a unified real-time workflow without spreadsheet overhead.',
      images: [
        { src: 'assets/img/projects/erp/erp-dashboard.png', alt: 'Enterprise Resource Planning Dashboard' }
      ]
    },
    parking: {
      title: 'Connected Access & IoT System',
      tag: 'IoT / Hardware Integration / Web',
      desc: 'A hardware-software integration for access control, barrier gate connectivity, monitoring, and centralized management across multi-site vehicle facilities.',
      images: [
        { src: 'assets/img/projects/parking/Manajemen-Data-Pintu-11-11-2025_09_57_AMshow.png', alt: 'Access Gate & Barrier Controller Data' },
        { src: 'assets/img/projects/parking/Manajemen-Tarif-Pengaturan-11-11-2025_09_55_AM.png', alt: 'Dynamic Tariff & Rule Engine' },
        { src: 'assets/img/projects/parking/Audit-Monitoring-Laporan-11-11-2025_09_55_AM.png', alt: 'Audit Logs & Automated Paper Consumption Tracking' },
        { src: 'assets/img/projects/parking/settings.png', alt: 'Hardware Gateway Settings' },
        { src: 'assets/img/projects/parking/quick-members.png', alt: 'Subscriber & RFID Fast-Access Register' }
      ]
    },
    timebill: {
      title: 'TimeBill: Billing & Device Tracking System',
      tag: 'IoT / Billing Automation / Cloud Platform',
      desc: 'A connected multi-outlet billing, member management, and device tracking system built for operational visibility, remote device cut-offs, and automated transaction reporting.',
      images: [
        { src: 'assets/img/projects/timebill/trx-repos.png', alt: 'Transaction & Revenue Reports Console' },
        { src: 'assets/img/projects/timebill/Tracker devices.png', alt: 'Live IoT Device & Station Tracker' },
        { src: 'assets/img/projects/timebill/monitor-devices.png', alt: 'Device Fleet Status & Telemetry' },
        { src: 'assets/img/projects/timebill/Devices.png', alt: 'Hardware Terminals & Device Configuration' },
        { src: 'assets/img/projects/timebill/show-devices.png', alt: 'Connected Device Specifications & Details' },
        { src: 'assets/img/projects/timebill/Device-trx.png', alt: 'Device Session & Live Usage Transactions' },
        { src: 'assets/img/projects/timebill/TimeBill-11-11-2025_08_21_AM.png', alt: 'Time-Based Billing Console & Terminal' },
        { src: 'assets/img/projects/timebill/TimeBill-11-11-2025_08_24_AM.png', alt: 'Active Session Management & Rates' },
        { src: 'assets/img/projects/timebill/TimeBill-11-11-2025_08_25_AM.png', alt: 'Station Allocation & Customer Checkout' },
        { src: 'assets/img/projects/timebill/TimeBill-Outlet.png', alt: 'Multi-Branch & Outlet Topology' },
        { src: 'assets/img/projects/timebill/lokasi.png', alt: 'Branch & Location Directory' },
        { src: 'assets/img/projects/timebill/Create-lokasi.png', alt: 'New Outlet & Location Setup' },
        { src: 'assets/img/projects/timebill/TimeBill-Scheduler.png', alt: 'Automated Power & Session Scheduler' },
        { src: 'assets/img/projects/timebill/TimeBill-create-scheduler.png', alt: 'Create Automated Power Schedule' },
        { src: 'assets/img/projects/timebill/Post-trx.png', alt: 'Point of Sale & Billing Terminal' },
        { src: 'assets/img/projects/timebill/Trx-members.png', alt: 'Member Transactions & History' },
        { src: 'assets/img/projects/timebill/Members.png', alt: 'Customer & Member Directory' },
        { src: 'assets/img/projects/timebill/Create-member.png', alt: 'Member Registration & Account Creation' },
        { src: 'assets/img/projects/timebill/TimeBill-paket-member.png', alt: 'Member Packages & Discount Subscriptions' },
        { src: 'assets/img/projects/timebill/Paket-member-create.png', alt: 'Create Member Package Rules' },
        { src: 'assets/img/projects/timebill/Paket.png', alt: 'Pricing Packages & Rate Plans' },
        { src: 'assets/img/projects/timebill/TimeBill-Paket.png', alt: 'Configured Service Package Overview' },
        { src: 'assets/img/projects/timebill/TimeBill-Tarif-umum.png', alt: 'Standard General Tariff Rates' },
        { src: 'assets/img/projects/timebill/TimeBill-Tarif-umum-creare.png', alt: 'Create General Tariff Configuration' },
        { src: 'assets/img/projects/timebill/Product-list.png', alt: 'F&B and Product Inventory Management' },
        { src: 'assets/img/projects/timebill/Category-products.png', alt: 'Product Category Organization' },
        { src: 'assets/img/projects/timebill/Post-list-products.png', alt: 'Point of Sale Product Catalog' },
        { src: 'assets/img/projects/timebill/show-lockscreen.png', alt: 'Client Station Lockscreen Interface' },
        { src: 'assets/img/projects/timebill/TimeBill-create-lockscreen.png', alt: 'Lockscreen Customizer & Asset Setup' },
        { src: 'assets/img/projects/timebill/Show-frames-apps.png', alt: 'Application Window & Frame Layouts' },
        { src: 'assets/img/projects/timebill/TimeBill-show-ad.png', alt: 'Digital Signage & Promotional Ads Screen' },
        { src: 'assets/img/projects/timebill/Create-ad.png', alt: 'Create In-App & Terminal Advertisement' },
        { src: 'assets/img/projects/timebill/roles.png', alt: 'Staff Roles & Permission Matrix' },
        { src: 'assets/img/projects/timebill/roles-data.png', alt: 'Role-Based Access Control Overview' },
        { src: 'assets/img/projects/timebill/data-roles.png', alt: 'Detailed Role Privileges & Policies' },
        { src: 'assets/img/projects/timebill/profiles.png', alt: 'Administrator Profile & Account Settings' }
      ]
    }
  };

  const modal = document.getElementById('project-modal');
  if (modal) {
    const modalTitle = modal.querySelector('.modal-title');
    const modalTag = modal.querySelector('.modal-tag');
    const modalDesc = modal.querySelector('.modal-desc');
    const modalMainImg = modal.querySelector('.modal-main-image img');
    const modalThumbs = modal.querySelector('.modal-thumbs');
    const closeBtn = modal.querySelector('.modal-close-btn');

    function openProjectModal(projectId) {
      const data = projectData[projectId];
      if (!data) return;

      modalTitle.textContent = data.title;
      modalTag.textContent = data.tag;
      modalDesc.textContent = data.desc;

      if (data.images && data.images.length) {
        modalMainImg.src = data.images[0].src;
        modalMainImg.alt = data.images[0].alt;

        modalThumbs.innerHTML = '';
        data.images.forEach(function (item, idx) {
          const thumb = document.createElement('div');
          thumb.className = 'modal-thumb' + (idx === 0 ? ' active' : '');
          thumb.innerHTML = '<img src="' + item.src + '" alt="' + item.alt + '" />';
          thumb.addEventListener('click', function () {
            modalThumbs.querySelectorAll('.modal-thumb').forEach(function (t) { t.classList.remove('active'); });
            thumb.classList.add('active');
            modalMainImg.src = item.src;
            modalMainImg.alt = item.alt;
          });
          modalThumbs.appendChild(thumb);
        });
      }

      modal.classList.add('open');
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }

    function closeProjectModal() {
      modal.classList.remove('open');
      modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }

    document.querySelectorAll('[data-open-project]').forEach(function (trigger) {
      trigger.addEventListener('click', function (e) {
        e.preventDefault();
        const projectId = trigger.getAttribute('data-open-project');
        openProjectModal(projectId);
      });
    });

    if (closeBtn) closeBtn.addEventListener('click', closeProjectModal);
    modal.addEventListener('click', function (e) {
      if (e.target === modal) closeProjectModal();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && modal.classList.contains('open')) closeProjectModal();
    });
  }

  // Interactive System Architecture Canvas (eyesimple & biru inspired dynamic animation)
  const canvas = document.getElementById('tech-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = 0;
    let height = 0;
    let animId = null;
    const mouse = { x: -1000, y: -1000, active: false };

    // Core Architecture Nodes
    const nodes = [
      { id: 'erp', name: 'ERP CORE', xPct: 0.22, yPct: 0.32, code: 'SYS / 01' },
      { id: 'cloud', name: 'CLOUD API', xPct: 0.74, yPct: 0.26, code: 'API / 02' },
      { id: 'iot', name: 'IoT FLEET', xPct: 0.28, yPct: 0.76, code: 'EDGE / 03' },
      { id: 'auto', name: 'AUTOMATION', xPct: 0.76, yPct: 0.74, code: 'PIPE / 04' },
      { id: 'data', name: 'DATA HUB', xPct: 0.50, yPct: 0.50, code: 'CORE / 00' },
      { id: 'client', name: 'CLIENT UI', xPct: 0.14, yPct: 0.56, code: 'APP / 05' }
    ];

    // Node interconnects
    const links = [
      [0, 4], // ERP -> DATA
      [1, 4], // CLOUD -> DATA
      [2, 4], // IoT -> DATA
      [3, 4], // AUTO -> DATA
      [0, 3], // ERP -> AUTO
      [1, 3], // CLOUD -> AUTO
      [5, 0], // CLIENT -> ERP
      [5, 2]  // CLIENT -> IoT
    ];

    // Square Data Packets
    const packets = [];
    for (let i = 0; i < 12; i++) {
      packets.push({
        linkIndex: Math.floor(Math.random() * links.length),
        progress: Math.random(),
        speed: 0.0035 + Math.random() * 0.004
      });
    }

    function resize() {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      if (width === 0 || height === 0) return;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    }

    window.addEventListener('resize', resize);
    resize();

    const stage = canvas.parentElement;
    if (stage) {
      stage.addEventListener('mousemove', function (e) {
        const rect = canvas.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
        mouse.active = true;
      });
      stage.addEventListener('mouseleave', function () {
        mouse.active = false;
        mouse.x = -1000;
        mouse.y = -1000;
      });
    }

    let time = 0;
    function render() {
      time += 0.015;
      ctx.clearRect(0, 0, width, height);

      // 1. Technical Grid Marker Crosshairs
      const step = 44;
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.035)';
      ctx.lineWidth = 1;
      for (let x = step; x < width; x += step) {
        for (let y = step; y < height; y += step) {
          ctx.beginPath();
          ctx.moveTo(x - 3, y);
          ctx.lineTo(x + 3, y);
          ctx.moveTo(x, y - 3);
          ctx.lineTo(x, y + 3);
          ctx.stroke();
        }
      }

      // Calculate smooth dynamic node floating coordinates
      const computed = nodes.map(function (n, idx) {
        const floatX = Math.sin(time * 0.7 + idx * 1.3) * 7;
        const floatY = Math.cos(time * 0.8 + idx * 1.1) * 7;
        let x = n.xPct * width + floatX;
        let y = n.yPct * height + floatY;

        // Subtle elastic attraction towards or away from cursor
        if (mouse.active) {
          const dx = mouse.x - x;
          const dy = mouse.y - y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 140 && dist > 0) {
            const force = (140 - dist) / 140;
            x -= (dx / dist) * force * 14;
            y -= (dy / dist) * force * 14;
          }
        }
        return { x: x, y: y, name: n.name, code: n.code };
      });

      // 2. Draw Connection Links
      links.forEach(function (link) {
        const a = computed[link[0]];
        const b = computed[link[1]];
        if (!a || !b) return;

        ctx.strokeStyle = 'rgba(212, 255, 61, 0.18)';
        ctx.lineWidth = 1;
        ctx.setLineDash([3, 4]);
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
        ctx.setLineDash([]);
      });

      // 3. Mouse Tether Beam & Crosshair
      if (mouse.active && mouse.x > 0 && mouse.y > 0) {
        computed.forEach(function (n) {
          const dx = mouse.x - n.x;
          const dy = mouse.y - n.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 160) {
            const alpha = (1 - dist / 160) * 0.4;
            ctx.strokeStyle = 'rgba(212, 255, 61, ' + alpha + ')';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(mouse.x, mouse.y);
            ctx.lineTo(n.x, n.y);
            ctx.stroke();
          }
        });

        // Reticle
        ctx.strokeStyle = 'rgba(212, 255, 61, 0.6)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(mouse.x - 8, mouse.y);
        ctx.lineTo(mouse.x + 8, mouse.y);
        ctx.moveTo(mouse.x, mouse.y - 8);
        ctx.lineTo(mouse.x, mouse.y + 8);
        ctx.stroke();

        ctx.fillStyle = 'rgba(212, 255, 61, 0.9)';
        ctx.font = '9px "Geist Mono", monospace';
        ctx.fillText('POS / ' + Math.round(mouse.x) + ' / ' + Math.round(mouse.y), mouse.x + 12, mouse.y - 6);
      }

      // 4. Square Data Packets
      packets.forEach(function (p) {
        p.progress += p.speed;
        if (p.progress > 1) {
          p.progress = 0;
          p.linkIndex = Math.floor(Math.random() * links.length);
        }
        const link = links[p.linkIndex];
        const a = computed[link[0]];
        const b = computed[link[1]];
        if (!a || !b) return;

        const px = a.x + (b.x - a.x) * p.progress;
        const py = a.y + (b.y - a.y) * p.progress;

        // Clean square packet (strictly no circular dots)
        ctx.fillStyle = '#d4ff3d';
        ctx.fillRect(px - 2, py - 2, 4, 4);
      });

      // 5. Draw Architectural Nodes
      computed.forEach(function (n) {
        const isHovered = mouse.active && (Math.hypot(mouse.x - n.x, mouse.y - n.y) < 36);

        // Viewfinder corner reticles
        const s = isHovered ? 15 : 12;
        ctx.strokeStyle = isHovered ? '#d4ff3d' : 'rgba(212, 255, 61, 0.5)';
        ctx.lineWidth = 1.2;

        ctx.beginPath();
        // Top-left
        ctx.moveTo(n.x - s, n.y - s + 4); ctx.lineTo(n.x - s, n.y - s); ctx.lineTo(n.x - s + 4, n.y - s);
        // Top-right
        ctx.moveTo(n.x + s - 4, n.y - s); ctx.lineTo(n.x + s, n.y - s); ctx.lineTo(n.x + s, n.y - s + 4);
        // Bottom-left
        ctx.moveTo(n.x - s, n.y + s - 4); ctx.lineTo(n.x - s, n.y + s); ctx.lineTo(n.x - s + 4, n.y + s);
        // Bottom-right
        ctx.moveTo(n.x + s - 4, n.y + s); ctx.lineTo(n.x + s, n.y + s); ctx.lineTo(n.x + s, n.y + s - 4);
        ctx.stroke();

        // Inner solid square
        ctx.fillStyle = isHovered ? '#d4ff3d' : '#0a0a0c';
        ctx.fillRect(n.x - 4, n.y - 4, 8, 8);
        ctx.strokeStyle = '#d4ff3d';
        ctx.lineWidth = 1;
        ctx.strokeRect(n.x - 4, n.y - 4, 8, 8);

        // Labels (Clean sans + mono)
        ctx.font = '10px "Inter Tight", sans-serif';
        ctx.fillStyle = isHovered ? '#ffffff' : 'rgba(255, 255, 255, 0.85)';
        ctx.fillText(n.name, n.x + s + 6, n.y + 3);

        ctx.font = '8px "Geist Mono", monospace';
        ctx.fillStyle = isHovered ? '#d4ff3d' : 'rgba(212, 255, 61, 0.65)';
        ctx.fillText(n.code, n.x + s + 6, n.y + 13);
      });

      animId = requestAnimationFrame(render);
    }

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(function (entries) {
        if (entries[0].isIntersecting) {
          if (!animId) {
            resize();
            animId = requestAnimationFrame(render);
          }
        } else {
          if (animId) {
            cancelAnimationFrame(animId);
            animId = null;
          }
        }
      });
      observer.observe(canvas);
    } else {
      animId = requestAnimationFrame(render);
    }
  }

  // Interactive Smooth Bubble Cursor (Follows mouse with smooth inertia)
  function initBubbleCursor() {
    if (window.matchMedia && window.matchMedia('(hover: none), (pointer: coarse)').matches) {
      return;
    }

    let bubble = document.querySelector('.cursor-bubble');
    if (!bubble) {
      bubble = document.createElement('div');
      bubble.className = 'cursor-bubble';
      bubble.setAttribute('aria-hidden', 'true');
      document.body.appendChild(bubble);
    }

    let mouseX = -100;
    let mouseY = -100;
    let curX = -100;
    let curY = -100;
    let isVisible = false;
    let animId = null;

    function onMouseMove(e) {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!isVisible) {
        isVisible = true;
        curX = mouseX;
        curY = mouseY;
        bubble.classList.add('is-visible');
      }

      if (!animId) {
        animId = requestAnimationFrame(renderCursor);
      }
    }

    function renderCursor() {
      curX += (mouseX - curX) * 0.18;
      curY += (mouseY - curY) * 0.18;

      bubble.style.transform = 'translate3d(' + curX + 'px, ' + curY + 'px, 0) translate(-50%, -50%)';

      const diff = Math.abs(mouseX - curX) + Math.abs(mouseY - curY);
      if (diff > 0.1 || isVisible) {
        animId = requestAnimationFrame(renderCursor);
      } else {
        animId = null;
      }
    }

    const interactiveSelector = 'a, button, [role="button"], input, textarea, select, .work-item, .project-card, .btn, .tab-btn, label, .modal-close';

    document.addEventListener('mouseover', function (e) {
      if (e.target && e.target.closest(interactiveSelector)) {
        bubble.classList.add('is-hovering');
      }
    }, { passive: true });

    document.addEventListener('mouseout', function (e) {
      if (e.target && e.target.closest(interactiveSelector)) {
        bubble.classList.remove('is-hovering');
      }
    }, { passive: true });

    document.addEventListener('mousedown', function () {
      bubble.classList.add('is-clicking');
    }, { passive: true });

    document.addEventListener('mouseup', function () {
      bubble.classList.remove('is-clicking');
    }, { passive: true });

    document.addEventListener('mouseleave', function () {
      isVisible = false;
      bubble.classList.remove('is-visible');
    });

    document.addEventListener('mouseenter', function () {
      isVisible = true;
      bubble.classList.add('is-visible');
    });

    window.addEventListener('mousemove', onMouseMove, { passive: true });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initBubbleCursor);
  } else {
    initBubbleCursor();
  }
})();

