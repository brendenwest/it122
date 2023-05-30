//var request = require('request');
var http = require('http'); 
var url = require('url'); 
var cheerio = require('cheerio');

exports.getSalaries = function(kw, location, callback) {
    var url = 'http://www.indeed.com/salary?q1=' + kw + '&l1=' +location;

/* sample HTML
<tr class="row_1">
                                        
                                        <td class="col_a"><h2><a href="/q-Lead-Android-Developer-jobs.html" class="job_title">Lead Android Developer</a></h2></td>
                    <td class="col_b"><span class="salary">$108,000</span></td>
                    <td class="col_c" colspan="3"><div class="bar query_1" style="width: 80%;"></div></td>
                    <!-- td class="col_e"><span class="sampleSize">330</span></td -->
                  </tr>
*/

    return http.get(url, function(response) {
        var salary_data = {};
        salary_data['jobs'] = [];

        // Continuously update stream with data
        var body = '';
        response.on('data', function(d) {
            body += d;
        });
        
        response.on('end', function() {
            $ = cheerio.load(body);
            // get job titles
            $('#related_salary_display_table tr').each(function(){
                var row = $(this);
                var job_title = row.find(".job_title").text();
                if (job_title) {
                    job_title = job_title.substring(0,job_title.indexOf(" in"));
                    var salary = row.find(".salary").text();
                    salary_data.jobs.push({"title": job_title, "salary": salary});
                }
            });
            salary_data["updated"] = $('#salary_display_table tfoot tr th:nth-child(1) span').text();
            salary_data["timestamp"] = new Date();
            callback(salary_data);
        });
    }).end();
    
}
