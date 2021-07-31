
  // Copyright Koos Looijesteijn https://www.kooslooijesteijn.net/blog/add-dark-mode-to-website 
  // Find if user has set a preference and react to changes
  (function initializeTheme(){
    syncBetweenTabs()
    listenToOSChanges()
  }())
  
  // Listen to preference changes. The event only fires in inactive tabs, so theme changes aren't applied twice.
  function syncBetweenTabs(){
    window.addEventListener('storage', (e) => {
      const root = document.documentElement
      if (e.key === 'preference-theme'){
        if (e.newValue === 'light') enableTheme('light', true, false)
        else if (e.newValue === 'dark') enableTheme('dark', true, false) // The third argument makes sure the state isn't saved again.
      }
    })
  }
  
  // Add a listener in case OS-level preference changes.
  function listenToOSChanges(){
    let mediaQueryList = window.matchMedia('(prefers-color-scheme: dark)')
  
    mediaQueryList.addListener( (m)=> {
      const root = document.documentElement
      if (m.matches !== true){
        if (!root.classList.contains('theme-light')){
          enableTheme('light', true)
        }
      }
      else{
        if(!root.classList.contains('theme-dark')) enableTheme('dark', true)
      }
    })
  }