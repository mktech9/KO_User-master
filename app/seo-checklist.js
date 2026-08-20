import Script from "next/script";

export const SeoChecklist = () => {
  return (
    <>
      <meta name="fb:admins" content="krossovergifts" />
      <link
        rel="shortcut icon"
        href="https://kross-over.net/favicon.ico"
        type="image/x-icon"
      />
      <Script type="application/ld+json" strategy="lazyOnload">
        {`{
                "@context": "https://schema.org",
                "@type": "Organization",
                "name": "Kross Over",
                "url": "https://kross-over.net/",
                "logo": "https://kross-over.net/logo.png",
                "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+971-42979798 ",
                "contactType": "customer service",
                "contactOption": "TollFree",
                "areaServed": "AE",
                "availableLanguage": "en"
                },
                "sameAs": [
                "https://www.facebook.com/krossovergifts",
                "https://twitter.com/krossovergifts", 
                "https://www.linkedin.com/company/krossovergifts/", 
                "https://www.instagram.com/krossovergifts/",
                "https://api.whatsapp.com/send?phone=0097142979798"
                ]
            }`}
      </Script>
    </>
  );
};

export const TagScripts = ({ label }) => {
  return (
    <>
      <Script
        src="https://app.whatshub.co.in/js/whatsapp-widget.js?v=6985cb245470b"
        strategy="lazyOnload"
      />
      <Script strategy="lazyOnload">
        {`
            // Add CSS to push the widget up on mobile to avoid overlap with floating buttons
            var style = document.createElement('style');
            style.textContent = '@media (max-width: 767px) { #widget-button { bottom: 72px !important; } #wa-chat-whatsapp-widget { bottom: 150px !important; } }';
            document.head.appendChild(style);

            var widget_options =  {
              Position: "right",
              Contact: "9710527940227",
              SiteName: "Krossover Gifts",
              SiteTag: "Got a question? We're online — chat now!",
              SiteLogo: "https://datads1.btpr.online/whatsappsm.png",
              WelcomeMessage: "Hello",
              WidgetColor: "#128c7e",
              TextColor: "#ffffff",
            };
            var checkWidget = setInterval(function() {
              if (typeof whatsapp_widget === 'function') {
                clearInterval(checkWidget);
                whatsapp_widget(widget_options);
              }
            }, 100);
            `}
      </Script>
    </>
  );
};

export const GoogleTags = () => {
  return (
    <>
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-RDW545XCRJ"
        strategy="afterInteractive"
      />
      <Script strategy="afterInteractive">
        {`
         window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'G-RDW545XCRJ');
        `}
      </Script>
    </>
  );
};
