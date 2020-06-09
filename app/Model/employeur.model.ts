const validator = require("../email-validator");
export class Employeur {
    private _ID_EMPLOYEUR: Number;
    public get ID_EMPLOYEUR(): Number {
        return this._ID_EMPLOYEUR;
    }
    public set ID_EMPLOYEUR(value: Number) {
        this._ID_EMPLOYEUR = value;
    }
    private _NOM: String;
    public get NOM(): String {
        return this._NOM;
    }
    public set NOM(value: String) {
        this._NOM = value;
    }
    private _EMAIL: String;
    public get EMAIL(): String {
        return this._EMAIL;
    }
    public set EMAIL(value: String) {
        this._EMAIL = value;
    }
    private _PHOTO_EMPLOYEUR: String;
    public get PHOTO_EMPLOYEUR(): String {
        return this._PHOTO_EMPLOYEUR;
    }
    public set PHOTO_EMPLOYEUR(value: String) {
        this._PHOTO_EMPLOYEUR = value;
    }
    private _DESCRIPTION: String;
    public get DESCRIPTION(): String {
        return this._DESCRIPTION;
    }
    public set DESCRIPTION(value: String) {
        this._DESCRIPTION = value;
    }
    private _SITE_WEB: String;
    public get SITE_WEB(): String {
        return this._SITE_WEB;
    }
    public set SITE_WEB(value: String) {
        this._SITE_WEB = value;
    }
    private _TELEPHONE_EMPLOYEUR: String;
    public get TELEPHONE_EMPLOYEUR(): String {
        return this._TELEPHONE_EMPLOYEUR;
    }
    public set TELEPHONE_EMPLOYEUR(value: String) {
        this._TELEPHONE_EMPLOYEUR = value;
    }
    private _FIX_EMPLOYEUR: String;
    public get FIX_EMPLOYEUR(): String {
        return this._FIX_EMPLOYEUR;
    }
    public set FIX_EMPLOYEUR(value: String) {
        this._FIX_EMPLOYEUR = value;
    }
    private _ADRESSE_EMPLOYEUR: String;
    public get ADRESSE_EMPLOYEUR(): String {
        return this._ADRESSE_EMPLOYEUR;
    }
    public set ADRESSE_EMPLOYEUR(value: String) {
        this._ADRESSE_EMPLOYEUR = value;
    }
    private _REGISTRE_COMMERCE: String;
    public get REGISTRE_COMMERCE(): String {
        return this._REGISTRE_COMMERCE;
    }
    public set REGISTRE_COMMERCE(value: String) {
        this._REGISTRE_COMMERCE = value;
    }
    private _TYPE_EMPLOYEUR: String;
    public get TYPE_EMPLOYEUR(): String {
        return this._TYPE_EMPLOYEUR;
    }
    public set TYPE_EMPLOYEUR(value: String) {
        this._TYPE_EMPLOYEUR = value;
    }
    private _ID_USER: Number;
    public get ID_USER(): Number {
        return this._ID_USER;
    }
    public set ID_USER(value: Number) {
        this._ID_USER = value;
    }

    isValidEmail() {
        return validator.validate(this._EMAIL);
      }
}