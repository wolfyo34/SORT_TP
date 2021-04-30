# SORT_TP
Le groupe est composé de David Urdes, Antoine Terracol, Terry Mubaya, Yoann Martinoli.

Le code est constitué de 2 fichiers (functions.js et index.js).
Le premier fichier regroupe toutes les fonctions nécessaires au bon fonctionnement du code tel que des fonctions de déplacement de fichier, creation de dossier...
Nous avons ajouté la ligne  "type": "module" dans le fichier json nous permettant de pouvoir faire communiquer les 2 fichiers entre eux avec les import/export de fonctions.
Lors du lancement du programme, le code va parcourir les jpeg dans le dossier image et va detecter la race de l'animal sur chaque photo via tensorflow.
Si un dossier est déjà existant pour cette race alors l'image est déplacée dans ce dossier, sinon il créer un dossier avec pour nom la race de l'animal et le déplacer dedans.

Nous avons modifié le code pour qu'il n'y ait plus aucune erreur lors du lancement de la commande xo. 
Il reste cependant une dernière erreur sur la ligne "import {find} from 'ramda';" 
où le programme nous informe que cette commande n'est pas utilisé mais lorsqu'on enleve cette ligne le programme ne marche plus.
