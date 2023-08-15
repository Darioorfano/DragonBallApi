const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const cors = require('cors');
const app = express();

let img = '';

app.use(cors());

const endpoints = [
  {
    name: 'Obtener todos los personajes',
    url: '/allCharacters',
    method: 'GET',
    description: ''
  },
  {
    name: 'Obtener personaje por nombre',
    url: '/getCharacter/:name',
    method: 'GET',
    description: ''
  },
]

app.get('/', (req, res) => {
  return res.json(endpoints);
}
)


app.get('/allCharacters', async (req, res) => {
  try {
    const url = 'https://dragonball.fandom.com/es/wiki/Lista_de_personajes';

    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    const characters = [];
    const characterLinks = [];

    $('.mw-parser-output > ul > li:not(#toc li) > a').each((index, element) => {
      if (index >= 12) {
        return;
      } else {
        const characterUrl = $(element).attr('href');
        const characterName = $(element).text().trim();
        characterLinks.push({ url: characterUrl, name: characterName });
      }
    });

    for (const characterLink of characterLinks) {
      try {
        const characterResponse = await axios.get(`https://dragonball.fandom.com${characterLink.url}`);
        const character$ = cheerio.load(characterResponse.data);

        const imageUrl = character$('.pi-image-thumbnail').attr('src'); 
        const imageUrlUpdate=imageUrl.replace("static","vignette");

        characters.push({
          name: characterLink.name,
          url: characterLink.url,
          imgURL: imageUrlUpdate,
        });
      } catch (error) {
        console.error(`Error obteniendo datos de: ${characterLink.url}`, error);
      }
    }

    console.log(characters);
    res.json(characters);
  } catch (error) {
    res.status(500).json({ error: 'Error en el scraping' });
  }
});



app.get('/getCharacter/:name', async (req, res) => {
  try {
    const name = req.params.name;

    const url = `https://dragonball.fandom.com/es/wiki/${name}`;

    const response = await axios.get(url);

    const $ = cheerio.load(response.data);

    const tocElement = $('#toc');
    //const tecnicasHeader = $('#Serie');

    // Encontramos  los elementos <p> que se encuentran debajo de la etiqueta <small></small> y antes del elemento con id "toc"
    const characterInfoElements = $('small')
      .nextUntil(tocElement, 'p')
      .filter((index, element) => $(element).text().trim() !== '');

    // Obtener la información de los párrafos
    const characterInfo = characterInfoElements
      .map((index, element) => $(element).text())
      .get()
      .join('\n')
      .trim();

    const characterName = $('.mw-page-title-main').text().trim();

    img= $('.pi-image-thumbnail').attr('src');
    const imageUrlUpdate=img.replace("static","vignette");


    const techniquesUrl = `https://dragonball.fandom.com/es/wiki/${name}/Técnicas_y_Habilidades`;

    const techniquesResponse = await axios.get(techniquesUrl);
    const techniques$ = cheerio.load(techniquesResponse.data);

    const seriesList = techniques$('h3 #Serie').parent().next('ul');
    const tecnicas = []

    const seriesListItems = seriesList.find('ul li').filter((index, element) => $(element).find('ul').length === 0);
    seriesListItems.find('li .image').remove();

   seriesListItems.each((index, element) => {
        if (index >= 10) {
          return;
        } else {
          const tecnica = $(element).text().trim()
          tecnicas.push({
            nombre:tecnica.split(':')[0],
            descripcion:tecnica.split(':')[1]
          })
        }

      })

    const characterData = {
      name: characterName,
      info: characterInfo,
      image: imageUrlUpdate,
      techniques: tecnicas
    };

    res.json(characterData);
  } catch (error) {
    res.status(500).json({ error: 'Error en el scraping' });
  }
});



app.listen(3000, () => {
  console.log('Servidor escuchando en http://localhost:3000');
});
