// Key for locally stored data for chat connection
const localDataKey = 'palvelukeskusGenesysData';
// Query string key for data returned by chat integration
const referredDataKey = 'attachedData';

// Reload page if chat connection data changes
window.addEventListener('storage', (event) => {
  if (event.key === localDataKey) {
    location.reload();
  }
});

(($, Drupal, drupalSettings) => {
  'use strict';

  const rootElement = $('.palvelukeskus-genesys');

  Drupal.closePalvelukeskusGenesys = () => {
    rootElement.addClass('chat-hidden');
  }

  Drupal.behaviors.palvelukeskus_genesys = {
    attach: (context, settings) => {
      const localization  = 'https://www.hel.fi/chat/palvelukeskus/custom/chat-matkapalvelu-fi.json';
      const serverUrl = 'https://www.hel.fi/chat/palvelukeskus/cobrowse';
      const cbUrl = 'https://www.hel.fi/chat/palvelukeskus/cobrowse';
      const serviceId = 'MATKAPALVELU';


      const urlParams = new URLSearchParams(window.location.search);
      const referredData = urlParams.get(referredDataKey);

      // Store referredData to localStorage if present
      if (referredData) {
        localStorage.setItem(localDataKey, referredData);
      }

      const setAuthenticating = (state) => {
        if (state) {
          rootElement.addClass('authenticating');
          $('.palvelukeskus-genesys__control').each(function() {
            $(this).removeAttr('disabled');
          })
          return;
        }
    
        rootElement.removeClass('authenticating');
        $('.palvelukeskus-genesys__control').each(function() {
          $(this).attr('disabled', true);
        })
      }

      const getAuthId = () => {
        return localStorage.getItem(localDataKey);
      }

      // Event listeners for controls
      $('.palvelukeskus-genesys__chat-open').click(() => {
        setTimeout(() => {
          const isAuthenticated = getAuthId();
          rootElement.removeClass('chat-hidden');
  
          if (isAuthenticated) {
            $('.gcb-startChat').click();
            return;
          }
        }, 0);
      })

      $('body').on('click', (event) => {
        const shouldCloseChat = event.target && (
          event.target.classList.contains('gwc-chat-icon-iks') ||
          event.target.parentNode.classList.contains('gwc-chat-icon-iks')
        );

        if (shouldCloseChat) {
          Drupal.closePalvelukeskusGenesys();
        }
      });

      const getUserData = (attachedData) => {
        const url = decodeURIComponent(window.location);
        const userAgent = navigator.userAgent;
        let userDataStr = url + ' | ' + userAgent  + ' | ' + attachedData.length;
        return userDataStr.replaceAll("\'","_")
          .replaceAll("\;","_")
          .replaceAll("\"","_")
          .replaceAll("/","_")
          .replaceAll("(","_")
          .replaceAll(")","_")
          .replaceAll("\?","_")
          .replaceAll(":","_");
      }

      const getChatTitle = () => {
        return (`
          <h2 class='palvelukeskus-genesys__title'>${Drupal.t('Matkapalvelu chat')}</h2>
        `);
      }

      const getCloseButton = () => {
        return (`
          <button
            class='gwc-chat-icon-iks hds-button'
            title='${Drupal.t('Close')}'
            alt='${Drupal.t('Close')}'
          >
            <span class='hel-icon hel-icon--cross'></span>
          </button>
        `)
      }

      const getMinimizeButton = () => {
        return (`
          <button
            class='gwc-chat-icon-down hds-button'
            title='${Drupal.t('Minimize')}'
            alt='${Drupal.t('Minimize')}'
          >
            <span class='hel-icon hel-icon--minus'></span>
          </button>
        `)
      }

      const attachedData = getAuthId();

      if (attachedData) {
        rootElement.addClass('is-authenticated');
        const userData = getUserData(attachedData);

        window._genesys = {
          chat: {
            registration: false,
            localization: localization,
            onReady: [],
            ui: {
              // UI manipulation
              onBeforeChat: function (chat) {
                setTimeout(() => {
                  // Replace genesys chat title
                  $('.gwc-chat-title').replaceWith(getChatTitle())
                  // Remove genesys branding
                  $('.gwc-chat-branding').remove();
                  // Replace close icon
                  $('.gwc-chat-icon-close').replaceWith(getCloseButton());
                  // Replace minimize icon
                  $('.gwc-chat-icon-minimize').replaceWith(getMinimizeButton());
                }, 0)

                window._genesys.chat.onReady.push((chatWidgetApi) => {
                  chatWidgetApi.restoreChat({
                    serverUrl: serverUrl,
                    registration: (done) => {
                      done({
                        service: serviceId,
                        Language: 'FI',
                        InboundSession: attachedData
                      });
                    }
                  })
                  .done(function (session) {
                    // Set user data
                    session.setUserData({
                      DebugData: userData,
                      service: serviceId,
                      Language: 'FI',
                      InboundSession: attachedData
                    });
                    
                    // Dom changes to messages
                    session.onMessageReceived((event) => {        
                      if (event.party.type.client) {
                        $('.gwc-chat-message-author').last().siblings('.gwc-chat-message-text').addClass('user-message').removeClass( 'gwc-chat-message-text' );
                      }
                    });
                  })
                  .fail((par) => {
                    console.warn(par.description);
                  })
                })
              }
            }
          },
          cobrowse: false,
        };
      }
    }
  };
})(jQuery, Drupal, drupalSettings)
