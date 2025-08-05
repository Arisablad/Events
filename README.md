Zadanie Rekrutacyjne Alan Systems

# Notes

- Z racji iż nie miałem się skupiać na backendzie, postawiłem prosty serwer w express do mockowania
  (Pozostawia wiele do życzenia: Ustrukturyzowane response, rozbicie na pliki, dodanie prefixu "api", walidacja etc)
  -"użycie Formika będzie dodatkowym bonusem zadania" : Postawiłem na react-hook-form z racji, iż ostatnia aktualizacja formika
  była w kwietniu zeszłego roku. Słyszałem, że ma powstawać nowy projekt także sugerowałbym pójście z duchem czasu
- Wykorzystałem tanstack router (pierwszy raz) gdyż oferuje on file based routing oraz wiele ciekawych featurów.
- Api client został napisany na szybko, w prawdziwym projekcie byłby on pewnie znacznie bardziej rozbudowany. Gdyż osobiście zamiast reduxa użyłbym mniej więcej
  czegoś w stylu tego co znajduje sie w lib/api w połączeniu z tanstack query.
- Dropzone został również napisany na szybko i z pewnością byłby bardziej rozbudowany na produkcji.
- Kwestia tłumaczeń. Aktualnie potrzebne tłumaczenia w każdym komponencie. Jednak w przypadku produkcyjnego kodu. Ładowałbym tylko wymagane dla danego route (Widziałem , że tanstack router udostępnia taką opcję).
  i przekazywał do komponentu dziecka z pomocą propsów (EventList - > EventItem)
- Z racji ze projekt jest oparty na React 19 w wielu miejscach nie uzywam memo/useCallback
- Przy projekcie, do utrzymywania zastosowałbym ThemeConfig aby nie pisać na sztywno class tailwindowych typu text-gray-500 dark:text-gray-500
  gdyż potem jedna zmiana wymaga wiele więcej czasu.
- Filtry powinny być po backendzie bazując na searchParamsach /paginacja/search/sort/filter by type etc. Jednak miałem stworzyć tylko mocki.
- Z racji braku requestów do API, nie stosowałem debounce na inputach(search).
- Na realnym kodzie z pewnością ustawiłbym jakiś cache w tanstack query.
