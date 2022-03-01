function getCookie(name) {
  let value = `; ${document.cookie}`;
  let parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}

const redirects = {
  en: {
    us: "/en-us",
    uk: "/en-uk",
  },
  es: {
    es: "/es-es",
    us: "/es-us",
  },
};

function redirect(language, country) {
  const redirectPath = redirects[language][country];
  window.location.replace(redirectPath);
}

const language = getCookie("nf_lang");
const country = getCookie("nf_country");

// If cookies have not been set we fetch a json file
// Netlify redirects have been configured to serve a version of
// the file that contains the correct language/country info
// based on the users accept-language header and location
if (language && country) {
  redirect(language, country);
} else {
  fetch("/geo/geo.json")
    .then((response) => response.json())
    .then((data) => {
      document.cookie = `nf_lang=${data.language}`;
      document.cookie = `nf_country=${data.country}`;
      redirect(data.language, data.country);
    });
}
