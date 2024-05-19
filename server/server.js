const express = require('express');
const axios = require('axios');
const cors = require('cors');
const cheerio = require('cheerio');
const questions = require('./questions');

const app = express();
const PORT = 3000;

app.use(cors());

app.get('/api/questions', (req, res) => {
  res.json(questions);
});

const scrapeFoodDataAceh = async () => {
  try {
    const response = await axios.get('https://www.gramedia.com/best-seller/resep-makanan-khas-aceh/');
    const htmlContent = response.data;
    const $ = cheerio.load(htmlContent);

    const foodData = [];

    $('.entry-content h3').each((index, element) => {
      if (index >= 5) return false; 

      let name = $(element).text().trim();
      name = name.replace(/^\d+\.\s*/, '');
      
      let description;
      if (index === 0 || index === 1) {
        description = $(element).nextAll('p').eq(2).text().trim();
      } else if (index === 4) {
        description = $(element).next().next().text().trim();
        description = description.replace(', Grameds', '');
      } else {
        description = $(element).next().next().text().trim();
      }
      
      foodData.push({ name, description });
    });

    return foodData;
  } catch (error) {
    console.error('Error scraping food data:', error.message);
    throw new Error('Failed to scrape food data');
  }
};

app.get('/api/food-data-aceh', async (req, res) => {
  try {
    const foodDataAceh = await scrapeFoodDataAceh();
    res.json(foodDataAceh);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/unique-facts-aceh', async (req, res) => {
  try {
    const response = await axios.get('https://www.youngontop.com/10-fakta-menarik-dari-aceh/');
    
    if (!response.data) {
      throw new Error('No data received from the source');
    }

    res.json(response.data);
  } catch (error) {
    console.error('Error fetching data:', error.message);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

const scrapeFoodDataJawaBarat = async () => {
  try {
    const response = await axios.get('https://www.gramedia.com/best-seller/makanan-khas-jawa-barat/');
    const htmlContent = response.data;
    const $ = cheerio.load(htmlContent);

    const foodData = [];

    $('.entry-content h3').each((index, element) => {
      if (index >= 5) return false; 

      let name = $(element).text().trim();
      name = name.replace(/^\d+\.\s*/, '');
      
      let description;
      if (index === 1 || index === 2) {
        description = $(element).nextAll('p').eq(1).text().trim();
      } else {
        description = $(element).next().next().text().trim();
      }
      
      foodData.push({ name, description });
    });

    return foodData;
  } catch (error) {
    console.error('Error scraping food data:', error.message);
    throw new Error('Failed to scrape food data');
  }
};

app.get('/api/food-data-jawabarat', async (req, res) => {
  try {
    const foodDataJawaBarat = await scrapeFoodDataJawaBarat();
    res.json(foodDataJawaBarat);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/unique-facts-jawabarat', async (req, res) => {
  try {
    const response = await axios.get('https://www.youngontop.com/10-hal-menarik-dari-kota-bandung/');

    if (!response.data) {
      throw new Error('No data received from the source');
    }

    res.json(response.data);
  } catch (error) {
    console.error('Error fetching data:', error.message);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

const scrapeFoodDataSulawesiSelatan = async () => {
  try {
    const response = await axios.get('https://www.gramedia.com/best-seller/makanan-khas-sulawesi-selatan/');
    const htmlContent = response.data;
    const $ = cheerio.load(htmlContent);

    const foodData = [];

    $('.entry-content h3').each((index, element) => {
      if (index >= 7) return false;

      if (index === 2) return;

      let name = $(element).text().trim();
      name = name.replace(/^\d+\.\s*/, '');
      name = name.replace('kuliner khas Sulawesi Selatan', '').trim();

      let description;
      if (index === 0 || index === 1 || index === 4) {
        description = $(element).nextAll('p').eq(1).text().trim();
      } else {
        description = $(element).next().next().text().trim();
      }

      if (name && description) {
        foodData.push({ name, description });
      } else if (foodData.length > 0 && !name) {
        foodData[foodData.length - 1].description += ' ' + description;
      }

      if (foodData.length === 5) return false;
    });

    return foodData;
  } catch (error) {
    console.error('Error scraping food data:', error.message);
    throw new Error('Failed to scrape food data');
  }
};

app.get('/api/food-data-sulawesiselatan', async (req, res) => {
  try {
    const foodDataSulawesiSelatan = await scrapeFoodDataSulawesiSelatan();
    res.json(foodDataSulawesiSelatan);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/unique-facts-sulawesiselatan', async (req, res) => {
  try {
    const response = await axios.get('https://www.youngontop.com/10-fakta-menarik-dari-kota-makassar/');

    if (!response.data) {
      throw new Error('No data received from the source');
    }

    res.json(response.data);
  } catch (error) {
    console.error('Error fetching data:', error.message);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

const scrapeFoodDataMaluku = async () => {
  try {
    const response = await axios.get('https://www.gramedia.com/best-seller/makanan-khas-maluku/');
    const htmlContent = response.data;
    const $ = cheerio.load(htmlContent);

    const foodData = [];

    $('h2').each((index, element) => {
      if (index >= 5) return false;

      let name = $(element).text().trim();
      name = name.replace(/^\d+\.\s*/, '');

      let description;
      if (index === 3 || index === 0) {
        description = $(element).nextAll('p').eq(1).text().trim();

        if (index === 0){
          description = description.replace(/ pun/, '');
        }
      } else if (index === 2 || index === 1){
        description = $(element).nextAll('p').eq(0).text().trim();
      } else {
        description = $(element).next().next().text().trim();
      }

      if (name && description) {
        foodData.push({ name, description });
      }
    });

    return foodData;
  } catch (error) {
    console.error('Error scraping food data:', error.message);
    throw new Error('Failed to scrape food data');
  }
};

app.get('/api/food-data-maluku', async (req, res) => {
  try {
    const foodDataMaluku = await scrapeFoodDataMaluku();
    res.json(foodDataMaluku);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/unique-facts-maluku', async (req, res) => {
  try {
    const response = await axios.get('https://www.youngontop.com/10-fakta-menarik-dari-kota-ambon/');

    if (!response.data) {
      throw new Error('No data received from the source');
    }

    res.json(response.data);
  } catch (error) {
    console.error('Error fetching data:', error.message);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

const scrapeFoodDataBali = async () => {
  try {
    const response = await axios.get('https://www.gramedia.com/best-seller/makanan-khas-bali/');
    const htmlContent = response.data;
    const $ = cheerio.load(htmlContent);

    const foodData = [];

    $('.entry-content h3').each((index, element) => {
      if (index >= 5) return false;

      let name = $(element).text().trim();
      name = name.replace(/^\d+\.\s*/, '');

      let description;
      if (index === 1 || index === 2 ||  index === 3) {
        description = $(element).nextAll('p').eq(1).text().trim();
        if (index === 2){
          description = description.replace(/Karena memang s/, 'S');
        }
      } else if (index === 0){
        description = $(element).nextAll('p').eq(2).text().trim();
      } else {
        description = $(element).next().next().text().trim();
      }

      foodData.push({ name, description });
    });

    return foodData;
  } catch (error) {
    console.error('Error scraping food data:', error.message);
    throw new Error('Failed to scrape food data');
  }
};

app.get('/api/food-data-bali', async (req, res) => {
  try {
    const foodDataBali = await scrapeFoodDataBali();
    res.json(foodDataBali);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/unique-facts-Bali', async (req, res) => {
  try {
    const response = await axios.get('https://www.youngontop.com/10-fakta-menarik-dari-kota-denpasar/');

    if (!response.data) {
      throw new Error('No data received from the source');
    }

    res.json(response.data);
  } catch (error) {
    console.error('Error fetching data:', error.message);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

const scrapeFoodDataYogyakarta = async () => {
  try {
    const response = await axios.get('https://www.gramedia.com/best-seller/makanan-khas-jogja/');
    const htmlContent = response.data;
    const $ = cheerio.load(htmlContent);

    const foodData = [];

    $('.entry-content h3').each((index, element) => {
      if (index >= 5) return false;

      let name = $(element).text().trim();
      name = name.replace(/^\d+\.\s*/, '');

      let description;
      if (index === 0) {
        description = $(element).nextAll('p').eq(1).text().trim();
      } else if (index === 2) {
        const firstParagraph = $(element).nextAll('p').eq(0).text().trim();
        const secondParagraph = $(element).nextAll('p').eq(1).text().trim();
        description = `${firstParagraph} ${secondParagraph}`;

        description = description.replace(/Apa yang Grameds pikirkan ketika mendengar tengkleng gajah\? Tenang, ini bukan sajian tengkleng dengan daging gajah, melainkan makanan s/, 'S');
      } else if (index === 3) {
        description = $(element).nextAll('p').eq(2).text().trim();
      } else {
        description = $(element).next().next().text().trim();
      }

      foodData.push({ name, description });
    });

    return foodData;
  } catch (error) {
    console.error('Error scraping food data:', error.message);
    throw new Error('Failed to scrape food data');
  }
};

app.get('/api/food-data-yogyakarta', async (req, res) => {
  try {
    const foodDataYogyakarta = await scrapeFoodDataYogyakarta();
    res.json(foodDataYogyakarta);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/unique-facts-yogyakarta', async (req, res) => {
  try {
    const response = await axios.get('https://www.youngontop.com/10-fakta-menarik-dari-kota-yogyakarta/');

    if (!response.data) {
      throw new Error('No data received from the source');
    }

    res.json(response.data);
  } catch (error) {
    console.error('Error fetching data:', error.message);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

const scrapeFoodDataSumateraSelatan = async () => {
  try {
    const response = await axios.get('https://www.gramedia.com/best-seller/makanan-palembang/');
    const htmlContent = response.data;
    const $ = cheerio.load(htmlContent);

    const foodData = [];

    $('.entry-content h3').each((index, element) => {
      if (index >= 5) return false;

      let name = $(element).text().trim();
      name = name.replace(/^\d+\.\s*/, '');

      let description;
      if (index === 0) {
        const firstParagraph = $(element).nextAll('p').eq(1).text().trim();
        const secondParagraph = $(element).nextAll('p').eq(2).text().trim();
        description = `${firstParagraph} ${secondParagraph}`;
      } else if (index === 2 || index === 3) {
        description = $(element).nextAll('p').eq(1).text().trim();
      } else {
        description = $(element).next().next().text().trim();
      }

      foodData.push({ name, description });
    });

    return foodData;
  } catch (error) {
    console.error('Error scraping food data:', error.message);
    throw new Error('Failed to scrape food data');
  }
};

app.get('/api/food-data-sumateraselatan', async (req, res) => {
  try {
    const foodDataSumateraSelatan = await scrapeFoodDataSumateraSelatan();
    res.json(foodDataSumateraSelatan);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/unique-facts-sumateraselatan', async (req, res) => {
  try {
    const response = await axios.get('https://www.youngontop.com/10-fakta-menarik-dari-kota-palembang/');

    if (!response.data) {
      throw new Error('No data received from the source');
    }

    res.json(response.data);
  } catch (error) {
    console.error('Error fetching data:', error.message);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

app.get('/api/unique-quotes', async (req, res) => {
  try {
    const response = await axios.get('https://www.ef.com/wwen/english-resources/english-quotes/famous/');
    if (!response.data) {
      throw new Error('No data received from the source');
    }
    res.send(response.data);
  } catch (error) {
    console.error('Error fetching data:', error.message);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});