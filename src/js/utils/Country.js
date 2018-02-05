
class Country {

  static setCountry(country) {
    localStorage.setItem('country', country);
  }

  static getCountry() {
    if (localStorage.getItem('country')) {
      let coun = localStorage.getItem('country');

      for(let i =0; i<Country.allCountry().length; i++) {
        if(Country.allCountry()[i].id === coun) {
          return coun;
        }
      }

      return 'us';
    }
    return 'us';
  }

  static allCountry() {
    return [
      { name: 'UAE', id: 'ae' },
      { name: 'Argentina', id: 'ar' },
      { name: 'Austria', id: 'at' }, 
      { name: 'Australia', id: 'au' },
      { name: 'Belgium', id: 'be' },
      { name: 'Bulgaria', id: 'bg' },
      { name: 'Brazil', id: 'br' },
      { name: 'Canada', id: 'ca' },
      { name: 'Switzerand', id: 'ch' },
      { name: 'China', id: 'cn' },
      { name: 'Colombia', id: 'co' },
      { name: 'Cuba', id: 'cu' },
      { name: 'Czech Republic', id: 'cz' },
      { name: 'Germany', id: 'de' },
      { name: 'Egypt', id: 'eg' },
      { name: 'France', id: 'fr' },
      { name: 'United Kingdom', id: 'gb' },
      { name: 'Greece', id: 'gr' },
      { name: 'Hong Kong', id: 'hk' },
      { name: 'Hungary', id: 'hu' },
      { name: 'Indonesia', id: 'id' },
      { name: 'Ireland', id: 'ie' },
      { name: 'Israel', id: 'il' },
      { name: 'India', id: 'in' }, 
      { name: 'Italy', id: 'it' }, 
      { name: 'Japan', id: 'jp' },
      { name: 'South Korea', id: 'kr' }, 
      { name: 'Lithuania', id: 'lt' }, 
      { name: 'Latvia', id: 'lv' }, 
      { name: 'Morocco', id: 'ma' },
      { name: 'Mexico', id: 'mx' },
      { name: 'Malaysia', id: 'my' },
      { name: 'Nigeria', id: 'ng' },
      { name: 'Netherlands', id: 'nl' }, 
      { name: 'Norway', id: 'no' }, 
      { name: 'New Zealand', id: 'nz' }, 
      { name: 'Philippinesp', id: 'ph' }, 
      { name: 'Poland', id: 'pl' },
      { name: 'Portugal', id: 'pt' },
      { name: 'Romania', id: 'ro' },
      { name: 'Serbia', id: 'rs' },
      { name: 'Russia', id: 'ru' },
      { name: 'Saudi Arabia', id: 'sa' },
      { name: 'Sweden', id: 'se' },
      { name: 'Singapore', id: 'sg' },
      { name: 'Slovenia', id: 'si' },
      { name: 'Slovakia', id: 'sk' },
      { name: 'Thailand', id: 'th' },
      { name: 'Turkey', id: 'tr' },
      { name: 'Taian', id: 'tw' },
      { name: 'Ukraine', id: 'ua' },
      { name: 'United State', id: 'us' },
      { name: 'Venuzuela', id: 've' },
      { name: 'South Africa', id: 'za' }
    ];
  }
}

export default Country;
