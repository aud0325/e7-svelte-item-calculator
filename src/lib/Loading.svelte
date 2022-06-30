<div class="loader"></div>

<style>
    .loader {
      z-index: 1;
      width: 60px;
      height: 60px;
      margin: auto;
      border: 12px solid #f3f3f3;
      border-radius: 50%;
      border-top: 12px solid #5e5e5e;
      -webkit-animation: spin 2s linear infinite;
      animation: spin 2s linear infinite;
    }
    
    /* Safari */
    @-webkit-keyframes spin {
      0% { -webkit-transform: rotate(0deg); }
      100% { -webkit-transform: rotate(360deg); }
    }
    
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
</style>