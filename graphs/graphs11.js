const Graphs11 = {
graphs: [
    "11 bcdefghi,aijhkdc,abd,acbkhgfe,adf,aedg,afdh,agdkbji,ahjb,bih,bhd",
    "11 bcdefghi,aihjdc,abd,acbjhkgfe,adf,aedg,afdkh,agkdjbi,ahb,bhd,dhg",
    "11 bcdefghi,aijhdc,abd,acbhkgfe,adf,aedg,afdkh,agkdbji,ahjb,bih,dhg",
    "11 bcdefghij,ajidc,abd,acbikgfe,adf,aedg,afdkih,agi,ahgkdbj,aib,dig",
    "11 bcdefghi,aijkfdc,abd,acbfe,adf,aedbkihg,afh,agfi,ahfkjb,bik,bjif",
    "11 bcdefghi,aifdc,abd,acbfe,adf,aedbijkhg,afh,agfki,ahkjfb,fik,fjih",
    "11 bcdefghi,aifdc,abd,acbfe,adf,aedbijhg,afh,agfjki,ahkjfb,fikh,hji",
    "11 bcdefghi,aifdc,abd,acbfe,adf,aedbijkhg,afh,agfkji,ahjfb,fihk,fjh",
    "11 bcdefghi,aifjdc,abd,acbjfe,adf,aedjbikhg,afh,agfki,ahkfb,bfd,fih",
    "11 bcdefghi,aijfdc,abd,acbfe,adf,aedbjikhg,afh,agfki,ahkfjb,bif,fih",
    "11 bcdefghi,aihjkc,abkhgfed,ace,adcf,aecg,afch,agckjbi,ahb,bhk,bjhc",
    "11 bcdefghi,aihjc,abjhkgfed,ace,adcf,aecg,afckh,agkcjbi,ahb,bhc,chg",
    "11 bcdefghij,ajdc,abd,acbjihke,adkhgf,aeg,afeh,agekdi,ahdj,aidb,dhe",
    "11 bcdefghij,ajdc,abd,acbjkihe,adhgf,aeg,afeh,agedi,ahdkj,aikdb,dji",
    "11 bcdefghij,ajkdc,abd,acbkjihe,adhgf,aeg,afeh,agedi,ahdj,aidkb,bjd",
    "11 bcdefghi,aihjgfkc,abkfed,ace,adcf,aeckbg,afbjh,agjbi,ahb,bhg,bfc",
    "11 bcdefghi,aihjgkfc,abfed,ace,adcf,aecbkg,afkbjh,agjbi,ahb,bhg,bgf",
    "11 bcdefghi,aihjkgfc,abfed,ace,adcf,aecbg,afbkh,agkjbi,ahb,bhk,bjhg",
    "11 bcdefghi,aihjkgfc,abfed,ace,adcf,aecbg,afbkjh,agjbi,ahb,bhgk,bjg",
    "11 bcdefghi,aijhgkfc,abfed,ace,adcf,aecbkg,afkbh,agbji,ahjb,bih,bgf",
    "11 bcdefghi,aijhgfkc,abkfed,ace,adcf,aeckbg,afbh,agbji,ahjb,bih,bfc",
    "11 bcdefghi,aijkhgfc,abfed,ace,adcf,aecbg,afbh,agbki,ahkjb,bik,bjih",
    "11 bcdefghi,aijhkgfc,abfed,ace,adcf,aecbg,afbkh,agkbji,ahjb,bih,bhg",
    "11 bcdefghi,aijkhgfc,abfed,ace,adcf,aecbg,afbh,agbkji,ahjb,bihk,bjh",
    "11 bcdefghi,aijhgfc,abfed,ace,adcf,aecbg,afbh,agbjki,ahkjb,bikh,hji",
    "11 bcdefghij,ajihedc,abd,acbe,adbhkgf,aeg,afekh,agkebi,ahbj,aib,ehg",
    "11 bcdefghij,ajihedc,abd,acbe,adbhgkf,aekg,afkeh,agebi,ahbj,aib,egf",
    "11 bcdefghijk,akc,abkd,ackge,adgf,aeg,afedkih,agi,ahgkj,aik,ajigdcb",
    "11 bcdefghij,ajhkedc,abd,acbe,adbkhf,aehg,afh,agfekbji,ahj,aihb,bhe",
    "11 bcdefghij,ajhedc,abd,acbe,adbhkf,aekhg,afh,agfkebji,ahj,aihb,ehf",
    "11 bcdefghij,ajkhedc,abd,acbe,adbhf,aehg,afh,agfebkji,ahj,aihkb,bjh",
    "11 bcdefghi,aijc,abjikfed,ace,adcf,aeckig,afih,agi,ahgfkcjb,bic,cif",
    "11 bcdefghi,aic,abifjed,ace,adcjf,aejcikg,afkih,agi,ahgkfcb,cfe,fig",
    "11 bcdefghi,aic,abifed,ace,adcf,aecijkg,afkih,agi,ahgkjfcb,fik,fjig",
    "11 bcdefghi,aic,abijfed,ace,adcf,aecjikg,afkih,agi,ahgkfjcb,cif,fig",
    "11 bcdefghi,aic,abifed,ace,adcf,aecijg,afjkih,agi,ahgkjfcb,fikg,gji",
    "11 bcdefghi,aic,abifed,ace,adcf,aecijkg,afkjih,agi,ahgjfcb,figk,fjg",
    "11 bcdefghi,aic,abijkfed,ace,adcf,aeckig,afih,agi,ahgfkjcb,cik,cjif",
    "11 bcdefghij,ajigkc,abkged,ace,adcgf,aeg,afeckbih,agi,ahgbj,aib,bgc",
    "11 bcdefghi,aihjfec,abed,ace,adcbf,aebjkhg,afh,agfkjbi,ahb,bhkf,fjh",
    "11 bcdefghi,aihjfkec,abed,ace,adcbkf,aekbjhg,afh,agfjbi,ahb,bhf,bfe",
    "11 bcdefghi,aijhkfec,abed,ace,adcbf,aebkhg,afh,agfkbji,ahjb,bih,bhf",
    "11 bcdefghi,aijhfkec,abed,ace,adcbkf,aekbhg,afh,agfbji,ahjb,bih,bfe",
    "11 bcdefghi,aijhfec,abed,ace,adcbf,aebhg,afh,agfbjki,ahkjb,bikh,hji",
    "11 bcdefghi,aijhfec,abed,ace,adcbf,aebhkg,afkh,agkfbji,ahjb,bih,fhg",
    "11 bcdefghi,aihjfec,abed,ace,adcbf,aebjhkg,afkh,agkfjbi,ahb,bhf,fhg",
    "11 bcdefghi,aihfec,abed,ace,adcbf,aebhjkg,afkjh,agjfbi,ahb,fhgk,fjg",
    "11 bcdefghi,aihfec,abed,ace,adcbf,aebhjkg,afkh,agkjfbi,ahb,fhk,fjhg",
    "11 bcdefghi,aihfjec,abed,ace,adcbjf,aejbhkg,afkh,agkfbi,ahb,bfe,fhg",
    "11 bcdefghi,aihfejc,abjed,ace,adcjbf,aebhkg,afkh,agkfbi,ahb,bec,fhg",
    "11 bcdefghij,ajihfec,abed,ace,adcbf,aebhkg,afkh,agkfbi,ahbj,aib,fhg",
    "11 bcdefghijk,akjhfdc,abd,acbfe,adf,aedbhg,afh,agfbji,ahj,aihbk,ajb",
    "11 bcdefghijk,akjhec,abed,ace,adcbhgf,aeg,afeh,agebji,ahj,aihbk,ajb",
    "11 bcdefghij,ajihdc,abd,acbhfke,adkf,aekdhg,afh,agfdbi,ahbj,aib,dfe",
    "11 bcdefghij,ajihdc,abd,acbhkfe,adf,aedkhg,afh,agfkdbi,ahbj,aib,dhf",
    "11 bcdefghij,ajihdc,abd,acbhfe,adf,aedhkg,afkh,agkfdbi,ahbj,aib,fhg",
    "11 bcdefghijk,akjidc,abd,acbife,adf,aedig,afih,agi,ahgfdbj,aibk,ajb",
    "11 bcdefghij,ajigkec,abed,ace,adcbkgf,aeg,afekbih,agi,ahgbj,aib,bge",
    "11 bcdefghij,ajigekc,abked,ace,adckbgf,aeg,afebih,agi,ahgbj,aib,bec",
    "11 bcdefghij,ajigec,abed,ace,adcbgkf,aekg,afkebih,agi,ahgbj,aib,egf",
    "11 bcdefghi,aifjdc,abd,acbjfe,adf,aedjbikg,afkih,agi,ahgkfb,bfd,fig",
    "11 bcdefghi,aijfdc,abd,acbfe,adf,aedbjikg,afkih,agi,ahgkfjb,bif,fig",
    "11 bcdefghi,aifdc,abd,acbfe,adf,aedbijg,afjkih,agi,ahgkjfb,fikg,gji",
    "11 bcdefghij,ajkgdc,abd,acbge,adgf,aeg,afedbkjh,agji,ahj,aihgkb,bjg",
    "11 bcdefghi,aihfjec,abed,ace,adcbjkf,aekjbhg,afh,agfbi,ahb,bfke,ejf",
    "11 bcdefghi,aihfjkec,abed,ace,adcbkjf,aejbhg,afh,agfbi,ahb,bfek,bje",
    "11 bcdefghij,ajigfdc,abd,acbfke,adkf,aekdbg,afbih,agi,ahgbj,aib,dfe",
    "11 bcdefghi,aihjfec,abekd,acke,adkcbf,aebjhg,afh,agfjbi,ahb,bhf,ced",
    "11 bcdefghi,aijhfec,abekd,acke,adkcbf,aebhg,afh,agfbji,ahjb,bih,ced",
    "11 bcdefghi,aihfec,abejd,acje,adjcbf,aebhkg,afkh,agkfbi,ahb,ced,fhg",
    "11 bcdefghij,ajigec,abekd,acke,adkcbgf,aeg,afebih,agi,ahgbj,aib,ced",
    "11 bcdefghi,aijfdc,abd,acbfe,adf,aedbjig,afikh,agki,ahkgfjb,bif,gih",
    "11 bcdefghi,aifdc,abd,acbfe,adf,aedbijg,afjikh,agki,ahkgjfb,fig,gih",
    "11 bcdefghij,ajgdc,abd,acbge,adgf,aeg,afedbjh,agjki,ahkj,aikhgb,hji",
    "11 bcdefghi,aihfec,abejd,acjke,adkjcbf,aebhg,afh,agfbi,ahb,cekd,dje",
    "11 bcdefghi,aihfec,abejkd,acke,adkjcbf,aebhg,afh,agfbi,ahb,cek,cjed",
    "11 bcdefghi,aihfec,abejkd,ackje,adjcbf,aebhg,afh,agfbi,ahb,cedk,cjd",
    "11 bcdefgh,ahifedc,abd,acbe,adbf,aebihjkg,afkh,agkjfib,bhf,fhk,fjhg",
    "11 bcdefgh,ahdc,abd,acbhe,adhgijkf,aekg,afkjieh,agedb,egj,eigk,ejgf",
    "11 bcdefgh,ahfc,abfeijkd,acke,adkjicf,aecbhg,afh,agfb,cej,ciek,cjed",
    "11 bcdefgh,ahfc,abfeijd,acje,adjkicf,aecbhg,afh,agfb,cekj,ciked,eji",
    "11 bcdefg,agc,abgd,acgfhie,adif,aeijhdg,afdcb,dfjki,dhkjfe,fikh,hji",
    "11 bcdefghi,aic,abid,acigjkfe,adf,aedkjg,afjdih,agi,ahgdcb,dgfk,djf",
    "11 bcdefghi,aiedc,abd,acbe,adbijkgf,aeg,afekjih,agi,ahgjeb,eigk,ejg",
    "11 bcdefghi,aigc,abgejkd,ackje,adjcgf,aeg,afecbih,agi,ahgb,cedk,cjd",
    "11 bcdefgh,ahfedic,abid,acibe,adbf,aebhjkg,afkjh,agjfb,bdc,fhgk,fjg",
    "11 bcdefgh,ahedc,abd,acbe,adbhijf,aejihkg,afkh,agkfieb,ehfj,eif,fhg",
    "11 bcdefg,aghfc,abfed,ace,adcf,aecbhig,afijkhb,bgkif,fhkjg,gik,gjih",
    "11 bcdefg,aghfc,abfed,ace,adcf,aecbhig,afijkhb,bgkjif,fhjg,gihk,gjh",
    "11 bcdefg,aghifc,abfed,ace,adcf,aecbijg,afjkihb,bgi,bhgkjf,fikg,gji",
    "11 bcdefgh,ahgifc,abfed,ace,adcf,aecbijg,afjkibh,agb,bgkjf,fikg,gji",
    "11 bcdefgh,ahifc,abfed,ace,adcf,aecbijhg,afh,agfjkib,bhkjf,fikh,hji",
    "11 bcdefgh,ahijkc,abkjihd,achfe,adf,aedhg,afh,agfdcib,bhcj,bick,bjc",
    "11 bcdefgh,ahgc,abgfied,ace,adcijkf,aekjicg,afcbh,agb,cfje,eifk,ejf",
    "11 bcdefg,aghedic,abijkd,ackjibe,adbhgf,aeg,afehb,bge,bdjc,cidk,cjd",
    "11 bcdefgh,ahedic,abijkd,ackjibe,adbhgf,aeg,afeh,ageb,bdjc,cidk,cjd",
    "11 bcdefg,agc,abgd,acghfie,adijkf,aekjidhg,afhdcb,dgf,dfje,eifk,ejf",
    "11 bcdefg,agc,abgd,acgfhie,adijkf,aekjihdg,afdcb,dfi,dhfje,eifk,ejf",
    "11 bcdefg,agc,abgd,acgfhe,adhijkf,aekjihdg,afdcb,dfie,ehfj,eifk,ejf",
    "11 bcdefgh,ahc,abhd,achgie,adijkgf,aeg,afekjidh,agdcb,dgje,eigk,ejg",
    "11 bcdefg,aghijfc,abfed,ace,adcf,aecbjg,afjikhb,bgki,bhkgj,bigf,gih",
    "11 bcdefg,aghijfc,abfed,ace,adcf,aecbjkg,afkjihb,bgi,bhgj,bigkf,fjg",
    "11 bcdefgh,ahijkgc,abged,ace,adcgf,aeg,afecbkh,agkib,bhkj,bik,bjihg",
    "11 bcdefgh,ahgc,abgfied,ace,adcijf,aejkicg,afcbh,agb,cfkje,eikf,fji",
    "11 bcdefg,aghedic,abijd,acjkibe,adbhgf,aeg,afehb,bge,bdkjc,cikd,dji",
    "11 bcdefgh,ahedic,abijd,acjkibe,adbhf,aehg,afh,agfeb,bdkjc,cikd,dji",
    "11 bcdefgh,ahfc,abfeid,acije,adjkicf,aecbhg,afh,agfb,cekjd,dike,eji",
    "11 bcdefg,agc,abgd,acghfie,adijf,aejkidhg,afhdcb,dgf,dfkje,eikf,fji",
    "11 bcdefg,agc,abgd,acgfhie,adijf,aejkihdg,afdcb,dfi,dhfkje,eikf,fji",
    "11 bcdefgh,ahc,abhd,achgie,adijgf,aeg,afejkidh,agdcb,dgkje,eikg,gji",
    "11 bcdefg,aghijfc,abfed,ace,adcf,aecbjkg,afkjhb,bgji,bhj,bihgkf,fjg",
    "11 bcdefg,aghijfc,abfed,ace,adcf,aecbjg,afjhb,bgjki,bhkj,bikhgf,hji",
    "11 bcdefg,aghifc,abfed,ace,adcf,aecbig,afijkhb,bgki,bhkjgf,gik,gjih",
    "11 bcdefg,aghifc,abfed,ace,adcf,aecbig,afijkhb,bgkji,bhjgf,gihk,gjh",
    "11 bcdefg,aghifc,abfed,ace,adcf,aecbig,afijhb,bgjki,bhkjgf,gikh,hji",
    "11 bcdefg,aghifc,abfed,ace,adcf,aecbijg,afjikhb,bgki,bhkgjf,fig,gih",
    "11 bcdefgh,ahijfc,abfed,ace,adcf,aecbjhg,afh,agfjkib,bhkj,bikhf,hji",
    "11 bcdefg,aghijkc,abkjhgd,acgfe,adf,aedg,afdchb,bgcji,bhj,bihck,bjc",
    "11 bcdefg,aghijc,abjkhgd,acgfe,adf,aedg,afdchb,bgckji,bhj,bihkc,cjh",
    "11 bcdefg,aghijc,abjhkgd,acgfe,adf,aedg,afdckhb,bgkcji,bhj,bihc,chg",
    "11 bcdefgh,ahgijkfc,abfed,ace,adcf,aecbkjg,afjibh,agb,bgj,bigfk,bjf",
    "11 bcdefgh,ahijfc,abfed,ace,adcf,aecbjkhg,afh,agfkjib,bhj,bihkf,fjh",
    "11 bcdefgh,ahfdijc,abjikd,ackibfe,adf,aedbhg,afh,agfb,bdkcj,bic,cid",
    "11 bcdefgh,ahedc,abd,acbe,adbhijf,aejikhg,afh,agfkieb,ehkfj,eif,fih",
    "11 bcdefgh,ahifedc,abd,acbe,adbf,aebijhkg,afkh,agkfjib,bhjf,fih,fhg",
    "11 bcdefgh,ahifec,abed,ace,adcbf,aebijhkg,afkh,agkfjib,bhjf,fih,fhg",
    "11 bcdefghi,aijhfdc,abd,acbfke,adkf,aekdbhg,afh,agfbji,ahjb,bih,dfe",
    "11 bcdefghi,aihfjdc,abd,acbjfke,adkf,aekdjbhg,afh,agfbi,ahb,bfd,dfe",
    "11 bcdefghi,aihfdjc,abjd,acjbfke,adkf,aekdbhg,afh,agfbi,ahb,bdc,dfe",
    "11 bcdefghi,aihjfkdc,abd,acbkfe,adf,aedkbjhg,afh,agfjbi,ahb,bhf,bfd",
    "11 bcdefghi,aigjkdc,abd,acbkjge,adgf,aeg,afedjbih,agi,ahgb,bgdk,bjd",
    "11 bcdefghijk,akhdc,abd,acbhe,adhgf,aeg,afeh,agedbkji,ahj,aihk,ajhb",
    "11 bcdefghijk,akhc,abhed,ace,adchgf,aeg,afeh,agecbkji,ahj,aihk,ajhb",
    "11 bcdefghijk,akgc,abgfed,ace,adcf,aecg,afcbkjih,agi,ahgj,aigk,ajgb",
    "11 bcdefghijk,akedc,abd,acbe,adbkjigf,aeg,afeih,agi,ahgej,aiek,ajeb",
    "11 bcdefghijk,akjc,abjed,ace,adcjf,aejg,afjih,agi,ahgj,aigfecbk,ajb",
    "11 bcdefghijk,akhc,abhd,ache,adhgf,aeg,afeh,agedcbki,ahkj,aik,ajihb",
    "11 bcdefghij,ajkic,abid,acie,adif,aeihg,afh,agfi,ahfedcbkj,aikb,bji",
    "11 bcdefghij,ajikc,abkid,acie,adif,aeihg,afh,agfi,ahfedckbj,aib,bic",
    "11 bcdefghij,ajic,abikd,ackie,adif,aeihg,afh,agfi,ahfedkcbj,aib,cid",
    "11 bcdefghij,ajic,abid,acike,adkif,aeihg,afh,agfi,ahfekdcbj,aib,die",
    "11 bcdefghij,ajic,abid,acie,adikf,aekihg,afh,agfi,ahfkedcbj,aib,eif",
    "11 bcdefghij,ajic,abid,acie,adif,aeikhg,afh,agfki,ahkfedcbj,aib,fih",
    "11 bcdefghij,ajic,abid,acie,adif,aeihkg,afkh,agkfi,ahfedcbj,aib,fhg",
    "11 bcdefghijk,akjc,abjd,acje,adjf,aejig,afih,agi,ahgfj,aifedcbk,ajb",
    "11 bcdefghijk,akedc,abd,acbe,adbkjihgf,aeg,afeh,agei,ahej,aiek,ajeb",
    "11 bcdefghijk,akdc,abd,acbkjihgfe,adf,aedg,afdh,agdi,ahdj,aidk,ajdb",
    "11 bcdefghijk,akjihgfdc,abd,acbfe,adf,aedbg,afbh,agbi,ahbj,aibk,ajb",
    "11 bcdefghijk,akjc,abjed,ace,adcjf,aejg,afjh,agji,ahj,aihgfecbk,ajb",
    "11 bcdefghijk,akic,abied,ace,adcif,aeig,afih,agi,ahgfecbkj,aik,ajib",
    "11 bcdefghij,ajkc,abkd,acke,adkf,aekg,afkh,agki,ahkj,aikb,bjihgfedc",
    "11 bcdefghijk,akjihgdc,abd,acbgfe,adf,aedg,afdbh,agbi,ahbj,aibk,ajb",
    "11 bcdefghijk,akjdc,abd,acbjfe,adf,aedjg,afjh,agji,ahj,aihgfdbk,ajb",
    "11 bcdefghijk,akgc,abged,ace,adcgf,aeg,afecbkih,agi,ahgkj,aik,ajigb",
    "11 bcdefghij,ajec,abed,ace,adcbjikgf,aeg,afekih,agi,ahgkej,aieb,eig",
    "11 bcdefghij,ajec,abed,ace,adcbjigf,aeg,afeikh,agki,ahkgej,aieb,gih",
    "11 bcdefghijk,akec,abed,ace,adcbkjgf,aeg,afejh,agji,ahj,aihgek,ajeb",
    "11 bcdefghij,ajigkc,abkgd,acge,adgf,aeg,afedckbih,agi,ahgbj,aib,bgc",
    "11 bcdefghij,ajigc,abgd,acgke,adkgf,aeg,afekdcbih,agi,ahgbj,aib,dge",
    "11 bcdefghijk,akjc,abjfed,ace,adcf,aecjg,afjh,agji,ahj,aihgfcbk,ajb",
    "11 bcdefghijk,akidc,abd,acbife,adf,aedig,afih,agi,ahgfdbkj,aik,ajib",
    "11 bcdefghijk,akjgc,abged,ace,adcgf,aeg,afecbjih,agi,ahgj,aigbk,ajb",
    "11 bcdefghij,ajec,abed,ace,adcbjkhgf,aeg,afeh,agekji,ahj,aihkeb,ejh",
    "11 bcdefghij,ajec,abed,ace,adcbjhgf,aeg,afeh,agejki,ahkj,aikheb,hji",
    "11 bcdefghij,ajkec,abed,ace,adcbkjhgf,aeg,afeh,ageji,ahj,aihekb,bje",
    "11 bcdefghijk,akec,abed,ace,adcbkhgf,aeg,afeh,ageki,ahkj,aik,ajiheb",
    "11 bcdefghij,ajifc,abfkd,ackfe,adf,aedkcbihg,afh,agfi,ahfbj,aib,cfd",
    "11 bcdefghij,ajkdc,abd,acbke,adkf,aekg,afkh,agki,ahkj,aikb,bjihgfed",
    "11 bcdefghij,ajkedc,abd,acbe,adbkf,aekg,afkh,agki,ahkj,aikb,bjihgfe",
    "11 bcdefghi,aijc,abjikd,acke,adkf,aekg,afkh,agki,ahkcjb,bic,cihgfed",
    "11 bcdefghij,ajc,abjked,ace,adckf,aekg,afkh,agki,ahkj,aikcb,cjihgfe",
    "11 bcde,aefghc,abhgid,acijke,adkjfb,bejig,bfich,bgc,cgfjd,difek,dje",
    "11 bcdef,afghc,abhid,acijke,adkf,aekjgb,bfjih,bgic,chgjd,digfk,djfe",
    "11 bcde,aefghc,abhigjd,acjke,adkfb,bekg,bfkjcih,bgic,chg,cgkd,djgfe",
    "11 bcde,aefghc,abhgid,acijke,adkjfb,bejg,bfjich,bgc,cgjd,digfek,dje",
    "11 bcde,aefghc,abhijd,acjke,adkfb,bekig,bfih,bgic,chgfkj,cikd,djife",
    "11 bcde,aefgc,abghd,achie,adifb,beijkg,bfkjhc,cgjid,dhjfe,fihgk,fjg",
    "11 bcde,aefgc,abghid,acije,adjfb,bejkg,bfkihc,cgi,chgkjd,dikfe,fjig"
  ]
};

module.exports = Graphs11;
