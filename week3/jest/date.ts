import moment from "moment";

export default class date {
  public formatDate(date: Object, format: string): string {
    const pattern =
      /^(y|Y){4}(\/|年)[m|M]{2}(\/|月)(d|D){2}(日){0,1}( ){0,1}(hh:mm:ss){0,1}$/i;
    const checkFormat = format.match(pattern);
    if (checkFormat) {
      return moment(date).format(format);
    } else {
      throw new Error("FormatInvalidException");
    }
  }
}
