g.loadQueue.push({
  fun: () => {
    var webhookUrl = localStorage.getItem('abot_webhookUrl');
    var newWebhookUrl = '';

    function sendWebhookRequest(webhookUrl) {
      var characterName = hero.nick;
      var level = hero.lvl;
      var gold = hero.gold / 1000000;
      var location = map.name;
      var cords = "(" + hero.x + "," + hero.y + ")";
      var world = g.worldConfig.getWorldName().charAt(0).toUpperCase() + g.worldConfig.getWorldName().slice(1);

      $.ajax({
        type: "POST",
        url: webhookUrl,
        data: JSON.stringify({
          embeds: [{
            title: 'Logi Postaci',
            color: '16711680',
            description: "**Nick:** " + characterName + "\n**Level:** " + level + "\n**Gold:** " + gold.toFixed(0) + "m\n**Map:** " + location + "\n**Kordy:** " + cords + "\n**World:** " + world
          }],
          username: 'Informacje',
        }),
        contentType: "application/json",
        dataType: "json"
      });
    }

    function openDialog() {
      if (!webhookUrl) {
        newWebhookUrl = prompt("Wprowadź link do webhooka Discorda:");
        if (newWebhookUrl !== null && newWebhookUrl.trim() !== '') {
          if (newWebhookUrl.includes('https://discordapp.com/api/webhooks/')) {
            localStorage.setItem('abot_webhookUrl', newWebhookUrl);
            sendWebhookRequest(newWebhookUrl);
            message('Ustawiono Webhook!');
          } else {
            message('Niepoprawny webhook!');
          }
        }
      } else {
        newWebhookUrl = prompt("Wprowadź nowy link do webhooka Discorda (lub zostaw puste, jeśli chcesz zachować aktualny):");
        if (newWebhookUrl !== null) {
          if (newWebhookUrl === '') {
            // Jeśli użytkownik zostawił pole puste, zachowujemy aktualny link
            sendWebhookRequest(webhookUrl);
            message('Ustawiono Webhook!');
          } else if (newWebhookUrl.includes('https://discordapp.com/api/webhooks/')) {
            localStorage.setItem('abot_webhookUrl', newWebhookUrl);
            sendWebhookRequest(newWebhookUrl);
            message('Ustawiono Webhook!');
          } else {
            message('Niepoprawny webhook!');
          }
        }
      }
    }

    function message(msg) {
      // Tutaj możesz umieścić kod odpowiedzialny za wyświetlanie wiadomości w dowolny sposób
      console.log(msg);
    }

    openDialog();
  }
});
