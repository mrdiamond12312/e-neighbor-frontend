/**
 * loading 占位
 * 解决首次加载时白屏的问题
 */
 (function () {
  const _root = document.querySelector('#root');
  if (_root && _root.innerHTML === '') {
    _root.innerHTML = `
      <style>
        html,
        body,
        #root {
          height: 100%;
          margin: 0;
          padding: 0;
        }
        #root {
          background-repeat: no-repeat;
          background-size: 100% auto;
        }

        .loading-title {
          font-size: 1.1rem;
        }

        .loading-sub-title {
          margin-top: 20px;
          font-size: 1rem;
          color: #888;
        }

        .page-loading-warp {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 26px;
        }

        .sprite {
          background: url(/sprite/loading.webp);
          background-size: 100% 3000%;
          background-position: 0 0;
          width: 21.2rem;
          height: 6rem;
          animation: frameAnimation .5s steps(30) infinite forwards;

        }
        @keyframes frameAnimation {
          0% { background-position: 0 0; }
          100% { background-position:  0 -3000%; }
        }
      </style>

      <div style="
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100%;
        min-height: 362px;
      ">
        <div class="page-loading-warp">
          <div class="ant-spin ant-spin-lg ant-spin-spinning">
            <span class="ant-spin-dot ant-spin-dot-spin">
              <i class="ant-spin-dot-item"></i>
              <i class="ant-spin-dot-item"></i>
              <i class="ant-spin-dot-item"></i>
              <i class="ant-spin-dot-item"></i>
            </span>
          </div>
        </div>
        <div class="sprite"></div>
      </div>
    `;
  }
})();
